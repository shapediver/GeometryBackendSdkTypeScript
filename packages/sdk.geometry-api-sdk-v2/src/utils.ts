import { AxiosError, AxiosPromise } from 'axios';
import { RequestError, ResponseError } from './error';

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

/**
 * Tries to convert a generic Axios error into a more specific ShapeDiver error. When no match is
 * found, the original error is returned instead.
 * @param error The Axios error to convert.
 */
export function processError(error: AxiosError | Error): Error | RequestError | ResponseError {
    if ('response' in error) {
        const err = error as AxiosError,
            status = err.response!.status,
            data = err.response!.data;

        if (
            data &&
            typeof data === 'object' &&
            'desc' in data &&
            typeof data.desc === 'string' &&
            'error' in data &&
            typeof data.error === 'string' &&
            'message' in data &&
            typeof data.message === 'string'
        ) {
            return new ResponseError(status, data.message, data.desc, data.error);
        } else {
            return new ResponseError(status, err.message, 'No error description provided');
        }
    } else if ('request' in error) {
        return new RequestError(error.message);
    } else {
        return error;
    }
}
