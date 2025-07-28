import { AxiosInstance, AxiosPromise, RawAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { createRequestFunction, serializeDataIfNeeded } from './client/common';
import {
    AssetsApi,
    Configuration,
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
} from './client';
import { BaseAPI, RequestArgs } from './client/base';
import { contentDispositionFromFilename, sleep } from './utils';
import { IllegalArgumentError, TimeoutError } from './error';

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

export class UtilsApi extends BaseAPI {
    constructor(configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
        super(configuration, basePath, axios);
    }

    /**
     * Upload the given file to the specified URL.
     * @param {string} url The target URL of the upload request.
     * @param {*} data The data that should be uploaded.
     * @param {string} contentType Indicate the original media type of the resource.
     * @param {string} [filename] The name of the file to be uploaded. When a filename has been specified in the request-upload call, then the same filename has to be specified for the upload as well.
     * @param {*} [options] Override http request option.
     */
    public upload(
        url: string,
        data: any,
        contentType: string,
        filename?: string,
        options?: RawAxiosRequestConfig
    ): AxiosPromise<unknown> {
        // Prepare headers for the upload.
        const reqHeaders: RawAxiosRequestHeaders = {
            Authorization: undefined, // Disable by default to avoid accidental token exposure.
            'Content-Type': contentType,
            /* Override custom ShapeDiver headers to avoid CORS issues. */
            'X-ShapeDiver-Origin': undefined,
            'X-ShapeDiver-SessionEngineId': undefined,
            'X-ShapeDiver-BuildVersion': undefined,
            'X-ShapeDiver-BuildDate': undefined,
            'X-ShapeDiver-UserAgent': undefined,
        };
        if (filename) reqHeaders['Content-Disposition'] = contentDispositionFromFilename(filename);

        const reqOptions: RawAxiosRequestConfig = { ...options };
        reqOptions.headers = { ...reqHeaders, ...options?.headers };

        const request = this.buildRequest('PUT', url, data, reqOptions)();
        return request();
    }

    /**
     * Upload the given asset to the specified ShapeDiver URL.
     * @param {string} url The target URL of the upload request.
     * @param {*} data The data that should be uploaded.
     * @param {ResAssetUploadHeaders} headers The headers object that was returned from the request-upload call.
     * @param {*} [options] Override http request option.
     */
    public uploadAsset(
        url: string,
        data: any,
        headers: ResAssetUploadHeaders,
        options?: RawAxiosRequestConfig
    ): AxiosPromise<unknown> {
        // Prepare headers for the upload.
        const reqHeaders: RawAxiosRequestHeaders = {
            Authorization: undefined, // Disable by default to avoid accidental token exposure.
            'Content-Type': headers.contentType,
            /* Override custom ShapeDiver headers to avoid CORS issues. */
            'X-ShapeDiver-Origin': undefined,
            'X-ShapeDiver-SessionEngineId': undefined,
            'X-ShapeDiver-BuildVersion': undefined,
            'X-ShapeDiver-BuildDate': undefined,
            'X-ShapeDiver-UserAgent': undefined,
        };
        if (headers.contentDisposition)
            reqHeaders['Content-Disposition'] = headers.contentDisposition;

        const reqOptions: RawAxiosRequestConfig = { ...options };
        reqOptions.headers = { ...reqHeaders, ...options?.headers };

        const request = this.buildRequest('PUT', url, data, reqOptions)();
        return request();
    }

    /**
     * Download from the specified URL.
     *
     * The response type can be controlled by setting the `responseType` in the `options` object.
     * @param {string} url The target URL of the download request.
     * @param {*} [options] Override http request option.
     */
    public download(
        url: string,
        options: { responseType: 'arraybuffer' | 'blob' } & RawAxiosRequestConfig
    ): AxiosPromise<File>;
    public download(
        url: string,
        options: { responseType: 'json' } & RawAxiosRequestConfig
    ): AxiosPromise<Record<string, unknown>>;
    public download(
        url: string,
        options: { responseType: 'text' } & RawAxiosRequestConfig
    ): AxiosPromise<string>;
    public download(url: string, options?: RawAxiosRequestConfig): AxiosPromise<unknown>;
    public download(url: string, options?: RawAxiosRequestConfig): AxiosPromise<unknown> {
        const request = this.buildRequest('GET', url, undefined, options)();
        return request();
    }

    /**
     * Downloads a ShapeDiver export, output, or texture asset from the specified URL. The type of
     * the asset is determined by the URL and returned with the promise.
     *
     * The response type can be controlled by setting the `responseType` in the `options` object.
     * @param {string} url The URL of the asset to download.
     * @param {*} [options] Override http request option.
     * @throws {IllegalArgumentError} in case the URL is not a valid ShapeDiver asset URL.
     */
    public downloadAsset(
        url: string,
        options: { responseType: 'arraybuffer' | 'blob' } & RawAxiosRequestConfig
    ): [AxiosPromise<File>, 'export' | 'output' | 'texture'];
    public downloadAsset(
        url: string,
        options?: RawAxiosRequestConfig
    ): [AxiosPromise<unknown>, 'export' | 'output' | 'texture'];
    public downloadAsset(
        url: string,
        options?: RawAxiosRequestConfig
    ): [AxiosPromise<unknown>, 'export' | 'output' | 'texture'] {
        let type: 'output' | 'export' | 'texture';
        this.disableAuthHeaderForShapeDiverUris(url, options);

        // Check if the given URL is a valid API or CDN asset URL
        if (apiAssetExportUri.test(url) || cdnAssetExportUri.test(url)) type = 'export';
        else if (apiAssetOutputUri.test(url) || cdnAssetOutputUri.test(url)) type = 'output';
        else if (apiAssetTextureUri.test(url) || cdnAssetTextureUri.test(url)) type = 'texture';
        else {
            throw new IllegalArgumentError(
                `Cannot fetch asset: Invalid URL '${url}' - Only ShapeDiver asset URLs are allowed.`
            );
        }

        return [this.download(url, options) as any, type];
    }

    /**
     * Helper function that downloads all ShapeDiver texture URLs directly, and redirects all other
     * URLs to the `AssetsApi.downloadImage` endpoint to avoid CORS issues.
     *
     * The response type can be controlled by setting the `responseType` in the `options` object.
     * @param {string} sessionId The session ID.
     * @param {string} url The URL of the image to download.
     * @param {*} [options] Override http request option.
     */
    public downloadImage(
        sessionId: string,
        url: string,
        options: { responseType: 'arraybuffer' | 'blob' } & RawAxiosRequestConfig
    ): AxiosPromise<File>;
    public downloadImage(
        sessionId: string,
        url: string,
        options?: RawAxiosRequestConfig
    ): AxiosPromise<unknown>;
    public downloadImage(
        sessionId: string,
        url: string,
        options?: RawAxiosRequestConfig
    ): AxiosPromise<unknown> {
        this.disableAuthHeaderForShapeDiverUris(url, options);

        if (
            apiAssetTextureUri.test(url) ||
            cdnAssetTextureUri.test(url) ||
            directDownloadUri.test(url)
        ) {
            // Call ShapeDiver texture-asset URLs directly
            return this.download(url, options) as any;
        } else {
            // All other source URLs are called via the download-image endpoint

            // Use a universal base64 encoder for browser and Node.js environments
            const encodedUrl =
                typeof window !== 'undefined' && window.btoa
                    ? window.btoa(
                          encodeURIComponent(url).replace(/%([0-9A-F]{2})/g, (_, p1) =>
                              String.fromCharCode(parseInt(p1, 16))
                          )
                      )
                    : Buffer.from(url, 'utf-8').toString('base64');

            return new AssetsApi(this.configuration).downloadImage(sessionId, encodedUrl, options);
        }
    }

    /**
     * Submit a customization request and wait for the result to be finished.
     * @param {string} sessionId The session ID.
     * @param {ReqCustomization} body The body of the customization request.
     * @param {number} [maxWaitMsec=-1] Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @param {boolean} [ignoreUnknownParams=false] Allow relaxed validation of parameter
     * identifiers. When set to `true`, unrecognized parameters will be ignored rather than causing
     * an error.  Defaults to `false`.
     * @param {*} [options] Override http request option.
     * @throws {TimeoutError} in case a maximum duration has been specified and is exceeded.
     */
    public async submitAndWaitForOutput(
        sessionId: string,
        body: ReqCustomization,
        maxWaitMsec = -1,
        ignoreUnknownParams?: boolean,
        options?: RawAxiosRequestConfig
    ): Promise<ResComputeOutputs> {
        const startMsec = Date.now();
        const dto = (
            await new OutputApi(this.configuration).computeOutputs(
                sessionId,
                body,
                ignoreUnknownParams,
                options
            )
        ).data;
        const waitMsec = Date.now() - startMsec;

        // Reduce the total max waiting time by the amount the customization-request took
        maxWaitMsec = maxWaitMsec < 0 ? maxWaitMsec : Math.max(0, maxWaitMsec - waitMsec);

        return this.waitForOutputResult(sessionId, dto, maxWaitMsec, options);
    }

    /**
     * Submit an export request and wait for the result to be finished.
     * @param {string} sessionId The session ID.
     * @param {ReqExport} body The body of the export request.
     * @param {number} [maxWaitMsec=-1] Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @param {boolean} [ignoreUnknownParams=false] Allow relaxed validation of parameter
     * identifiers. When set to `true`, unrecognized parameters will be ignored rather than causing
     * an error.  Defaults to `false`.
     * @param {*} [options] Override http request option.
     * @throws {TimeoutError} in case a maximum duration has been specified and is exceeded.
     */
    public async submitAndWaitForExport(
        sessionId: string,
        body: ReqExport,
        maxWaitMsec = -1,
        ignoreUnknownParams?: boolean,
        options?: RawAxiosRequestConfig
    ): Promise<ResComputeExports> {
        const startMsec = Date.now();
        const dto = (
            await new ExportApi(this.configuration).computeExports(
                sessionId,
                body,
                ignoreUnknownParams,
                options
            )
        ).data;
        const waitMsec = Date.now() - startMsec;

        // Reduce the total max waiting time by the amount the compute-request took
        maxWaitMsec = maxWaitMsec < 0 ? maxWaitMsec : Math.max(0, maxWaitMsec - waitMsec);

        return this.waitForExportResult(sessionId, body, dto, maxWaitMsec, options);
    }

    /**
     * Given a DTO resulting from a customization request, wait for the results to be finished.
     * @param {string} sessionId The session ID.
     * @param {ResComputeOutputs} dto The DTO resulting from a customization request.
     * @param {number} [maxWaitMsec=-1] Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @param {*} [options] Override http request option.
     * @throws {TimeoutError} in case a maximum duration has been specified and is exceeded.
     */
    private async waitForOutputResult(
        sessionId: string,
        dto: ResComputeOutputs,
        maxWaitMsec: number,
        options?: RawAxiosRequestConfig
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
            dto = (
                await new OutputApi(this.configuration).getCachedOutputs(
                    sessionId,
                    outputVersions,
                    options
                )
            ).data;
            delay = this.getMaxOutputDelay(dto);
        }

        return dto;
    }

    /**
     * Given a DTO resulting from an export request, wait for the result to be finished.
     * @param {string} sessionId The session ID.
     * @param {ReqExport} body The body of the export request.
     * @param {ResComputeExports} dto The DTO resulting from an export request.
     * @param {number} [maxWaitMsec=-1] Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @param {*} [options] Override http request option.
     * @throws {TimeoutError} in case a maximum duration has been specified and is exceeded.
     */
    private async waitForExportResult(
        sessionId: string,
        body: ReqExport,
        dto: ResComputeExports,
        maxWaitMsec: number,
        options?: RawAxiosRequestConfig
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
            dto = (
                await new ExportApi(this.configuration).getCachedExports(sessionId, body, options)
            ).data;
            delay = this.getMaxExportDelay(body, dto);
        }

        return dto;
    }

    /**
     * Get the maximum delay that was reported for output versions.
     * @param {ResComputeOutputs | ResGetCachedOutputs} dto The DTO resulting from a customization request.
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
     * @param {ResComputeExports | ResGetCachedExports} dto The DTO resulting from an export request.
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
     * Builds an Axios request from the given configuration, the API's base configuration, and the
     * optional http request option.
     * @param {string} method The HTTP method to use.
     * @param {string} url The URL to send the request to.
     * @param {*} data The data to send with the request.
     * @param {*} [options={}] Optional http request options.
     */
    private buildRequest(
        method: string,
        url: string,
        data: any,
        options: RawAxiosRequestConfig = {}
    ) {
        return (basePath: string = '') => {
            const baseOptions = this.configuration?.baseOptions ?? {};
            const baseHeaders = baseOptions && baseOptions.headers ? baseOptions.headers : {};

            const reqOptions = { method, ...baseOptions, ...options };
            reqOptions.headers = { ...baseHeaders, ...options.headers };
            if (!reqOptions.data && data) {
                // Create a new configuration object if necessary to enable mime type detection
                // in the serialization process.
                const configuration = this.configuration ?? new Configuration();
                reqOptions.data = serializeDataIfNeeded(data, reqOptions, configuration);
            }

            // Remove the base path configuration if the URL is a full URL.
            const configuration =
                this.configuration && url.startsWith('http')
                    ? new Configuration({ ...this.configuration, basePath: undefined })
                    : this.configuration;

            const axiosArgs: RequestArgs = { url, options: reqOptions };
            return createRequestFunction(axiosArgs, this.axios, basePath, configuration).bind(
                this.axios
            );
        };
    }

    /** Disable the Authorization header for ShapeDiver URIs if not explicitly set. */
    private disableAuthHeaderForShapeDiverUris(
        url: string,
        options?: RawAxiosRequestConfig
    ): void {
        options = { ...options };
        if (
            !options.headers?.Authorization &&
            (cdnAssetUri.test(url) || directDownloadUri.test(url))
        )
            options.headers = { Authorization: undefined, ...options.headers };
    }
}
