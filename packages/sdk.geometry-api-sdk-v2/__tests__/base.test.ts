import { Configuration, SessionApi } from '../src';
import { Configuration as ClientConfig } from '../src/client/runtime';

describe('constructor', () => {
    test.each([
        ['no config', undefined],
        ['client config', new ClientConfig()],
        ['sdk config', new Configuration()],
    ])('%s; creates a SessionApi', (_, config) => {
        expect(new SessionApi(config)).toBeInstanceOf(SessionApi);
    });
});

describe('fetch retry and authorization', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    function apiUsingFetch(fetch: typeof global.fetch, maxRetries?: number): SessionApi {
        const config = new Configuration({ maxRetries, fetchApi: fetch });
        return new SessionApi(config);
    }

    test('general error status should not retry', async () => {
        const fetch = jest.fn().mockResolvedValue(new Response('{}', { status: 400 }));
        const api = apiUsingFetch(fetch, 2);

        await expect(api.createSessionByTicket('ticket')).rejects.toThrow();
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test.each([429, 502])('retryable status should retry until failure (%s)', async (status) => {
        const fetch = jest.fn().mockResolvedValue(
            new Response('{}', { status, headers: { 'Retry-After': '0' } })
        );
        const api = apiUsingFetch(fetch, 2);

        await expect(api.createSessionByTicket('ticket')).rejects.toThrow();
        expect(fetch).toHaveBeenCalledTimes(3);
    });

    test('retryable status should retry once when the next request succeeds', async () => {
        const fetch = jest.fn()
            .mockResolvedValueOnce(new Response('{}', { status: 502 }))
            .mockResolvedValueOnce(new Response('{}', { status: 200 }));
        const api = apiUsingFetch(fetch, 2);

        await expect(api.createSessionByTicket('ticket')).resolves.toBeDefined();
        expect(fetch).toHaveBeenCalledTimes(2);
    });

    test.each([
        ['missing', undefined],
        ['malformed', 'later'],
    ])('uses the fallback delay for %s Retry-After values', async (_, retryAfter) => {
        const headers = retryAfter ? { 'Retry-After': retryAfter } : undefined;
        const fetch = jest.fn().mockResolvedValue(new Response('{}', { status: 429, headers }));
        const setTimeout = jest
            .spyOn(global, 'setTimeout')
            .mockImplementation(((callback: (...args: any[]) => void, delay?: number) => {
                expect(delay).toBe(60_000);
                callback();
                return 0 as unknown as NodeJS.Timeout;
            }) as typeof global.setTimeout);
        const api = apiUsingFetch(fetch, 1);

        await expect(api.createSessionByTicket('ticket')).rejects.toThrow();
        expect(setTimeout).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledTimes(2);
    });

    test('authorization should be omitted when no token is configured', async () => {
        const fetch = jest.fn().mockResolvedValue(new Response('{}', { status: 200 }));
        const api = apiUsingFetch(fetch);

        await api.createSessionByTicket('ticket');
        expect(new Headers(fetch.mock.calls[0][1].headers).has('Authorization')).toBe(false);
    });

    test('authorization should contain the configured JWT', async () => {
        const fetch = jest.fn().mockResolvedValue(new Response('{}', { status: 200 }));
        const jwt = 'some-jwt';
        const config = new Configuration({ accessToken: jwt });
        config.config = new ClientConfig({ fetchApi: fetch, accessToken: jwt });
        const api = new SessionApi(config);

        await api.createSessionByTicket('ticket');
        expect(new Headers(fetch.mock.calls[0][1].headers).get('Authorization')).toBe(`Bearer ${jwt}`);
    });
});
