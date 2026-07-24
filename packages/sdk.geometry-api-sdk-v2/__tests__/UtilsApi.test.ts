import { Configuration as ClientConfig } from '../src/client/runtime';
import {
    ExportApi,
    OutputApi,
    ResComputeExports,
    ResComputeOutputs,
    ResExportDefinitionType,
    ResGetCachedExports,
    ResGetCachedOutputs,
    Configuration,
    TimeoutError,
    UtilsApi,
} from '../src';

describe('Fetch response types in Node.js', () => {
    const url = 'https://example.com/resource';

    function expectArrayBuffer(data: any) {
        expect(data).toBeInstanceOf(ArrayBuffer);
        expect(data.byteLength).toBeGreaterThan(0);
    }
    function expectJsonObject(data: any) {
        expect(typeof data).toBe('object');
        expect(data).not.toBeNull();
    }
    function expectString(data: any) {
        expect(typeof data).toBe('string');
        expect(data.length).toBeGreaterThan(0);
    }
    function expectBlob(data: any) {
        expect(data).toBeInstanceOf(Blob);
        expect(data.size).toBeGreaterThan(0);
        expect(data.type).toBe('image/png');
    }

    async function expectBody(
        body: BodyInit,
        read: (response: Response) => Promise<unknown>,
        validator: (data: any) => void,
        headers?: HeadersInit
    ): Promise<void> {
        const fetch = jest.fn().mockResolvedValue(new Response(body, { status: 200, headers }));
        const utilsApi = new UtilsApi(new ClientConfig({ fetchApi: fetch }));

        validator(await read(await utilsApi.download(url)));
        expect(fetch).toHaveBeenCalledWith(url, expect.objectContaining({ method: 'GET' }));
    }

    test('should return ArrayBuffer for binary responses', async () => {
        await expectBody(new Uint8Array([1, 2, 3]), (r) => r.arrayBuffer(), expectArrayBuffer);
    });

    test('should return parsed JSON for JSON responses', async () => {
        await expectBody(
            JSON.stringify({ hello: 'world' }),
            (r) => r.json(),
            expectJsonObject,
            { 'Content-Type': 'application/json' }
        );
    });

    test('should return text for text responses', async () => {
        await expectBody('<html>content</html>', (r) => r.text(), expectString);
    });

    test('should return a Blob for binary responses', async () => {
        await expectBody(
            new Uint8Array([1, 2, 3]),
            (r) => r.blob(),
            expectBlob,
            { 'Content-Type': 'image/png' }
        );
    });

    test('should reject when parsing invalid JSON', async () => {
        const fetch = jest.fn().mockResolvedValue(new Response('not JSON', { status: 200 }));
        const utilsApi = new UtilsApi(new ClientConfig({ fetchApi: fetch }));

        await expect((await utilsApi.download(url)).json()).rejects.toThrow();
    });

    test('should expose the Fetch response for default handling', async () => {
        const fetch = jest.fn().mockResolvedValue(new Response('{"hello":"world"}', { status: 200 }));
        const utilsApi = new UtilsApi(new ClientConfig({ fetchApi: fetch }));

        const response = await utilsApi.download(url);
        expect(response).toBeInstanceOf(Response);
        expect(await response.json()).toEqual({ hello: 'world' });
    });
});

describe('Fetch request construction', () => {
    function response(): Response {
        return new Response('{}', { status: 200 });
    }

    test('resolves relative URLs and merges configured and request headers', async () => {
        const fetch = jest.fn().mockResolvedValue(response());
        const utilsApi = new UtilsApi(
            new ClientConfig({
                basePath: 'https://api.example.com/',
                headers: { 'X-Base': 'base', 'X-Override': 'base' },
                fetchApi: fetch,
            })
        );

        await utilsApi.download('/asset', {
            headers: { 'X-Request': 'request', 'X-Override': 'request' },
        });

        const [url, init] = fetch.mock.calls[0];
        const headers = new Headers(init.headers);
        expect(url).toBe('https://api.example.com/asset');
        expect(init.method).toBe('GET');
        expect(headers.get('X-Base')).toBe('base');
        expect(headers.get('X-Request')).toBe('request');
        expect(headers.get('X-Override')).toBe('request');
    });

    test('injects internal authorization and allows an explicit override', async () => {
        const fetch = jest.fn().mockResolvedValue(response());
        const utilsApi = new UtilsApi(
            new ClientConfig({
                basePath: 'https://api.example.com',
                accessToken: 'configured-token',
                fetchApi: fetch,
            })
        );

        await utilsApi.download('/asset', {
            headers: { Authorization: 'Bearer request-token' },
        });

        expect(new Headers(fetch.mock.calls[0][1].headers).get('Authorization')).toBe(
            'Bearer request-token'
        );
    });

    test('removes configured authorization for direct-download URLs', async () => {
        const fetch = jest.fn().mockResolvedValue(response());
        const utilsApi = new UtilsApi(
            new ClientConfig({
                headers: { Authorization: 'Bearer configured-token' },
                fetchApi: fetch,
            })
        );

        await utilsApi.download('https://viewer.shapediver.com/asset');

        expect(new Headers(fetch.mock.calls[0][1].headers).has('Authorization')).toBe(false);
    });

    test('preserves an explicit authorization header for direct-download URLs', async () => {
        const fetch = jest.fn().mockResolvedValue(response());
        const utilsApi = new UtilsApi(new ClientConfig({ fetchApi: fetch }));

        await utilsApi.download('https://viewer.shapediver.com/asset', {
            headers: { Authorization: 'Bearer explicit-token' },
        });

        expect(new Headers(fetch.mock.calls[0][1].headers).get('Authorization')).toBe(
            'Bearer explicit-token'
        );
    });

    test('removes configured authorization for CDN asset URLs', async () => {
        const fetch = jest.fn().mockResolvedValue(response());
        const utilsApi = new UtilsApi(
            new ClientConfig({
                headers: { Authorization: 'Bearer configured-token' },
                fetchApi: fetch,
            })
        );

        await utilsApi.download('https://cdn.shapediver.com/assets/cdn-asset-outputs/abc123');

        expect(new Headers(fetch.mock.calls[0][1].headers).has('Authorization')).toBe(false);
    });

    test('uses Fetch method, body, and upload headers', async () => {
        const fetch = jest.fn().mockResolvedValue(response());
        const utilsApi = new UtilsApi(new ClientConfig({ fetchApi: fetch }));

        await utilsApi.upload(
            'https://upload.example.com/asset',
            'payload',
            'text/plain',
            'asset.txt'
        );

        const [url, init] = fetch.mock.calls[0];
        const headers = new Headers(init.headers);
        expect(url).toBe('https://upload.example.com/asset');
        expect(init.method).toBe('PUT');
        expect(init.body).toBe('payload');
        expect(headers.get('Content-Type')).toBe('text/plain');
        expect(headers.get('Content-Disposition')).toContain('asset.txt');
    });

    test('uses the preformatted Content-Disposition from an asset upload response', async () => {
        const fetch = jest.fn().mockResolvedValue(response());
        const utilsApi = new UtilsApi(new ClientConfig({ fetchApi: fetch }));
        const contentDisposition = 'attachment; filename="asset.txt"';

        await utilsApi.uploadAsset(
            'https://upload.example.com/asset',
            'payload',
            { contentType: 'text/plain', contentDisposition }
        );

        const headers = new Headers(fetch.mock.calls[0][1].headers);
        expect(headers.get('Content-Disposition')).toBe(contentDisposition);
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
            Promise.resolve(resCache)
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
            Promise.resolve(resCache)
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
            Promise.resolve(resCache)
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
            Promise.resolve(resCache)
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

describe('isTargetingInternalOrNoCdnServer', function () {
    // Wrapper around private utils function
    function isTargetingInternalOrNoCdnServer(utilsApi: UtilsApi, url: string) {
        return (utilsApi as any).isTargetingInternalOrNoCdnServer(url);
    }

    test('returns false when no configuration is set', () => {
        const utilsApi = new UtilsApi();
        expect(isTargetingInternalOrNoCdnServer(utilsApi, 'https://example.com')).toBeFalsy();
    });

    test('returns false when configuration has no basePath', () => {
        const utilsApi = new UtilsApi(new Configuration({}));
        expect(isTargetingInternalOrNoCdnServer(utilsApi, 'https://example.com')).toBeFalsy();
    });

    test('returns true when URL origin matches basePath origin', () => {
        const config = new Configuration({
            basePath: 'https://sddev2.eu-central-1.shapediver.com',
        });
        const utilsApi = new UtilsApi(config);
        expect(
            isTargetingInternalOrNoCdnServer(
                utilsApi,
                'https://sddev2.eu-central-1.shapediver.com/api/v2/session'
            )
        ).toBeTruthy();
    });

    test('returns false when URL origin differs from basePath origin', () => {
        const config = new Configuration({
            basePath: 'https://sddev2.eu-central-1.shapediver.com',
        });
        const utilsApi = new UtilsApi(config);
        expect(
            isTargetingInternalOrNoCdnServer(utilsApi, 'https://other-server.com/api/v2/session')
        ).toBeFalsy();
    });

    test('returns true for ShapeDiver no-CDN URL', () => {
        const config = new Configuration({
            basePath: 'https://sddev2.eu-central-1.shapediver.com',
        });
        const utilsApi = new UtilsApi(config);
        expect(
            isTargetingInternalOrNoCdnServer(
                utilsApi,
                'https://system-nocdn.eu-central-1.shapediver.com/session/abc'
            )
        ).toBeTruthy();
    });

    test('returns false for a URL that does not match no-CDN pattern', () => {
        const config = new Configuration({
            basePath: 'https://sddev2.eu-central-1.shapediver.com',
        });
        const utilsApi = new UtilsApi(config);
        expect(
            isTargetingInternalOrNoCdnServer(
                utilsApi,
                'https://system-cdn.eu-central-1.shapediver.com/session/abc'
            )
        ).toBeFalsy();
    });

    test('returns false for an invalid URL', () => {
        const config = new Configuration({
            basePath: 'https://sddev2.eu-central-1.shapediver.com',
        });
        const utilsApi = new UtilsApi(config);
        expect(isTargetingInternalOrNoCdnServer(utilsApi, 'not-a-valid:::url')).toBeFalsy();
    });

    test('resolves relative URL against basePath and returns true for same origin', () => {
        const config = new Configuration({
            basePath: 'https://sddev2.eu-central-1.shapediver.com',
        });
        const utilsApi = new UtilsApi(config);
        expect(isTargetingInternalOrNoCdnServer(utilsApi, '/api/v2/session/abc')).toBeTruthy();
    });
});

describe('disableAuthHeaderForShapeDiverUris', () => {
    const utilsApi = new UtilsApi();

    function disabledHeaders(url: string): string[] {
        const headers: string[] = [];
        (utilsApi as any).disableAuthHeaderForShapeDiverUris(url, {}, headers);
        return headers;
    }

    test.each([
        'https://viewer.shapediver.com/asset',
        'https://textures.shapediver.com/asset',
        'https://downloads.shapediver.com/asset',
        'https://cdn.shapediver.com/assets/cdn-asset-outputs/abc123',
        'https://cdn.shapediver.com/assets/cdn-asset-exports/abc123',
        'https://cdn.shapediver.com/assets/cdn-asset-textures/abc123',
    ])('disables Authorization for %s', (url) => {
        expect(disabledHeaders(url)).toContain('Authorization');
    });

    test.each(['not-a-valid:::url', 'https://example.com/some/path'])('keeps Authorization for %s', (url) => {
        expect(disabledHeaders(url)).not.toContain('Authorization');
    });
});
