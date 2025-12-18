import axios from 'axios';
import { sleep, UtilsApi } from '../src';

describe('Axios Response Types in Browser', () => {
    const httpbin = 'https://httpbin.dev',
        utilsApi = new UtilsApi();

    afterEach(async () => {
        await sleep(100); // Be polite to the httpbin-server
    });

    /** Helper function to test that both axios and utilsApi return the same response type. */
    async function expectBothToMatch(
        url: string,
        responseType: any,
        validator: (data: any) => void
    ): Promise<void> {
        const axiosRes = await axios.get(url, { responseType });
        validator(axiosRes.data);

        const sdRes = await utilsApi.download(url, { responseType });
        validator(sdRes.data);
    }

    /** Helper to validate ArrayBuffer responses. */
    function expectArrayBuffer(data: any) {
        expect(data).toBeInstanceOf(ArrayBuffer);
        expect(data.byteLength).toBeGreaterThan(0);
    }

    /** Helper to validate JSON object responses. */
    function expectJsonObject(data: any) {
        expect(typeof data).toBe('object');
        expect(data).not.toBeInstanceOf(ArrayBuffer);
        expect(data).not.toBeInstanceOf(Blob);
        expect(data).not.toBeNull();
    }

    /** Helper to validate string responses. */
    function expectString(data: any) {
        expect(typeof data).toBe('string');
        expect(data.length).toBeGreaterThan(0);
    }

    /** Helper to validate Blob responses. */
    function expectBlob(data: any, expectedType?: string) {
        expect(data).toBeInstanceOf(Blob);
        expect(data.size).toBeGreaterThan(0);
        if (expectedType) {
            expect(data.type).toContain(expectedType);
        }
    }

    describe('arraybuffer response-type', () => {
        const responseType = 'arraybuffer';

        test('should return ArrayBuffer for image endpoint', async () => {
            await expectBothToMatch(`${httpbin}/image/png`, responseType, expectArrayBuffer);
        });

        test('should return ArrayBuffer for HTML endpoint', async () => {
            await expectBothToMatch(`${httpbin}/html`, responseType, expectArrayBuffer);
        });
    });

    describe('json response-type', () => {
        const responseType = 'json';

        test('should return parsed object for JSON endpoint', async () => {
            await expectBothToMatch(`${httpbin}/json`, responseType, expectJsonObject);
        });

        test('should return string/error for image endpoint', async () => {
            const url = `${httpbin}/image/png`;

            // Axios returns the raw data as string
            const axiosRes = await axios.get(url, { responseType });
            expectString(axiosRes.data);

            // SDK should throw since the response is not valid JSON
            await expect(utilsApi.download(url, { responseType })).rejects.toThrow(
                'Invalid JSON response: Could not parse response as JSON'
            );
        });
    });

    describe('text response-type', () => {
        const responseType = 'text';

        test('should return string for HTML endpoint', async () => {
            await expectBothToMatch(`${httpbin}/html`, responseType, expectString);
        });

        test('should return string for image endpoint', async () => {
            await expectBothToMatch(`${httpbin}/image/png`, responseType, expectString);
        });
    });

    describe('default response-type', () => {
        test('should auto-parse JSON to object', async () => {
            await expectBothToMatch(`${httpbin}/json`, undefined, expectJsonObject);
        });

        test('should auto-parse PDF to string', async () => {
            await expectBothToMatch(`${httpbin}/pdf`, undefined, expectString);
        });
    });

    describe('unsupported response-type', () => {
        test('should return Blob for image endpoint and response-type blob', async () => {
            await expectBothToMatch(`${httpbin}/image/png`, 'blob', (data) =>
                expectBlob(data, 'image/png')
            );
        });
    });
});
