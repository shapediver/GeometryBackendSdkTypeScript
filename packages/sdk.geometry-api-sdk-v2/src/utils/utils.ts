import {
    ShapeDiverError,
    ShapeDiverResponseError as ShapeDiverResponseErrorCore,
} from "@shapediver/sdk.geometry-api-sdk-core"
import { ShapeDiverResponseError } from "../ShapeDiverErrors"

/**
 * Sends the given request, handles retries for the HTTP status 429, and maps
 * the response error object to its typed representation.
 */
export async function sendRequest<T> (call: () => Promise<T>): Promise<T> {
    const retryLimit = 5
    let retryCounter = 0

    while (retryCounter < retryLimit) {
        try {
            return await call()
        } catch (e) {
            retryCounter++

            if (e instanceof ShapeDiverResponseErrorCore) {
                /* Check for special response statuses */
                if (e.status === 429) {
                    // 429 Too Many Requests - Extract waiting time from Retry-After header if existing.
                    const seconds = e.headers["retry-after"] ?? 60  // default is 1 minute
                    await sleep(Number(seconds) * 1000)
                    continue

                } else if (e.status === 502) {
                    await sleep(1000)   // 1 second
                    continue
                }

                // Error mapping
                throw new ShapeDiverResponseError(e)
            } else {
                // Not a response error -> something went wrong
                throw e
            }
        }
    }

    throw new ShapeDiverError("Could not send request: Retry-limit reached")
}

/** Delays the response for the given number of milliseconds */
export function sleep (ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}
