import {
    Configuration,
    ModelApi,
    QueryOrder,
    ResModelSession,
    ResModelSessionRequest,
    ResModelSessionStatistics,
    SessionAnalyticsStatus,
    SessionApi,
} from '../src';
import { basePath, createTicket, jwtModel, modelId } from './config';

const DATE_TIME_MS = /^\d{17}$/;
const NO_CHARGE = 'no-charge';
const ALLOWED_ANALYTICS_HEADERS = [
    'origin',
    'referer',
    'user-agent',
    'x-shapediver-builddate',
    'x-shapediver-buildversion',
    'x-shapediver-origin',
    'x-shapediver-useragent',
] as const;

type SessionIdView =
    | { exposure: 'redacted' }
    | { exposure: 'revealed'; id: string };

type SessionPhase = {
    openedAt: string;
    chargeUserId?: string;
    chargeOrgId?: string;
    request?: ResModelSessionRequest;
} & (
    | { phase: 'open'; id: SessionIdView; closedAt: null; statistics: undefined }
    | { phase: 'pending'; id: { exposure: 'revealed'; id: string }; closedAt: string | null; statistics: undefined }
    | {
        phase: 'finalized';
        id: { exposure: 'revealed'; id: string };
        closedAt: string;
        statistics: ResModelSessionStatistics;
    }
);

// Query bounds are DateTimeMs: 17 digits. Ticket expiry uses config.now(), which is 14.
function dateTimeMs(diffSeconds?: number): string {
    const currentTime = new Date();
    if (diffSeconds) currentTime.setTime(currentTime.getTime() + diffSeconds * 1000);
    return currentTime.toISOString().replace(/\D/g, '').slice(0, 17);
}

// The revealed session id, or the only '<redacted>' row when the id is hidden. Any other count throws.
function soleSession(sessions: ResModelSession[], knownSessionId: string): ResModelSession {
    const revealed = sessions.filter((row) => row.id === knownSessionId);
    if (revealed.length === 1) {
        return revealed[0];
    }
    if (revealed.length > 1) {
        throw new Error(`multiple analytics rows for session ${knownSessionId}`);
    }
    const redacted = sessions.filter((row) => row.id === '<redacted>');
    if (redacted.length === 1) {
        return redacted[0];
    }
    throw new Error(
        `expected one analytics row for session ${knownSessionId}, found ${revealed.length} revealed and ${redacted.length} redacted`
    );
}

// Map the row to open, pending, or finalized. A broken phase throws. The test calls this after polling, so that throw fails once.
function readSessionPhase(row: ResModelSession, knownSessionId: string): SessionPhase {
    if (!DATE_TIME_MS.test(row.openedAt)) {
        throw new Error(`invalid openedAt: ${row.openedAt}`);
    }

    let idView: SessionIdView;
    if (row.id === '<redacted>') {
        idView = { exposure: 'redacted' };
    } else if (row.id === knownSessionId) {
        idView = { exposure: 'revealed', id: row.id };
    } else {
        throw new Error(`foreign session id: ${row.id}`);
    }

    const base = {
        openedAt: row.openedAt,
        ...(row.chargeUserId !== undefined ? { chargeUserId: row.chargeUserId } : {}),
        ...(row.chargeOrgId !== undefined ? { chargeOrgId: row.chargeOrgId } : {}),
        ...(row.request !== undefined ? { request: row.request } : {}),
    };

    switch (row.status) {
        case SessionAnalyticsStatus.OPEN: {
            if (row.closedAt !== null) {
                throw new Error('open session must have closedAt null');
            }
            if (row.statistics !== undefined) {
                throw new Error('open session must not have statistics');
            }
            return {
                ...base,
                phase: 'open',
                id: idView,
                closedAt: null,
                statistics: undefined,
            };
        }
        case SessionAnalyticsStatus.PENDING: {
            if (row.statistics !== undefined) {
                throw new Error('pending session must not have statistics');
            }
            if (idView.exposure !== 'revealed' || idView.id !== knownSessionId) {
                throw new Error('pending session must reveal id');
            }
            if (row.closedAt !== null && !DATE_TIME_MS.test(row.closedAt)) {
                throw new Error(`invalid pending closedAt: ${row.closedAt}`);
            }
            return {
                ...base,
                phase: 'pending',
                id: { exposure: 'revealed', id: knownSessionId },
                closedAt: row.closedAt,
                statistics: undefined,
            };
        }
        case SessionAnalyticsStatus.FINALIZED: {
            if (idView.exposure !== 'revealed' || idView.id !== knownSessionId) {
                throw new Error('finalized session must reveal id');
            }
            if (row.closedAt === null || !DATE_TIME_MS.test(row.closedAt)) {
                throw new Error(`invalid finalized closedAt: ${row.closedAt}`);
            }
            if (row.statistics === undefined) {
                throw new Error('finalized session must have statistics');
            }
            const {
                billableCount,
                duration,
                exportsCount,
                interactionsCount,
                combinedCount,
            } = row.statistics;
            if (
                typeof billableCount !== 'number'
                || typeof duration !== 'number'
                || typeof exportsCount !== 'number'
                || typeof interactionsCount !== 'number'
                || typeof combinedCount !== 'number'
            ) {
                throw new Error('finalized session statistics incomplete');
            }
            return {
                ...base,
                phase: 'finalized',
                id: { exposure: 'revealed', id: knownSessionId },
                closedAt: row.closedAt,
                statistics: row.statistics,
            };
        }
        default: {
            const _exhaustive: never = row.status;
            throw new Error(`unknown session status: ${_exhaustive}`);
        }
    }
}

// Charge ids may be absent. A present id must be non-empty and must not be the 'no-charge' sentinel.
function expectChargeId(id: string | undefined): void {
    if (id === undefined) return;
    expect(id).not.toBe(NO_CHARGE);
    expect(id.length).toBeGreaterThan(0);
}

// request may be absent. When present, every header name is on the allow-list and the IP ends in '.X' or ':X'.
function expectAnalyticsRequest(request: ResModelSessionRequest | undefined): void {
    if (!request) return;
    for (const name of Object.keys(request.headers)) {
        expect(ALLOWED_ANALYTICS_HEADERS).toContain(name);
    }
    expect(request.ip.endsWith('.X') || request.ip.endsWith(':X')).toBe(true);
}

// Retry up to 8 times, 1s apart, while load or accept throws. accept checks that the row is listed. Phase checks stay outside.
async function untilRow<T>(load: () => Promise<T>, accept: (value: T) => void): Promise<T> {
    for (let attempt = 0; attempt < 8; attempt++) {
        try {
            const value = await load();
            accept(value);
            return value;
        } catch (err) {
            if (attempt === 7) throw err;
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
    throw new Error('analytics row did not appear');
}

// Close at most once. The flag flips only after closeSession resolves, so a failed close is tried again from finally.
async function closeOnce(
    config: Configuration,
    sessionId: string,
    state: { closed: boolean }
): Promise<void> {
    if (state.closed) return;
    await new SessionApi(config).closeSession(sessionId);
    state.closed = true;
}

test('model session analytics', async () => {
    // Analytics reads use the model JWT. Opening and closing the session use the ticket, with no access token.
    const modelConfig = new Configuration({ basePath, accessToken: jwtModel });
    const config = new Configuration({ basePath });
    const modelApi = new ModelApi(modelConfig);

    // The list filters on open time. Sample the start before the session exists, and the end after it does.
    const from = dateTimeMs(-60);
    const ticket = await createTicket();
    const sessionId = (await new SessionApi(config).createSessionByTicket(ticket)).sessionId;
    const to = dateTimeMs(60);
    const closed = { closed: false };

    try {
        // Poll until this session is listed. A listed row that is not open fails the checks below. It is not retried.
        const openPage = await untilRow(
            () => modelApi.getModelSessionsAnalytics(modelId, QueryOrder.DESC, from, to, 20),
            (page) => soleSession(page.sessions, sessionId)
        );
        expect(openPage.version).toEqual(expect.any(String));
        expect(openPage.pagination.limit).toBe(20);
        expect(Array.isArray(openPage.sessions)).toBe(true);

        const openPhase = readSessionPhase(soleSession(openPage.sessions, sessionId), sessionId);
        expect(openPhase.phase).toBe('open');
        expect(openPhase.closedAt).toBeNull();
        expect(openPhase.statistics).toBeUndefined();
        expect(openPhase.openedAt).toMatch(DATE_TIME_MS);
        expect(['redacted', 'revealed']).toContain(openPhase.id.exposure);
        if (openPhase.id.exposure === 'revealed') expect(openPhase.id.id).toBe(sessionId);
        expectChargeId(openPhase.chargeUserId);
        expectChargeId(openPhase.chargeOrgId);
        expectAnalyticsRequest(openPhase.request);

        // Close the session.
        await closeOnce(config, sessionId, closed);

        // Poll until the same session is listed again.
        const pendingPage = await untilRow(
            () => modelApi.getModelSessionsAnalytics(modelId, QueryOrder.DESC, from, to, 20),
            (page) => soleSession(page.sessions, sessionId)
        );
        const pendingPhase = readSessionPhase(soleSession(pendingPage.sessions, sessionId), sessionId);
        expect(pendingPhase.phase).toBe('pending');
        expect(pendingPhase.statistics).toBeUndefined();
        expect(pendingPhase.id).toEqual({ exposure: 'revealed', id: sessionId });
        if (pendingPhase.closedAt !== null) expect(pendingPhase.closedAt).toMatch(DATE_TIME_MS);
        expectChargeId(pendingPhase.chargeUserId);
        expectChargeId(pendingPhase.chargeOrgId);
        expectAnalyticsRequest(pendingPhase.request);
    } finally {
        // Close the session if an assertion failed before the close above.
        await closeOnce(config, sessionId, closed);
    }
});
