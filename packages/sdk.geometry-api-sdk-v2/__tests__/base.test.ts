import { Configuration, SessionApi } from '../src';
import { Configuration as ClientConfig } from '../src/client/configuration';
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('constructor', function () {
    test.each([
        ['no config', undefined],
        ['client config', new ClientConfig()],
        ['sd-config without useCustomAxios', new Configuration()],
        ['sd-config with useCustomAxios enabled', new Configuration({ useCustomAxios: true })],
    ])('%s; should be defined', (_, config) => {
        const session = new SessionApi(config);
        expect(session.defaultAxios).toBeDefined();
    });

    test('sd-config with useCustomAxios disabled; should be defined', () => {
        const config = new Configuration({ useCustomAxios: false });
        const session = new SessionApi(config);
        expect(session.defaultAxios).toBeUndefined();
    });
});

describe('axios-mock', function () {
    const config = new Configuration({ useCustomAxios: true, maxRetries: 2 }),
        api = new SessionApi(config), // use actual api instance to test BaseAPI swapping
        mock = new AxiosMockAdapter(api.defaultAxios!);

    beforeEach(() => {
        mock.resetHandlers();
    });

    afterAll(() => {
        mock.restore();
    });

    describe('inceptor', function () {
        let spyPost: number;

        beforeEach(() => {
            spyPost = 0;
        });

        test('retry enabled, general error status; should not retry', async () => {
            mock.onPost().reply(() => {
                spyPost++;
                return [400, {}];
            });

            await expect(api.createSessionByTicket('foobar')).rejects.toThrow(
                /Request failed with status code 400/
            );
            expect(spyPost).toBe(1);
        });

        test.each([
            [429, { 'retry-after': '1' }],
            [502, {}],
        ])(
            'retry enabled, status code %s; should retry until failure',
            async (statusCode, headers) => {
                mock.onPost().reply(() => {
                    spyPost++;
                    return [statusCode, {}, headers];
                });

                await expect(api.createSessionByTicket('foobar')).rejects.toThrow(
                    new RegExp(`Request failed with status code ${statusCode}`)
                );
                expect(spyPost).toBe(3);
            }
        );

        test.each([
            [429, { 'retry-after': '1' }],
            [502, {}],
        ])(
            'retry enabled, status code %s once; should retry once',
            async (statusCode, headers) => {
                mock.onPost().reply(() => {
                    if (spyPost++ === 0) return [statusCode, {}, headers];
                    else return [200, {}];
                });

                await expect(api.createSessionByTicket('foobar')).resolves.toBeDefined();
                expect(spyPost).toBe(2);
            }
        );

        test('retry disabled, retry-able error status; should not retry', async () => {
            const api = new SessionApi(new Configuration({ useCustomAxios: false })),
                mock = new AxiosMockAdapter(axios); // Mock global Axios

            mock.onPost().reply(() => {
                spyPost++;
                return [429, {}];
            });

            await expect(api.createSessionByTicket('foobar')).rejects.toThrow(
                /Request failed with status code 429/
            );
            expect(spyPost).toBe(1);
        });
    });

    describe('authorization', () => {
        const ticket = 'some-example-ticket';

        test('no-auth', async () => {
            const config = new Configuration({});

            mock.onPost().reply((config) => {
                expect(config.headers).toBeDefined();
                expect(config.headers!['Authorization']).toBeUndefined();
                return [200, {}];
            });

            await new SessionApi(config).createSessionByTicket(ticket);
        });

        test('jwt', async () => {
            const jwt = 'some-jwt',
                config = new Configuration({ accessToken: jwt });

            mock.onPost().reply((config) => {
                expect(config.headers).toBeDefined();
                expect(config.headers!['Authorization']).toMatch(new RegExp(`^Bearer ${jwt}`));
                return [200, {}];
            });

            await new SessionApi(config).createSessionByTicket(ticket);
        });
    });
});
