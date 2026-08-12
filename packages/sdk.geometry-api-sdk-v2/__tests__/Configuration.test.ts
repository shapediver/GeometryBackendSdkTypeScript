import { Configuration, ConfigurationParameters } from '../src';
import { Configuration as ClientConfig } from '../src/client/runtime';

describe('Configuration constructor', () => {
    const accessToken = async () => 'token';
    const fetchApi = jest.fn();
    const middleware = [{ pre: jest.fn() }];
    const queryParamsStringify = jest.fn(() => 'query=value');
    const headers = { 'X-Custom-Header': 'value' };

    function expectClonedConfiguration(config: Configuration, maxRetries: number): void {
        expect(config.basePath).toBe('https://example.com');
        expect(config.accessToken).toBe(accessToken);
        expect(config.fetchApi).toBe(fetchApi);
        expect(config.headers).toMatchObject({ 'x-custom-header': headers['X-Custom-Header'] });
        expect(config.middleware).toBe(middleware);
        expect(config.queryParamsStringify).toBe(queryParamsStringify);
        expect(config.maxRetries).toBe(maxRetries);
    }

    test('clones a Configuration', () => {
        const source = new Configuration({
            accessToken,
            basePath: 'https://example.com',
            fetchApi,
            headers,
            middleware,
            queryParamsStringify,
            maxRetries: 3,
        });

        expectClonedConfiguration(new Configuration(source), 3);
    });

    test('clones a ClientConfig and uses the SDK retry default', () => {
        const source = new ClientConfig({
            accessToken,
            basePath: 'https://example.com',
            fetchApi,
            headers,
            middleware,
            queryParamsStringify,
        });

        expectClonedConfiguration(new Configuration(source), 5); // Default value for maxRetries
    });

    test('clones ConfigurationParameters', () => {
        const source: ConfigurationParameters = {
            accessToken,
            basePath: 'https://example.com',
            fetchApi,
            headers,
            middleware,
            queryParamsStringify,
            maxRetries: 3,
        };

        expectClonedConfiguration(new Configuration(source), 3);
    });
});
