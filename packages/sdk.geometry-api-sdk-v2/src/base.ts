import { Configuration as ClientConfig } from './client/configuration';
import { BaseAPI as ClientBaseAPI } from './client/base';
import { Configuration } from './configuration';
import globalAxios, { AxiosInstance } from 'axios';

/** Axios singleton instance used by all APIs by default. */
let AXIOS: AxiosInstance | undefined;

/**
 * Overrides the `BaseAPI` class that is used by all resource APIs.
 *
 * NOTE: The classes are swapped out in `client/base.ts` by a script during generation.
 *
 * Extensions:
 *  - Replace the global Axios instance with a custom instance.
 *  - Extend the Axios instance by an Interceptor to handle retries on 429 and 502 status codes.
 */
export class BaseAPI extends ClientBaseAPI {
    // Exposed for testing purposes.
    readonly defaultAxios: AxiosInstance | undefined;

    constructor(config?: Configuration | ClientConfig, basePath?: string) {
        let axios: AxiosInstance | undefined;
        if (!config || !('useCustomAxios' in config) || config.useCustomAxios) {
            if (AXIOS === undefined)
                AXIOS = createCustomAxiosInstance((config as any)?.maxRetries);
            axios = AXIOS;
        }
        super(config, basePath, axios);
        this.defaultAxios = axios;
    }
}

/**
 * Creates a custom Axios instance with a response interceptor to automatically retry requests on
 * `429` and `502` status codes.
 *
 * @param {number} maxRetries - Maximum number of retry attempts before failing (default: 5).
 * @returns A custom Axios instance with retry functionality.
 */
function createCustomAxiosInstance(maxRetries = 5): AxiosInstance {
    const axios = globalAxios.create();

    axios.interceptors.response.use(undefined, async (error) => {
        const { config, response } = error;

        // Exit early if no response or config is available
        if (!response || !config) return Promise.reject(error);

        // Check if retry limit is reached
        config.retryCount = config.retryCount ?? 0;
        if (config.retryCount >= maxRetries) return Promise.reject(error);

        // Only retry for 429 or 502 status codes
        if (response.status === 429 || response.status === 502) {
            config.retryCount += 1;

            const delay =
                response.status === 429
                    ? // use retry-after or default to 60s
                      (parseInt(response.headers['retry-after'], 10) || 60) * 1000
                    : // 1 second delay for 502 status
                      1000;

            // Delay retry and send the request again
            await new Promise((resolve) => setTimeout(resolve, delay));
            return axios.request(config);
        }

        // Reject for all other error statuses
        return Promise.reject(error);
    });

    return axios;
}
