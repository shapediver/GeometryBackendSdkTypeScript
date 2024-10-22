import { AxiosInstance, AxiosPromise, RawAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { createRequestFunction, serializeDataIfNeeded } from './client/common';
import {
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
import { TimeoutError } from './error';

export class UtilsApi extends BaseAPI {
    constructor(configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
        super(configuration, basePath, axios);
    }

    /**
     * Upload the given file to the specified URL.
     * @param {string} url The target URL of the upload request.
     * @param {string | Record<string, any> | ArrayBuffer | File} data The data that should be uploaded. Warning: Type `File` in Node.js might lead to problems!
     * @param {string} contentType Indicate the original media type of the resource.
     * @param {string} [filename] The name of the file to be uploaded. When a filename has been specified in the request-upload call, then the same filename has to be specified for the upload as well.
     * @param {*} [options] Override http request option.
     */
    public upload(
        url: string,
        data: string | Record<string, any> | ArrayBuffer | File,
        contentType: string,
        filename?: string,
        options?: RawAxiosRequestConfig
    ): AxiosPromise<unknown> {
        // Prepare headers for the upload.
        const reqHeaders: RawAxiosRequestHeaders = { 'Content-Type': contentType };
        if (filename) reqHeaders['Content-Disposition'] = contentDispositionFromFilename(filename);

        const reqOptions: RawAxiosRequestConfig = { ...options };
        reqOptions.headers = { ...reqHeaders, ...options?.headers };

        const request = this.buildRequest('PUT', url, data, reqOptions)();
        return request();
    }

    /**
     * Upload the given asset to the specified ShapeDiver URL.
     * @param {string} url The target URL of the upload request.
     * @param {string | Record<string, any> | ArrayBuffer | File} data The data that should be uploaded. Warning: Type `File` in Node.js might lead to problems!
     * @param {ResAssetUploadHeaders} headers The headers object that was returned from the request-upload call.
     * @param {*} [options] Override http request option.
     */
    public uploadAsset(
        url: string,
        data: string | Record<string, any> | ArrayBuffer | File,
        headers: ResAssetUploadHeaders,
        options?: RawAxiosRequestConfig
    ): AxiosPromise<unknown> {
        // Prepare headers for the upload.
        const reqHeaders: RawAxiosRequestHeaders = { 'Content-Type': headers.contentType };
        if (headers.contentDisposition)
            reqHeaders['Content-Disposition'] = headers.contentDisposition;

        const reqOptions: RawAxiosRequestConfig = { ...options };
        reqOptions.headers = { ...reqHeaders, ...options?.headers };

        const request = this.buildRequest('PUT', url, data, reqOptions)();
        return request();
    }

    /**
     * Download from the specified URL.
     * @param {string} url The target URL of the download request.
     * @param {*} [options] Override http request option.
     */
    public download(url: string, options?: RawAxiosRequestConfig): AxiosPromise<File> {
        const request = this.buildRequest('GET', url, options)();
        return request();
    }

    /**
     * Submit a customization request and wait for the result to be finished.
     * @param {string} sessionId The session ID.
     * @param {ReqCustomization} body The body of the customization request.
     * @param {number} [maxWaitMsec=-1] Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @param {*} [options] Override http request option.
     * @throws {TimeoutError} in case a maximum duration has been specified and is exceeded.
     */
    public async submitAndWaitForOutput(
        sessionId: string,
        body: ReqCustomization,
        maxWaitMsec = -1,
        options?: RawAxiosRequestConfig
    ): Promise<ResComputeOutputs> {
        const startMsec = Date.now();
        const dto = (
            await new OutputApi(this.configuration).computeOutputs(sessionId, body, options)
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
     * @param {*} [options] Override http request option.
     * @throws {TimeoutError} in case a maximum duration has been specified and is exceeded.
     */
    public async submitAndWaitForExport(
        sessionId: string,
        body: ReqExport,
        maxWaitMsec = -1,
        options?: RawAxiosRequestConfig
    ): Promise<ResComputeExports> {
        const startMsec = Date.now();
        const dto = (
            await new ExportApi(this.configuration).computeExports(sessionId, body, options)
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

            const axiosArgs: RequestArgs = { url, options: reqOptions };
            return createRequestFunction(axiosArgs, this.axios, basePath, this.configuration).bind(
                this.axios
            );
        };
    }
}
