import {
    Configuration as ClientConfig,
    ConfigurationParameters as ClientConfigParams,
} from './client/runtime';

const SDK_VERSION = '3.6.0'; // WARNING: This value is updated automatically!

export interface ConfigurationParameters
    extends Pick<ClientConfigParams, 'accessToken' | 'basePath' | 'fetchApi' | 'headers' | 'middleware' | 'queryParamsStringify'> {
    /**
     * Specifies the maximum number of automatic HTTP retries for failed requests.
     *
     * **Note:** This setting is only applicable when using a custom Fetch API instance.
     *
     * Default: `5`
     */
    maxRetries?: number;
}

function createHeaders(
    headers?: ClientConfigParams['headers'],
): Record<string, string> {
    const result: Record<string, string> = {};
    const normalizedHeaders = new Headers(headers);
    const userAgent = `sd-sdk/typescript/${SDK_VERSION}`;

    if (typeof process === 'object' && !normalizedHeaders.has('User-Agent')) {
        // Overwrite User-Agent on Node.js applications.
        normalizedHeaders.set('User-Agent', userAgent);
    } else if (!normalizedHeaders.has('X-ShapeDiver-UserAgent')) {
        // Set a custom User-Agent header on Browser applications.
        normalizedHeaders.set('X-ShapeDiver-UserAgent', userAgent);
    }

    normalizedHeaders.forEach((value, key) => {
        result[key] = value;
    });

    return result;
}

export class Configuration extends ClientConfig {
    readonly maxRetries: number;

    constructor(param: ConfigurationParameters = {}) {
        super({
            ...param,
            headers: createHeaders(param.headers),
        });

        this.maxRetries = param.maxRetries ?? 5;
    }
}
