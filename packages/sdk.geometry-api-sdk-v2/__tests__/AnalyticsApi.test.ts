import {
    AnalyticsApi,
    Configuration,
    ReqCreditMetrics,
    ReqModelStatistics,
    SessionApi,
} from '../src';
import { basePath, jwtModel, modelId, createTicket, jwtBackend } from './config';

test('model session statistics', async () => {
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });

    // Initialize a new session.
    const ticket = await createTicket();
    const sessionId = (await new SessionApi(modelConfig).createSessionByTicket(ticket)).data
        .sessionId;

    // Fetch model statistics within a specific time range.
    const reqStats: ReqModelStatistics = {
        parameters: [
            {
                modelid: [modelId],
                timestamp_from: '2024',
                timestamp_to: '2025',
            },
        ],
    };
    const resStats = (await new AnalyticsApi(modelConfig).getModelStatistics(reqStats)).data;
    expect(resStats.analytics.models.length).toBeGreaterThan(0);

    // Close the session.
    await new SessionApi(modelConfig).closeSession(sessionId);
});

test('credit metrics', async () => {
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });

    // Initialize a new session.
    const ticket = await createTicket();
    const sessionId = (await new SessionApi(modelConfig).createSessionByTicket(ticket)).data
        .sessionId;

    // Fetch credit metrics within a specific time range.
    const reqCredits: ReqCreditMetrics = {
        parameters: [
            {
                id: { modelIds: [modelId] },
                timestamp_from: '2024',
                timestamp_to: '2025',
            },
        ],
    };
    const resCredits = (await new AnalyticsApi(modelConfig).getCreditMetrics(reqCredits)).data;
    expect(resCredits.analytics.creditMetrics.length).toBeGreaterThan(0);

    // Close the session.
    await new SessionApi(modelConfig).closeSession(sessionId);
});

test('user credit metrics', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });

    const resCredits = (await new AnalyticsApi(backendConfig).getUserCreditMetrics('202407')).data;
    expect(resCredits.analytics.creditMetrics.length).toBeGreaterThan(0);
});

test('organization credit metrics', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });

    const resCredits = (
        await new AnalyticsApi(backendConfig).getOrganizationCreditMetrics('202407')
    ).data;
    expect(resCredits.analytics.creditMetrics.length).toBeGreaterThan(0);
});

test('model user credit metrics', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });

    const userId = '92a8410b-6496-4b86-8c3f-1014d59f7fa3';
    const resCredits = (
        await new AnalyticsApi(backendConfig).getModelUserCreditMetrics('202407', userId)
    ).data;
    expect(resCredits.analytics.creditMetrics.length).toBeGreaterThan(0);
});

test('model organization credit metrics', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });

    const orgId = 'a785380e-183d-11ef-926a-f3f7d2b9f407';
    const resCredits = (
        await new AnalyticsApi(backendConfig).getModelOrganizationCreditMetrics('202407', orgId)
    ).data;
    expect(resCredits.analytics.creditMetrics.length).toBeGreaterThan(0);
});
