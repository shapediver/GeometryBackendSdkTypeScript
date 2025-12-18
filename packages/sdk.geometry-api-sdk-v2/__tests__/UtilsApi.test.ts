import axios, { AxiosHeaders } from 'axios';
import {
    ExportApi,
    OutputApi,
    ResComputeExports,
    ResComputeOutputs,
    ResExportDefinitionType,
    ResGetCachedExports,
    ResGetCachedOutputs,
    sleep,
    TimeoutError,
    UtilsApi,
} from '../src';

describe('Axios Response Types in Node.js', () => {
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

    /** Helper to validate Buffer responses. */
    function expectBuffer(data: any) {
        expect(data).toBeInstanceOf(Buffer);
        expect(data.byteLength).toBeGreaterThan(0);
    }

    describe('arraybuffer response-type', () => {
        const responseType = 'arraybuffer';

        test('should return ArrayBuffer for image endpoint', async () => {
            const url = `${httpbin}/image/png`;

            const axiosRes = await axios.get(url, { responseType });
            expectBuffer(axiosRes.data);

            const sdRes = await utilsApi.download(url, { responseType });
            expectArrayBuffer(sdRes.data);
        });

        test('should return ArrayBuffer for HTML endpoint', async () => {
            const url = `${httpbin}/html`;

            const axiosRes = await axios.get(url, { responseType });
            expectBuffer(axiosRes.data);

            const sdRes = await utilsApi.download(url, { responseType });
            expectArrayBuffer(sdRes.data);
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
        test('should return string for image endpoint and response-type blob', async () => {
            await expectBothToMatch(`${httpbin}/image/png`, 'blob', expectString);
        });
    });
});

describe('waitForOutputResult', function () {
    const utilsApi = new UtilsApi(),
        sessionId = '12a210fa-2804-11ef-b7a5-1bc3e7751d5d';

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('no outputs', async () => {
        const resCompute: ResComputeOutputs = { version: '1' };

        // Mock
        const getMaxOutputDelay = jest.spyOn(UtilsApi.prototype as any, 'getMaxOutputDelay');

        // @ts-expect-error
        const res = await utilsApi.waitForOutputResult(sessionId, resCompute, 123.4);

        expect(res).toStrictEqual(resCompute);
        expect(getMaxOutputDelay).toHaveBeenCalledTimes(0);
    });

    test('negative delay', async () => {
        const resCompute: ResComputeOutputs = {
            version: '1',
            outputs: {
                '33c694f3a090a06560777870d3d1d317': {
                    id: '33c694f3a090a06560777870d3d1d317',
                    version: 'c8b8874fda26cee295faf97d22dcbb5b',
                    name: 'some-name',
                    hidden: false,
                    dependency: [],
                },
            },
        };

        // Mock
        const getCachedOutputs = jest.spyOn(OutputApi.prototype, 'getCachedOutputs');

        // @ts-expect-error
        const res = await utilsApi.waitForOutputResult(sessionId, resCompute, -1);

        expect(res).toStrictEqual(resCompute);
        expect(getCachedOutputs).toHaveBeenCalledTimes(0);
    });

    test('positive delay and no timeout', async () => {
        const resCache: ResGetCachedOutputs = {
            version: '1',
            outputs: {
                '33c694f3a090a06560777870d3d1d317': {
                    id: '33c694f3a090a06560777870d3d1d317',
                    version: '22e93a3339da89bd6d4e027614c8f644',
                    name: 'some-name',
                    hidden: false,
                    dependency: [],
                    content: [],
                },
                '6298d3d386252e6c0d2a0606fa17b470': {
                    id: '6298d3d386252e6c0d2a0606fa17b470',
                    version: '526d24be587bbd8ad9ef09c19295d5e1',
                    name: 'some-name',
                    hidden: false,
                    dependency: [],
                    content: [],
                },
            },
        };

        // Mock
        const getCachedOutputs = jest.spyOn(OutputApi.prototype, 'getCachedOutputs');
        getCachedOutputs.mockReturnValue(
            Promise.resolve({
                data: resCache,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { headers: new AxiosHeaders() },
            })
        );

        // @ts-expect-error
        const res = await utilsApi.waitForOutputResult(
            sessionId,
            {
                version: '1',
                outputs: {
                    '0ca411fecc995160971ed9d965acd218': {
                        id: '0ca411fecc995160971ed9d965acd218',
                        name: 'some-name',
                        hidden: false,
                        dependency: [],
                    },
                    '33c694f3a090a06560777870d3d1d317': {
                        id: '33c694f3a090a06560777870d3d1d317',
                        version: '22e93a3339da89bd6d4e027614c8f644',
                        name: 'some-name',
                        hidden: false,
                        dependency: [],
                    },
                    '6298d3d386252e6c0d2a0606fa17b470': {
                        id: '6298d3d386252e6c0d2a0606fa17b470',
                        version: '526d24be587bbd8ad9ef09c19295d5e1',
                        name: 'some-name',
                        hidden: false,
                        dependency: [],
                        delay: 100,
                    },
                },
            },
            123.4
        );

        expect(res).toStrictEqual(resCache);
        expect(getCachedOutputs).toHaveBeenCalledTimes(1);
        expect(getCachedOutputs).toHaveBeenCalledWith(
            sessionId,
            {
                '33c694f3a090a06560777870d3d1d317': '22e93a3339da89bd6d4e027614c8f644',
                '6298d3d386252e6c0d2a0606fa17b470': '526d24be587bbd8ad9ef09c19295d5e1',
            },
            undefined // options
        );
    });

    test('positive delay and timeout', async () => {
        const resCache: ResGetCachedOutputs = {
            version: '1',
            outputs: {
                '33c694f3a090a06560777870d3d1d317': {
                    id: '33c694f3a090a06560777870d3d1d317',
                    version: '22e93a3339da89bd6d4e027614c8f644',
                    name: 'some-name',
                    hidden: false,
                    dependency: [],
                    delay: 250,
                },
            },
        };

        // Mock
        const getCachedOutputs = jest.spyOn(OutputApi.prototype, 'getCachedOutputs');
        getCachedOutputs.mockReturnValue(
            Promise.resolve({
                data: resCache,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { headers: new AxiosHeaders() },
            })
        );

        await expect(
            // @ts-expect-error
            utilsApi.waitForOutputResult(
                sessionId,
                {
                    version: '1',
                    outputs: {
                        '33c694f3a090a06560777870d3d1d317': {
                            id: '33c694f3a090a06560777870d3d1d317',
                            version: '22e93a3339da89bd6d4e027614c8f644',
                            name: 'some-name',
                            hidden: false,
                            dependency: [],
                            delay: 100,
                        },
                    },
                },
                500
            )
        ).rejects.toThrow(TimeoutError);
        expect(getCachedOutputs).toHaveBeenCalledTimes(3);
    });
});

describe('waitForExportResult', function () {
    const utilsApi = new UtilsApi(),
        sessionId = '12a210fa-2804-11ef-b7a5-1bc3e7751d5d';

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('negative delay', async () => {
        const resCompute: ResComputeExports = {
            version: '1',
            exports: {
                '4c77e42cee6f1be8afacffd4806cfdc3': {
                    id: '4c77e42cee6f1be8afacffd4806cfdc3',
                    version: '3faf86a8467e83f0ac969bf03bece264',
                    name: 'some-name',
                    type: ResExportDefinitionType.DOWNLOAD,
                    hidden: false,
                    dependency: [],
                },
            },
        };

        // Mock
        const getCachedExports = jest.spyOn(ExportApi.prototype, 'getCachedExports');

        // @ts-expect-error
        const res = await utilsApi.waitForExportResult(
            sessionId,
            { parameters: {}, exports: ['4c77e42cee6f1be8afacffd4806cfdc3'] },
            resCompute,
            -1
        );

        expect(res).toStrictEqual(resCompute);
        expect(getCachedExports).toHaveBeenCalledTimes(0);
    });

    test('positive delay and no timeout', async () => {
        const resCache: ResGetCachedExports = {
            version: '1',
            exports: {
                '4c77e42cee6f1be8afacffd4806cfdc3': {
                    id: '4c77e42cee6f1be8afacffd4806cfdc3',
                    version: '3faf86a8467e83f0ac969bf03bece264',
                    name: 'some-name',
                    type: ResExportDefinitionType.DOWNLOAD,
                    hidden: false,
                    dependency: [],
                },
            },
        };

        // Mock
        const getCachedExports = jest.spyOn(ExportApi.prototype, 'getCachedExports');
        getCachedExports.mockReturnValue(
            Promise.resolve({
                data: resCache,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { headers: new AxiosHeaders() },
            })
        );

        // @ts-expect-error
        const res = await utilsApi.waitForExportResult(
            sessionId,
            { parameters: {}, exports: ['4c77e42cee6f1be8afacffd4806cfdc3'] },
            {
                version: '1',
                exports: {
                    '4c77e42cee6f1be8afacffd4806cfdc3': {
                        id: '4c77e42cee6f1be8afacffd4806cfdc3',
                        version: '3faf86a8467e83f0ac969bf03bece264',
                        name: 'some-name',
                        type: ResExportDefinitionType.DOWNLOAD,
                        hidden: false,
                        dependency: [],
                        delay: 100,
                    },
                },
            },
            123.4
        );

        expect(res).toStrictEqual(resCache);
        expect(getCachedExports).toHaveBeenCalledTimes(1);
    });

    test('positive delay and timeout', async () => {
        const resCache: ResGetCachedExports = {
            version: '1',
            exports: {
                '4c77e42cee6f1be8afacffd4806cfdc3': {
                    id: '4c77e42cee6f1be8afacffd4806cfdc3',
                    version: '3faf86a8467e83f0ac969bf03bece264',
                    name: 'some-name',
                    type: ResExportDefinitionType.DOWNLOAD,
                    hidden: false,
                    dependency: [],
                    delay: 250,
                },
            },
        };

        // Mock
        const getCachedExports = jest.spyOn(ExportApi.prototype, 'getCachedExports');
        getCachedExports.mockReturnValue(
            Promise.resolve({
                data: resCache,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { headers: new AxiosHeaders() },
            })
        );

        await expect(
            // @ts-expect-error
            utilsApi.waitForExportResult(
                sessionId,
                { parameters: {}, exports: ['4c77e42cee6f1be8afacffd4806cfdc3'] },
                {
                    version: '1',
                    exports: {
                        '4c77e42cee6f1be8afacffd4806cfdc3': {
                            id: '4c77e42cee6f1be8afacffd4806cfdc3',
                            version: '3faf86a8467e83f0ac969bf03bece264',
                            name: 'some-name',
                            type: ResExportDefinitionType.DOWNLOAD,
                            hidden: false,
                            dependency: [],
                            delay: 100,
                        },
                    },
                },
                500
            )
        ).rejects.toThrow(TimeoutError);
        expect(getCachedExports).toHaveBeenCalledTimes(3);
    });
});

describe('getMaxOutputDelay', function () {
    const utilsApi = new UtilsApi();

    test('no outputs', () => {
        // @ts-expect-error
        const res = utilsApi.getMaxOutputDelay({ version: '1', outputs: undefined });
        expect(res).toBe(-1);
    });

    test('empty outputs', () => {
        // @ts-expect-error
        const res = utilsApi.getMaxOutputDelay({ version: '1', outputs: {} });
        expect(res).toBe(-1);
    });

    test('mixed', () => {
        // @ts-expect-error
        const res = utilsApi.getMaxOutputDelay({
            version: '1',
            outputs: {
                '0ca411fecc995160971ed9d965acd218': {
                    id: '0ca411fecc995160971ed9d965acd218',
                    name: 'some-name',
                    hidden: false,
                    dependency: [],
                },
                '33c694f3a090a06560777870d3d1d317': {
                    id: '33c694f3a090a06560777870d3d1d317',
                    version: '0cb58bc66f41e5d02e7698041c61a267',
                    name: 'some-name',
                    hidden: false,
                    dependency: [],
                },
                '6298d3d386252e6c0d2a0606fa17b470': {
                    id: '6298d3d386252e6c0d2a0606fa17b470',
                    version: '164b3792229712add59cb8c20ae896d0',
                    name: 'some-name',
                    hidden: false,
                    dependency: [],
                    delay: 1000,
                },
                e82d5ea72507658f8d20d73d2e36e329: {
                    id: 'e82d5ea72507658f8d20d73d2e36e329',
                    version: '20f19cbcecab95db84ef14be587d786b',
                    name: 'some-name',
                    hidden: false,
                    dependency: [],
                    delay: 1001,
                },
            },
        });
        expect(res).toBe(1001);
    });
});

describe('getMaxExportDelay', function () {
    const utilsApi = new UtilsApi();

    test('no exports, no outputs', () => {
        // @ts-expect-error
        const res = utilsApi.getMaxExportDelay(
            { parameters: {}, exports: [] },
            { version: '1', exports: undefined, outputs: undefined }
        );
        expect(res).toBe(-1);
    });

    test('empty exports, empty outputs', () => {
        // @ts-expect-error
        const res = utilsApi.getMaxExportDelay(
            { parameters: {}, exports: [] },
            { version: '1', exports: {}, outputs: {} }
        );
        expect(res).toBe(-1);
    });

    test('mixed exports and outputs', () => {
        // @ts-expect-error
        const res = utilsApi.getMaxExportDelay(
            {
                parameters: {},
                exports: [
                    'df4a9c34b6c0cde97ca9ed4862c83d3d',
                    '4c77e42cee6f1be8afacffd4806cfdc3',
                    '81de396951f26b0c1aaeafe54c1711c3',
                    '2e18f3c4fa47270676af072d0ef3d7a6',
                ],
                outputs: [
                    '0ca411fecc995160971ed9d965acd218',
                    '33c694f3a090a06560777870d3d1d317',
                    '6298d3d386252e6c0d2a0606fa17b470',
                    'e82d5ea72507658f8d20d73d2e36e329',
                ],
            },
            {
                version: '1',
                exports: {
                    df4a9c34b6c0cde97ca9ed4862c83d3d: {
                        id: 'df4a9c34b6c0cde97ca9ed4862c83d3d',
                        name: '9ad04b1f9080be40d558bcb9bd8e82ab',
                        type: ResExportDefinitionType.DOWNLOAD,
                        hidden: false,
                        dependency: [],
                    },
                    '4c77e42cee6f1be8afacffd4806cfdc3': {
                        id: '4c77e42cee6f1be8afacffd4806cfdc3',
                        version: '3faf86a8467e83f0ac969bf03bece264',
                        name: 'some-name',
                        type: ResExportDefinitionType.DOWNLOAD,
                        hidden: false,
                        dependency: [],
                    },
                    '81de396951f26b0c1aaeafe54c1711c3': {
                        id: '81de396951f26b0c1aaeafe54c1711c3',
                        version: '8131411b9ab5ed20a3e277fa640136ef',
                        name: 'some-name',
                        type: ResExportDefinitionType.DOWNLOAD,
                        hidden: false,
                        dependency: [],
                        delay: 998,
                    },
                    '2e18f3c4fa47270676af072d0ef3d7a6': {
                        id: '2e18f3c4fa47270676af072d0ef3d7a6',
                        version: 'f4c56df78c0851f9889c9ca44f3709dc',
                        name: 'some-name',
                        type: ResExportDefinitionType.DOWNLOAD,
                        hidden: false,
                        dependency: [],
                        delay: 999,
                    },
                },
                outputs: {
                    '0ca411fecc995160971ed9d965acd218': {
                        id: '0ca411fecc995160971ed9d965acd218',
                        name: 'some-name',
                        hidden: false,
                        dependency: [],
                    },
                    '33c694f3a090a06560777870d3d1d317': {
                        id: '33c694f3a090a06560777870d3d1d317',
                        version: 'some-version',
                        name: 'some-name',
                        hidden: false,
                        dependency: [],
                    },
                    '6298d3d386252e6c0d2a0606fa17b470': {
                        id: '6298d3d386252e6c0d2a0606fa17b470',
                        version: 'some-version',
                        name: 'some-name',
                        hidden: false,
                        dependency: [],
                        delay: 1000,
                    },
                    e82d5ea72507658f8d20d73d2e36e329: {
                        id: 'e82d5ea72507658f8d20d73d2e36e329',
                        version: 'some-version',
                        name: 'some-name',
                        hidden: false,
                        dependency: [],
                        delay: 1001,
                    },
                },
            }
        );
        expect(res).toBe(1001);
    });

    test('ignore non requested exports and outputs', () => {
        // @ts-expect-error
        const res = utilsApi.getMaxExportDelay(
            {
                parameters: {},
                exports: ['df4a9c34b6c0cde97ca9ed4862c83d3d'],
                outputs: ['0ca411fecc995160971ed9d965acd218'],
            },
            {
                version: '1',
                exports: {
                    df4a9c34b6c0cde97ca9ed4862c83d3d: {
                        id: 'df4a9c34b6c0cde97ca9ed4862c83d3d',
                        name: '9ad04b1f9080be40d558bcb9bd8e82ab',
                        type: ResExportDefinitionType.DOWNLOAD,
                        hidden: false,
                        dependency: [],
                    },
                    '2e18f3c4fa47270676af072d0ef3d7a6': {
                        id: '2e18f3c4fa47270676af072d0ef3d7a6',
                        version: 'f4c56df78c0851f9889c9ca44f3709dc',
                        name: 'some-name',
                        type: ResExportDefinitionType.DOWNLOAD,
                        hidden: false,
                        dependency: [],
                        delay: 1000,
                    },
                },
                outputs: {
                    '0ca411fecc995160971ed9d965acd218': {
                        id: '0ca411fecc995160971ed9d965acd218',
                        name: 'some-name',
                        hidden: false,
                        dependency: [],
                    },
                    e82d5ea72507658f8d20d73d2e36e329: {
                        id: 'e82d5ea72507658f8d20d73d2e36e329',
                        version: 'some-version',
                        name: 'some-name',
                        hidden: false,
                        dependency: [],
                        delay: 1000,
                    },
                },
            }
        );
        expect(res).toBe(-1);
    });
});
