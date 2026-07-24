import { BaseAPI as ClientBaseAPI, Configuration as ClientConfig, FetchAPI } from './client/runtime';
import { Configuration } from './configuration';

/**
 * Overrides the `BaseAPI` class that is used by all resource APIs.
 *
 * NOTE: The classes are swapped out in `client/base.ts` by a script during generation.
 *
 * Extensions:
 *  - Wrap the generated Fetch pipeline with bounded retries for 429 and 502 responses.
 */
export class BaseAPI extends ClientBaseAPI {
    constructor(config: Configuration | ClientConfig = new Configuration()) {
        super(config);

        const maxRetries =
            config instanceof Configuration
                ? config.maxRetries
                : new Configuration().maxRetries;

        // Wrap the generated pipeline rather than the raw Fetch implementation so that
        // configured middleware still runs for every attempt.
        this.fetchApi = createRetryingFetch(this.fetchApi, maxRetries);
    }
}

/**
 * Wraps Fetch with bounded retries for retryable HTTP responses.
 *
 * The wrapper returns the final response unchanged so the generated runtime can
 * perform its normal success/error conversion. Fetch transport failures are not
 * retried here.
 */
function createRetryingFetch(
    fetchApi: FetchAPI,
    maxRetries = 5,
): FetchAPI {
    return async (url, init) => {
        let retries = 0;

        while (true) {
            const response = await fetchApi(url, init);

            if (
                (response.status !== 429 && response.status !== 502) ||
                retries >= maxRetries
            ) {
                return response;
            }

            retries++;

            const delay =
                response.status === 429
                    ? getRetryAfterDelay(response)
                    : 1000;

            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    };
}

/**
 * Returns the retry delay in milliseconds for a 429 response.
 *
 * Only a non-negative integer Retry-After value is usable; missing or malformed
 * values use the SDK fallback delay of 60 seconds.
 */
function getRetryAfterDelay(response: Response): number {
    const value = response.headers.get('Retry-After')?.trim();

    if (value && /^\d+$/.test(value)) {
        return Number(value) * 1000;
    }

    return 60_000;
}
