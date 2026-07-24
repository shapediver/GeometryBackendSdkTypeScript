import {
    FetchError,
    RequiredError,
    ResponseError as ClientResponseError,
} from '../src/client/runtime';
import {
    contentDispositionFromFilename,
    extractFileInfo,
    filenameFromContentDisposition,
    IllegalArgumentError,
    processError,
    RequestError,
    ResErrorType,
    ResponseError,
    SdGeometryError,
    TimeoutError,
} from '../src';

describe('file helpers', () => {
    test('extracts filename and size from headers', () => {
        expect(extractFileInfo({
            'Content-Length': '165030',
            'Content-Disposition': 'attachment; filename="foobar.txt"',
        })).toEqual({ filename: 'foobar.txt', size: 165030 });
    });

    test('handles missing headers', () => {
        expect(extractFileInfo(undefined)).toEqual({ filename: undefined, size: undefined });
    });

    test('formats and parses non-ascii filenames', () => {
        const header = contentDispositionFromFilename('ä€öü.jpg');
        expect(filenameFromContentDisposition(header)).toBe('ä€öü.jpg');
    });
});

describe('processError', () => {
    const body = JSON.stringify({ error: 'SdTextureUrlError', desc: 'Some error', message: 'Could not fetch texture' });

    test.each([
        ['string', body],
        ['ArrayBuffer', new TextEncoder().encode(body).buffer],
        ['Blob', new Blob([body])],
    ])('converts a Fetch response with %s error data', async (_, data) => {
        const result = await processError(new Response(data as BodyInit, { status: 400, statusText: 'Bad Request' }));
        expect(result).toBeInstanceOf(ResponseError);
        expect((result as ResponseError).status).toBe(400);
        expect((result as ResponseError).message).toBe('Could not fetch texture');
        expect((result as ResponseError).description).toBe('Some error');
    });

    test('falls back to a generic response error for invalid data', async () => {
        const result = await processError(new Response('not json', { status: 400, statusText: 'Bad Request' }));
        expect(result).toBeInstanceOf(ResponseError);
        expect((result as ResponseError).message).toBe('Bad Request');
    });

    test('converts a generated FetchError to a request error', async () => {
        const result = await processError(new FetchError(new Error('Network Error')));
        expect(result).toBeInstanceOf(RequestError);
        expect(result.message).toBe('Network Error');
    });

    test('returns a default JavaScript Error unchanged', async () => {
        const error = new Error('Network Error');

        expect(await processError(error)).toBe(error);
    });

    test('uses fallback details for a malformed client ResponseError body', async () => {
        const response = {
            status: 502,
            statusText: 'Bad Gateway',
            clone: () => ({ text: async () => 'not valid JSON' }),
        } as unknown as Response;
        const result = await processError(
            new ClientResponseError(response, 'Response returned an error code')
        );

        expect(result).toBeInstanceOf(ResponseError);
        expect((result as ResponseError).status).toBe(502);
        expect((result as ResponseError).message).toBe('Response returned an error code');
        expect((result as ResponseError).description).toBe('No error description provided');
        expect((result as ResponseError).type).toBe(ResErrorType.UNKNOWN);
    });

    test('returns a client RequiredError unchanged', async () => {
        const error = new RequiredError('sessionId', 'Session ID is required');

        expect(await processError(error)).toBe(error);
    });

    test.each([
        ['SdGeometryError', new SdGeometryError('geometry error')],
        ['RequestError', new RequestError('request error')],
        ['ResponseError', new ResponseError(500, 'response error', 'description')],
        ['IllegalArgumentError', new IllegalArgumentError('url', 'invalid URL')],
        ['TimeoutError', new TimeoutError('sessionId', 'request timed out')],
    ])('returns the custom %s unchanged', async (_, error) => {
        expect(await processError(error)).toBe(error);
    });
});
