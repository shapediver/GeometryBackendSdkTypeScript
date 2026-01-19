import { AxiosError } from 'axios';
import { RequestError, ResponseError, processError } from '../src';

describe('processError', function () {
    const error = 'SdTextureUrlError',
        desc = 'Some error related to a user-defined texture url',
        message = 'Could not fetch texture',
        jsonError = { error, desc, message },
        createResData = (data: any) => {
            return {
                status: 400,
                data,
                statusText: 'Bad Request',
                headers: {},
                config: {} as any,
            };
        };

    test.each([
        {
            name: 'plain object error',
            data: jsonError,
        },
        {
            name: 'JSON string error',
            data: JSON.stringify(jsonError),
        },
        {
            name: 'ArrayBuffer error',
            data: (() => {
                const encoder = new TextEncoder();
                return encoder.encode(JSON.stringify(jsonError)).buffer;
            })(),
        },
        {
            name: 'Blob error',
            data: new Blob([JSON.stringify(jsonError)], { type: 'application/json' }),
        },
    ])('should handle response with $name', async ({ data }) => {
        const axiosError = new AxiosError('Request failed with status code 400');
        axiosError.response = createResData(data);

        const result = await processError(axiosError);
        expect(result).toBeInstanceOf(ResponseError);
        expect((result as ResponseError).status).toBe(400);
        expect((result as ResponseError).message).toBe(message);
        expect((result as ResponseError).description).toBe(desc);
        expect((result as ResponseError).type).toBe(error);
    });

    test.each([
        {
            name: 'data is not valid JSON',
            data: 'Not a valid JSON string',
        },
        {
            name: 'data is missing fields',
            data: { error: 'SomeError' },
        },
    ])('should fallback to generic error when $name', async ({ data }) => {
        const axiosError = new AxiosError('Request failed with status code 400');
        axiosError.response = createResData(data);

        const result = await processError(axiosError);
        expect(result).toBeInstanceOf(ResponseError);
        expect((result as ResponseError).status).toBe(400);
        expect((result as ResponseError).message).toBe('Request failed with status code 400');
        expect((result as ResponseError).description).toBe('No error description provided');
    });

    test('should handle request error (no response)', async () => {
        const axiosError = new AxiosError('Network Error');
        axiosError.request = {};

        const result = await processError(axiosError);
        expect(result).toBeInstanceOf(RequestError);
        expect((result as RequestError).message).toBe('Network Error');
    });

    test('should return original error when not an Axios error', async () => {
        const genericError = new Error('Some generic error');

        const result = await processError(genericError);
        expect(result).toBe(genericError);
        expect(result.message).toBe('Some generic error');
    });
});
