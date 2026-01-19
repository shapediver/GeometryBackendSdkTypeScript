import { AxiosError, AxiosPromise } from 'axios';
import { RequestError, ResponseError } from './error';

/** ShapeDiver error object structure. */
type SdErrorObject = {
    error: string;
    desc: string;
    message: string;
};

/** Delays the response for the given number of milliseconds */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Parse HTTP headers to extract size and filename information.
 * @param {Record<string, any>} headers The HTTP headers of a file-metadata response.
 * @return An object with 'size' and 'filename' properties.
 */
export function extractFileInfo(headers: Record<string, any> | undefined): {
    size: number | undefined;
    filename: string | undefined;
} {
    if (!headers) return { size: undefined, filename: undefined };

    // Extract size from Content-Length header
    const contentLength = headers['Content-Length'] || headers['content-length'];
    const size = contentLength ? parseInt(contentLength) : undefined;

    // Extract filename from Content-Disposition header
    const contentDisposition = headers['Content-Disposition'] || headers['content-disposition'];
    const filename = contentDisposition
        ? filenameFromContentDisposition(contentDisposition)
        : undefined;

    return { size, filename };
}

/**
 * Set content headers according to RFC 5987.
 * @param {string} filename The file name to use.
 * @return A content-disposition header string.
 */
export function contentDispositionFromFilename(filename: string): string {
    // Normalize the filename to ASCII
    const asciiName = filename.normalize('NFKD').replace(/[^\x00-\x7F]/g, ''); // Transliterates to ASCII
    let header = `attachment; filename="${asciiName}"`;

    if (asciiName !== filename) {
        const quotedName = encodeURIComponent(filename);
        header += `; filename*=UTF-8''${quotedName}`;
    }

    return header;
}

/**
 * Extract and return the filename from a content-disposition HTTP header.
 * Decodes the `filename*` property if set.
 * @param {string} contentDisposition Content-Disposition header value.
 * @return The extracted filename.
 */
export function filenameFromContentDisposition(contentDisposition: string): string | undefined {
    let filename: string | undefined;
    let filenameStar: string | undefined;

    // Search for filename
    const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
    if (filenameMatch) filename = filenameMatch[1];

    // Search for filename*
    const filenameStarMatch = contentDisposition.match(/filename\*=([^'']+''|)?(.+)/);
    if (filenameStarMatch) {
        const encoding = filenameStarMatch[1] ? filenameStarMatch[1] : 'utf-8';
        const encodedFilename = filenameStarMatch[2];
        if (encoding.toLowerCase().startsWith('utf-8'))
            filenameStar = decodeURIComponent(encodedFilename);
    }

    // Prefer filename* over filename
    return filenameStar || filename;
}

/**
 * Helper function to check if an API call succeeded. This is useful for `metadata` endpoints when
 * we want to check if a resource exists or not.
 *
 * @param apiCall The API call to execute.
 * @returns A promise that resolves to `true` if the API call resulted in a `200` HTTP status, and
 * `false` for a `404` HTTP error status. Any other error status will be propagated.
 */
export async function exists(apiCall: () => AxiosPromise<unknown>): Promise<boolean> {
    return apiCall()
        .then(() => true)
        .catch((error) => {
            if (error.response?.status === 404) return false;
            throw error;
        });
}

/** Type Guard for the ShapeDiver error data object. */
function isErrorObject(value: unknown): value is SdErrorObject {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;

    const obj = value as Record<string, unknown>;
    return (
        typeof obj.error === 'string' &&
        typeof obj.desc === 'string' &&
        typeof obj.message === 'string'
    );
}

/** Helper function that wraps JSON.parse and returns undefined on failure. */
async function tryParseJson(
    input: string | (() => string) | (() => Promise<string>)
): Promise<unknown | undefined> {
    try {
        const text = typeof input === 'function' ? await input() : input;
        return JSON.parse(text);
    } catch {
        return undefined;
    }
}

function isArrayBuffer(value: unknown): value is ArrayBuffer {
    return Object.prototype.toString.call(value) === '[object ArrayBuffer]';
}

function isArrayBufferView(value: unknown): value is ArrayBufferView {
    return ArrayBuffer.isView(value);
}

/**
 * Tries to extract an error object from various Axios response data types.
 * @param data The data to extract from.
 * @returns The extracted error object, or undefined if none could be found.
 */
export async function tryExtractErrorObject(data: unknown): Promise<SdErrorObject | undefined> {
    let candidate: unknown;

    if (typeof data === 'string') {
        candidate = await tryParseJson(data);
    } else if (isArrayBufferView(data)) {
        candidate = await tryParseJson(() =>
            new TextDecoder().decode(new Uint8Array(data.buffer, data.byteOffset, data.byteLength))
        );
    } else if (isArrayBuffer(data)) {
        candidate = await tryParseJson(() => new TextDecoder().decode(new Uint8Array(data)));
    } else if (typeof Blob !== 'undefined' && data instanceof Blob) {
        candidate = await tryParseJson(async () => await data.text());
    } else {
        candidate = data;
    }

    return isErrorObject(candidate)
        ? { error: candidate.error, desc: candidate.desc, message: candidate.message }
        : undefined;
}

/**
 * Tries to convert a generic Axios error into a more specific ShapeDiver error. When no match is
 * found, the original error is returned instead.
 * @param error The Axios error to convert.
 */
export async function processError(
    error: AxiosError | Error
): Promise<Error | RequestError | ResponseError> {
    if ('response' in error) {
        const err = error as AxiosError,
            status = err.response!.status,
            data = err.response!.data;

        const errorObj = await tryExtractErrorObject(data);
        if (errorObj) {
            return new ResponseError(status, errorObj.message, errorObj.desc, errorObj.error);
        } else {
            return new ResponseError(status, err.message, 'No error description provided');
        }
    } else if ('request' in error) {
        return new RequestError(error.message);
    } else {
        return error;
    }
}
