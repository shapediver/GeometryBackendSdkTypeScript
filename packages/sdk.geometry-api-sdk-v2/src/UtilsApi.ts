import { BaseAPI } from './base';
import {
    AssetsApi,
    ExportApi,
    OutputApi,
    ReqCache,
    ReqCustomization,
    ReqExport,
    ResAssetUploadHeaders,
    ResComputeExports,
    ResComputeOutputs,
    ResExport,
    ResGetCachedExports,
    ResGetCachedOutputs,
    ResOutput,
} from './client/index';
import {
    Configuration as ClientConfig,
    ResponseError as ClientResponseError,
} from './client/runtime';
import { Configuration } from './configuration';
import { IllegalArgumentError, TimeoutError } from './error';
import { contentDispositionFromFilename, sleep } from './utils';

/* Regex patterns for different asset types targeting the ShapeDiver API. */
const apiAssetExportUri = /.+\/session\/.+\/export\/.+/;
const apiAssetOutputUri = /.+\/session\/.+\/output\/.+/;
const apiAssetTextureUri = /.+\/session\/.+\/texture\/.+/;

/* Regex patterns for different asset types targeting the ShapeDiver CDN. */
const cdnAssetUri = /.+\/cdn-asset-(exports|outputs|textures)\/.+/;
const cdnAssetExportUri = /.+\/cdn-asset-exports\/.+/;
const cdnAssetOutputUri = /.+\/cdn-asset-outputs\/.+/;
const cdnAssetTextureUri = /.+\/cdn-asset-textures\/.+/;

/* Regex patterns for direct download URIs. */
const directDownloadUri = /^(http[s]?:\/\/)?(viewer|textures|downloads)\.shapediver\.com(\/.*)?$/;

/* Regex pattern for ShapeDiver no-CDN servers. */
const sdNoCdnOrigin = /-nocdn.[\w-]+.shapediver.com$/;

/** List of headers to remove before sending the request. */
type DisableHeaders = string[];

export class UtilsApi extends BaseAPI {
    constructor(config?: Configuration | ClientConfig) {
        super(config);
    }

    /**
     * Upload the given file to the specified URL.
     *
     * _Note: This method does not use the `UtilsApi`'s base configuration._
     * @param url The target URL of the upload request.
     * @param data The data that should be uploaded.
     * @param contentType Indicate the original media type of the resource.
     * @param [filename] The name of the file to be uploaded. When a filename has been specified in the request-upload call, then the same filename has to be specified for the upload as well.
     * @param [options] Override http request option.
     */
    public upload(
        url: string,
        data: any,
        contentType: string,
        filename?: string,
        options: RequestInit = {}
    ): Promise<Response> {
        // Prepare headers for the upload.
        options.headers = new Headers(options.headers);
        options.headers.set('Content-Type', contentType);
        if (filename)
            options.headers.set('Content-Disposition', contentDispositionFromFilename(filename));

        const disableHeaders: DisableHeaders = [
            'Authorization', // Disable by default to avoid accidental token exposure.

            /* Override custom ShapeDiver headers to avoid CORS issues. */
            'X-ShapeDiver-Origin',
            'X-ShapeDiver-SessionEngineId',
            'X-ShapeDiver-BuildVersion',
            'X-ShapeDiver-BuildDate',
            'X-ShapeDiver-UserAgent',
        ];

        return this.fetchRequest("PUT", url, data, options, disableHeaders);
    }

    /**
     * Upload the given asset to the specified ShapeDiver URL.
     *
     * _Note: This method does not use the `UtilsApi`'s base configuration._
     * @param url The target URL of the upload request.
     * @param data The data that should be uploaded.
     * @param headers The headers object that was returned from the request-upload call.
     * @param [options] Override http request option.
     */
    public uploadAsset(
        url: string,
        data: any,
        headers: ResAssetUploadHeaders,
        options: RequestInit = {}
    ): Promise<Response> {
        // Prepare headers for the upload.
        options.headers = new Headers(options.headers);
        options.headers.set('Content-Type', headers.contentType);
        if (headers.contentDisposition) {
            options.headers.set('Content-Disposition', headers.contentDisposition);
        }

        const disableHeaders: DisableHeaders = [
            'Authorization', // Disable by default to avoid accidental token exposure.

            /* Override custom ShapeDiver headers to avoid CORS issues. */
            'X-ShapeDiver-Origin',
            'X-ShapeDiver-SessionEngineId',
            'X-ShapeDiver-BuildVersion',
            'X-ShapeDiver-BuildDate',
            'X-ShapeDiver-UserAgent',
        ];

        return this.fetchRequest("PUT", url, data, options, disableHeaders);
    }

    /**
     * Downloads data from the specified URL.
     *
     * @param url The URL to download from.
     * @param [options] Optional HTTP request overrides.
     * @throws ResponseError if the response type cannot be handled, such as when JSON parsing
     * fails.
     */
    public async download(url: string, options: RequestInit = {}): Promise<Response> {
        const disableHeaders: DisableHeaders = [];
        this.disableAuthHeaderForShapeDiverUris(url, options, disableHeaders);

        return await this.fetchRequest("GET", url, undefined, options, disableHeaders);
    }

    /**
     * Downloads a ShapeDiver export, output, or texture asset from the specified URL. The type of
     * the asset is determined by the URL and returned with the promise.
     *
     * The response type can be controlled by setting the `responseType` in the `options` object.
     * @param url The URL of the asset to download.
     * @param [options] Override http request option.
     * @throws IllegalArgumentError in case the URL is not a valid ShapeDiver asset URL.
     */
    public downloadAsset(
        url: string,
        options?: RequestInit
    ): [Promise<Response>, 'export' | 'output' | 'texture'] {
        let type: 'output' | 'export' | 'texture';

        // Check if the given URL is a valid API or CDN asset URL
        if (apiAssetExportUri.test(url) || cdnAssetExportUri.test(url)) type = 'export';
        else if (apiAssetOutputUri.test(url) || cdnAssetOutputUri.test(url)) type = 'output';
        else if (apiAssetTextureUri.test(url) || cdnAssetTextureUri.test(url)) type = 'texture';
        else {
            throw new IllegalArgumentError(
                `Cannot fetch asset: Invalid URL '${url}' - Only ShapeDiver asset URLs are allowed.`
            );
        }

        return [this.download(url, options), type];
    }

    /**
     * Helper function that downloads all ShapeDiver texture URLs directly, and redirects all other
     * URLs to the `AssetsApi.downloadImage` endpoint to avoid CORS issues.
     *
     * The response type can be controlled by setting the `responseType` in the `options` object.
     * @param sessionId The session ID.
     * @param url The URL of the image to download.
     * @param [options] Override http request option and set response-type.
     */
    public downloadImage(
        sessionId: string,
        url: string,
        options?: RequestInit
    ): Promise<Blob>;
    public downloadImage(
        sessionId: string,
        url: string,
        options: RequestInit & { responseType: "arraybuffer" }
    ): Promise<ArrayBuffer>;
    public async downloadImage(
        sessionId: string,
        url: string,
        options: RequestInit & { responseType?: 'arraybuffer' } = {}
    ): Promise<Blob | ArrayBuffer> {
        const responseType = options.responseType;
        if (
            apiAssetTextureUri.test(url) ||
            cdnAssetTextureUri.test(url) ||
            directDownloadUri.test(url)
        ) {
            // Call ShapeDiver texture-asset URLs directly
            const response = await this.download(url, options);

            return responseType === 'arraybuffer'
                ? response.arrayBuffer()
                : response.blob();
        } else {
            /* All other source URLs are called via the download-image endpoint */

            // Use a universal base64 encoder for browser and Node.js environments
            const encodedUrl =
                typeof window !== 'undefined' && window.btoa
                    ? window.btoa(
                        encodeURIComponent(url).replace(/%([0-9A-F]{2})/g, (_, p1) =>
                            String.fromCharCode(parseInt(p1, 16))
                        )
                    )
                    : Buffer.from(url, 'utf-8').toString('base64');

            // Remove the authrization header from all configurations.
            const config = new Configuration(this.configuration);
            if (config.headers && config.headers['Authorization'])
                delete config.headers!['Authrization'];

            const image = await new AssetsApi(config).downloadImage(
                sessionId,
                encodedUrl,
                options
            );

            return responseType === 'arraybuffer'
                ? await image.arrayBuffer()
                : image;
        }
    }

    /**
     * Submit a customization request and wait for the result to be finished.
     * @param sessionId The session ID.
     * @param body The body of the customization request.
     * @param [maxWaitMsec=-1] Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @param [ignoreUnknownParams=false] Allow relaxed validation of parameter identifiers. When set to `true`, unrecognized parameters will be ignored rather than causing an error. Defaults to `false`.
     * @param [options] Override http request option.
     * @throws TimeoutError in case a maximum duration has been specified and is exceeded.
     */
    public async submitAndWaitForOutput(
        sessionId: string,
        body: ReqCustomization,
        maxWaitMsec = -1,
        ignoreUnknownParams?: boolean,
        options?: RequestInit
    ): Promise<ResComputeOutputs> {
        const startMsec = Date.now();
        const dto = await new OutputApi(this.configuration).computeOutputs(
            sessionId,
            body,
            ignoreUnknownParams,
            options
        );
        const waitMsec = Date.now() - startMsec;

        // Reduce the total max waiting time by the amount the customization-request took
        maxWaitMsec = maxWaitMsec < 0 ? maxWaitMsec : Math.max(0, maxWaitMsec - waitMsec);

        return this.waitForOutputResult(sessionId, dto, maxWaitMsec, options);
    }

    /**
     * Submit an export request and wait for the result to be finished.
     * @param sessionId The session ID.
     * @param body The body of the export request.
     * @param [maxWaitMsec=-1] Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @param [ignoreUnknownParams=false] Allow relaxed validation of parameter identifiers. When set to `true`, unrecognized parameters will be ignored rather than causing an error. Defaults to `false`.
     * @param [options] Override http request option.
     * @throws TimeoutError in case a maximum duration has been specified and is exceeded.
     */
    public async submitAndWaitForExport(
        sessionId: string,
        body: ReqExport,
        maxWaitMsec = -1,
        ignoreUnknownParams?: boolean,
        options?: RequestInit
    ): Promise<ResComputeExports> {
        const startMsec = Date.now();
        const dto = await new ExportApi(this.configuration).computeExports(
            sessionId,
            body,
            ignoreUnknownParams,
            options
        );
        const waitMsec = Date.now() - startMsec;

        // Reduce the total max waiting time by the amount the compute-request took
        maxWaitMsec = maxWaitMsec < 0 ? maxWaitMsec : Math.max(0, maxWaitMsec - waitMsec);

        return this.waitForExportResult(sessionId, body, dto, maxWaitMsec, options);
    }

    /**
     * Given a DTO resulting from a customization request, wait for the results to be finished.
     * @param sessionId The session ID.
     * @param dto The DTO resulting from a customization request.
     * @param [maxWaitMsec=-1] Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @param [options] Override http request option.
     * @throws TimeoutError in case a maximum duration has been specified and is exceeded.
     */
    private async waitForOutputResult(
        sessionId: string,
        dto: ResComputeOutputs,
        maxWaitMsec: number,
        options?: RequestInit
    ): Promise<ResComputeOutputs> {
        if (!dto.outputs) return dto;

        // Build new cache request
        const outputVersions: ReqCache = {};
        Object.keys(dto.outputs).forEach(
            (id) => (outputVersions[id] = (dto.outputs![id] as ResOutput).version)
        );

        let delay = this.getMaxOutputDelay(dto);
        const startMsec = Date.now();

        while (delay > 0) {
            // Check whether maxWaitMsec has been reached
            if (maxWaitMsec >= 0) {
                const waitMsec = Date.now() - startMsec;
                if (waitMsec >= maxWaitMsec) {
                    throw new TimeoutError(`Maximum wait time of ${maxWaitMsec} ms reached`);
                }
                if (waitMsec + delay > maxWaitMsec) {
                    delay = maxWaitMsec - waitMsec;
                }
            }

            await sleep(delay);

            // Send cache request
            dto = await new OutputApi(this.configuration).getCachedOutputs(
                sessionId,
                outputVersions,
                options
            )
            delay = this.getMaxOutputDelay(dto);
        }

        return dto;
    }

    /**
     * Given a DTO resulting from an export request, wait for the result to be finished.
     * @param sessionId The session ID.
     * @param body The body of the export request.
     * @param dto The DTO resulting from an export request.
     * @param [maxWaitMsec=-1] Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @param [options] Override http request option.
     * @throws TimeoutError in case a maximum duration has been specified and is exceeded.
     */
    private async waitForExportResult(
        sessionId: string,
        body: ReqExport,
        dto: ResComputeExports,
        maxWaitMsec: number,
        options?: RequestInit
    ): Promise<ResComputeExports> {
        let delay = this.getMaxExportDelay(body, dto);
        const startMsec = Date.now();

        while (delay > 0) {
            // Check whether maxWaitMsec has been reached
            if (maxWaitMsec >= 0) {
                const waitMsec = Date.now() - startMsec;
                if (waitMsec >= maxWaitMsec) {
                    throw new TimeoutError(`Maximum wait time of ${maxWaitMsec} ms reached`);
                }
                if (waitMsec + delay > maxWaitMsec) {
                    delay = maxWaitMsec - waitMsec;
                }
            }

            await sleep(delay);

            // Send cache request
            dto = await new ExportApi(this.configuration).getCachedExports(sessionId, body, options);
            delay = this.getMaxExportDelay(body, dto);
        }

        return dto;
    }

    /**
     * Get the maximum delay that was reported for output versions.
     * @param dto The DTO resulting from a customization request.
     * @returns maximum delay, -1 in case no delay was reported
     */
    private getMaxOutputDelay(dto: ResComputeOutputs | ResGetCachedOutputs): number {
        return Math.max(
            ...Object.values(dto.outputs ?? {}).map((output) => (output as ResOutput).delay ?? -1),
            -1
        );
    }

    /**
     * Get the maximum delay that was reported for the exports. If outputs have been reported as
     * well, their delay time is included too.
     * @param dto The DTO resulting from an export request.
     * @returns delay, -1 in case no delay was reported
     */
    private getMaxExportDelay(
        body: ReqExport,
        dto: ResComputeExports | ResGetCachedExports
    ): number {
        const exports = body.exports ?? [];
        const outputs = body.outputs ?? [];

        return Math.max(
            ...Object.values(dto.exports ?? {})
                .filter((e) => exports.includes(e.id))
                .map((e) => (e as ResExport).delay ?? -1),
            ...Object.values(dto.outputs ?? {})
                .filter((o) => outputs.includes(o.id))
                .map((o) => (o as ResOutput).delay ?? -1),
            -1
        );
    }

    /**
    * Replacement for `runtime.BaseAPI.request`.
    * Needed to call `createFetchParameters`.
    */
    private async fetchRequest(
        method: string,
        url: string,
        data: unknown,
        options: RequestInit = {},
        disableHeaders: DisableHeaders = []
    ): Promise<Response> {
        const { url: requestUrl, init } = await this.createFetchParameters(
            method,
            url,
            data,
            options,
            disableHeaders
        );

        const response = await this.fetchApi(requestUrl, init);
        if (response.ok) return response;

        throw new ClientResponseError(response, 'Response returned an error code');
    }

    /**
    * Replacement for `runtime.BaseAPI.createFetchParams`.
    * Needed to allow dynamic basePath handling and proper header manipulation.
    */
    private async createFetchParameters(
        method: string,
        url: string,
        data: unknown,
        options: RequestInit,
        disableHeaders: DisableHeaders
    ): Promise<{ url: string; init: RequestInit }> {
        const configuration = this.configuration ?? new Configuration();

        // Add authorization if applicable.
        const authHeaders: Record<string, string> = {};
        if (
            this.isTargetingInternalOrNoCdnServer(url) &&
            this.configuration &&
            this.configuration.accessToken
        ) {
            const token = this.configuration.accessToken;
            const tokenString = await token("JwtAuth", []);

            if (tokenString) authHeaders["Authorization"] = `Bearer ${tokenString}`;
        }

        const headers = new Headers(configuration.headers);
        for (const source of [
            authHeaders,
            options.headers,
        ]) {
            if (!source) continue;
            new Headers(source).forEach((value, name) => headers.set(name, value));
        }

        // Remove all disabled headers.
        disableHeaders.forEach(header => headers.delete(header));

        const init: RequestInit = {
            ...options,
            method,
            headers,
            body: this.serializeDataForFetch(data, headers),
        };

        return {
            url: this.createFetchUrl(url),
            init
        };
    }

    /** Prepends the base-path to `url` when the URL is relative. */
    private createFetchUrl(url: string): string {
        if (url.startsWith("http")) return url;

        const basePath = this.configuration.basePath.replace(/\/+$/, "");
        const path = url.replace(/^\/+/, "");

        return `${basePath}/${path}`;
    }

    /** Passes `BodyInit` types through, stringifies JSON bodies and throws for invalid types. */
    private serializeDataForFetch(data: unknown, headers: Headers): BodyInit | undefined {
        if (data === undefined || data === null) return undefined;

        if (
            typeof data === 'string' ||
            data instanceof ArrayBuffer ||
            ArrayBuffer.isView(data) ||
            (typeof Blob !== 'undefined' && data instanceof Blob) ||
            (typeof FormData !== 'undefined' && data instanceof FormData) ||
            (typeof URLSearchParams !== 'undefined' && data instanceof URLSearchParams) ||
            (typeof ReadableStream !== 'undefined' && data instanceof ReadableStream)
        ) {
            return data as BodyInit;
        }

        if (!this.isJsonMime(headers.get('content-type') ?? '')) {
            throw new TypeError(
                'Request body must be a Fetch BodyInit value or use a JSON Content-Type.'
            );
        }

        const body = JSON.stringify(data);

        // JSON.stringify(undefined), functions, and symbols returns undefined.
        if (body === undefined) {
            throw new TypeError('Request body cannot be serialized as JSON.');
        }

        return body;
    }

    /**
     * Checks whether the given URL is targeting the same server as the one specified in the API's
     * base path configuration or if it is a ShapeDiver no-CDN server.
     */
    private isTargetingInternalOrNoCdnServer(url: string): boolean {
        const basePath = this.configuration?.basePath;
        if (!basePath) return false;

        try {
            const targetUrl = new URL(url, basePath);
            const baseUrl = new URL(basePath);

            return targetUrl.origin === baseUrl.origin || sdNoCdnOrigin.test(targetUrl.origin);
        } catch {
            return false;
        }
    }

    /** Disable the Authorization header for ShapeDiver URIs if not explicitly set. */
    private disableAuthHeaderForShapeDiverUris(
        url: string,
        options: RequestInit,
        disableHeaders: DisableHeaders,
    ): void {
        const headers = new Headers(options.headers);

        // When an authorization header is set, it will override anything that is set later
        if (headers.has('Authorization')) return;

        const fetchUrl = this.createFetchUrl(url);

        let targetUrl: URL;
        try {
            targetUrl = new URL(fetchUrl);
        } catch {
            return;
        }

        if (directDownloadUri.test(targetUrl.origin) || cdnAssetUri.test(targetUrl.pathname))
            disableHeaders.push('Authorization');
    }
}
