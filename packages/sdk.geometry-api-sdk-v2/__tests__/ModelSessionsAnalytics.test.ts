import {
    Configuration,
    ModelApi,
    QueryOrder,
    ResModelSession,
    SessionAnalyticsStatus,
    SessionApi,
} from '../src';
import { basePath, createTicket, jwtModel, modelId } from './config';

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

// Retry up to 8 times, 1s apart, while load or accept throws. accept is the condition for this phase.
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
        // Poll until this session is listed as open. A missing row or a later status is retried.
        const openPage = await untilRow(
            () => modelApi.getModelSessionsAnalytics(modelId, QueryOrder.DESC, from, to, 20),
            (page) => {
                const row = soleSession(page.sessions, sessionId);
                if (row.status !== SessionAnalyticsStatus.OPEN) {
                    throw new Error(`session ${sessionId} is ${row.status}`);
                }
            }
        );
        expect(soleSession(openPage.sessions, sessionId).status).toBe(SessionAnalyticsStatus.OPEN);

        // Close the session.
        await closeOnce(config, sessionId, closed);

        // Poll until the same session is listed as pending.
        const pendingPage = await untilRow(
            () => modelApi.getModelSessionsAnalytics(modelId, QueryOrder.DESC, from, to, 20),
            (page) => {
                const row = soleSession(page.sessions, sessionId);
                if (row.status !== SessionAnalyticsStatus.PENDING) {
                    throw new Error(`session ${sessionId} is ${row.status}`);
                }
            }
        );
        const pending = soleSession(pendingPage.sessions, sessionId);
        expect(pending.status).toBe(SessionAnalyticsStatus.PENDING);
        expect(pending.id).toBe(sessionId);
    } finally {
        // Close the session if an assertion failed before the close above.
        await closeOnce(config, sessionId, closed);
    }
});
