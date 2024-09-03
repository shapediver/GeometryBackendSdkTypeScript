import {
  ShapeDiverRequestCache,
  ShapeDiverRequestCustomization,
  ShapeDiverRequestExport,
  ShapeDiverResponseDto,
  ShapeDiverResponseAssetUploadHeaders,
  ShapeDiverResponseExport,
  ShapeDiverResponseOutput,
} from "@shapediver/api.geometry-api-dto-v2";
import {
  BaseResourceApi,
  ShapeDiverError,
  ShapeDiverSdkApi,
  ShapeDiverSdkApiResponseType,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { ShapeDiverSdk } from "../ShapeDiverSdk";
import {
  contentDispositionFromFilename,
  sendRequest,
  sleep,
} from "../utils/utils";

// TypeScript wrapper for a response type that depend on an input type
type ShapeDiverSdkUtilsDownloadType<T extends ShapeDiverSdkApiResponseType> =
  T extends ShapeDiverSdkApiResponseType.TEXT
    ? string
    : T extends ShapeDiverSdkApiResponseType.JSON
      ? Record<string, any>
      : T extends ShapeDiverSdkApiResponseType.DATA
        ? ArrayBuffer
        : never;

export class ShapeDiverUtilsApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * Upload the given file to the specified URL.
   *
   * @param url - The target URL of the upload request.
   * @param data - The data that should be uploaded.
   * @param contentType - Indicate the original media type of the resource.
   * @param filename - The name of the file to be uploaded. When a filename has been specified in
   * the request-upload call, then the same filename has to be specified for the upload as well.
   */
  async upload(
    url: string,
    data: ArrayBuffer | Record<string, any> | string,
    contentType: string,
    filename?: string,
  ): Promise<any> {
    return await sendRequest(async () =>
      this.api.put<any>(url, undefined, data, {
        contentType: contentType,
        contentDisposition: filename
          ? contentDispositionFromFilename(filename)
          : undefined,
        responseType: ShapeDiverSdkApiResponseType.JSON,
        disableAuthorization: true,
        disableCustomHeaders: true,
      }),
    );
  }

  /**
   * Upload the given asset to the specified ShapeDiver URL.
   *
   * @param url - The ShapeDiver URL of the upload request.
   * @param data - The data that should be uploaded.
   * @param headers - The headers object that was returned from the request-upload call.
   */
  async uploadAsset(
    url: string,
    data: ArrayBuffer | Record<string, any> | string,
    headers: ShapeDiverResponseAssetUploadHeaders,
  ): Promise<any> {
    return await sendRequest(async () =>
      this.api.put<any>(url, undefined, data, {
        contentType: headers.contentType,
        contentDisposition: headers.contentDisposition,
        responseType: ShapeDiverSdkApiResponseType.JSON,
        disableAuthorization: true,
        disableCustomHeaders: true,
      }),
    );
  }

  /**
   * Download from the given URL.
   *
   * @param url - The target URL of the download request.
   * @param responseType - Indicates the type of data that the server should respond with if possible.
   * @returns Array of size 2: [0] = response headers, [1] = response data
   */
  async download<T extends ShapeDiverSdkApiResponseType>(
    url: string,
    responseType: T,
  ): Promise<[Record<string, any>, ShapeDiverSdkUtilsDownloadType<T>]> {
    return await sendRequest(async () =>
      this.api.get<any>(url, undefined, {
        contentType: "application/json",
        responseType: responseType,
        disableAuthorization: true,
        disableCustomHeaders: true,
      }),
    );
  }

  /**
   * Submit a customization request and wait for the result to be finished.
   *
   * @param sdk
   * @param sessionId
   * @param body
   * @param maxWaitMsec - Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
   * @throws {@link ShapeDiverError} in case a maximum duration has been specified and is exceeded.
   * @returns
   */
  async submitAndWaitForCustomization(
    sdk: ShapeDiverSdk,
    sessionId: string,
    body: ShapeDiverRequestCustomization,
    maxWaitMsec = -1,
  ): Promise<ShapeDiverResponseDto> {
    const startMsec = Date.now();
    const dto = await sendRequest(async () =>
      sdk.output.customize(sessionId, body),
    );
    const waitMsec = Date.now() - startMsec;

    // Reduce the total max waiting time by the amount the customization-request took
    maxWaitMsec =
      maxWaitMsec < 0 ? maxWaitMsec : Math.max(0, maxWaitMsec - waitMsec);

    return ShapeDiverUtilsApi.waitForCustomizationResult(
      sdk,
      sessionId,
      dto,
      maxWaitMsec,
    );
  }

  /**
   * Submit an export request and wait for the result to be finished.
   *
   * @param sdk
   * @param sessionId
   * @param body
   * @param maxWaitMsec - Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
   * @throws {@link ShapeDiverError} in case a maximum duration has been specified and is exceeded.
   * @returns
   */
  async submitAndWaitForExport(
    sdk: ShapeDiverSdk,
    sessionId: string,
    body: ShapeDiverRequestExport,
    maxWaitMsec = -1,
  ): Promise<ShapeDiverResponseDto> {
    const startMsec = Date.now();
    const dto = await sendRequest(async () =>
      sdk.export.compute(sessionId, body),
    );
    const waitMsec = Date.now() - startMsec;

    // Reduce the total max waiting time by the amount the compute-request took
    maxWaitMsec =
      maxWaitMsec < 0 ? maxWaitMsec : Math.max(0, maxWaitMsec - waitMsec);

    return ShapeDiverUtilsApi.waitForExportResult(
      sdk,
      sessionId,
      body,
      dto,
      maxWaitMsec,
    );
  }

  /**
   * Given a DTO resulting from a customization request, wait for the results to be finished.
   *
   * @param sdk
   * @param sessionId
   * @param dto
   * @param maxWaitMsec - Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
   * @returns
   */
  private static async waitForCustomizationResult(
    sdk: ShapeDiverSdk,
    sessionId: string,
    dto: ShapeDiverResponseDto,
    maxWaitMsec = -1,
  ): Promise<ShapeDiverResponseDto> {
    if (!dto.outputs) return dto;

    // Build new cache request
    const outputVersions: ShapeDiverRequestCache = {};
    Object.keys(dto.outputs).forEach(
      (id) =>
        (outputVersions[id] = (
          dto.outputs![id] as ShapeDiverResponseOutput
        ).version),
    );

    let delay = ShapeDiverUtilsApi.getMaxOutputDelay(dto);
    const startMsec = Date.now();

    while (delay > 0) {
      // Check whether maxWaitMsec has been reached
      if (maxWaitMsec >= 0) {
        const waitMsec = Date.now() - startMsec;
        if (waitMsec >= maxWaitMsec) {
          throw new ShapeDiverError(
            `Maximum wait time of ${maxWaitMsec} ms reached`,
          );
        }
        if (waitMsec + delay > maxWaitMsec) {
          delay = maxWaitMsec - waitMsec;
        }
      }

      await sleep(delay);

      // Send cache request
      dto = await sendRequest(async () =>
        sdk.output.getCache(sessionId, outputVersions),
      );
      delay = ShapeDiverUtilsApi.getMaxOutputDelay(dto);
    }

    return dto;
  }

  /**
   * Given a DTO resulting from an export request, wait for the result to be finished.
   *
   * @param sdk
   * @param sessionId
   * @param dto
   * @param exportIds
   * @param outputIds
   * @param maxWaitMsec - Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
   * @returns
   */
  private static async waitForExportResult(
    sdk: ShapeDiverSdk,
    sessionId: string,
    body: ShapeDiverRequestExport,
    dto: ShapeDiverResponseDto,
    maxWaitMsec = -1,
  ): Promise<ShapeDiverResponseDto> {
    let delay = ShapeDiverUtilsApi.getMaxExportDelay(dto, body);
    const startMsec = Date.now();

    while (delay > 0) {
      // Check whether maxWaitMsec has been reached
      if (maxWaitMsec >= 0) {
        const waitMsec = Date.now() - startMsec;
        if (waitMsec >= maxWaitMsec) {
          throw new ShapeDiverError(
            `Maximum wait time of ${maxWaitMsec} ms reached`,
          );
        }
        if (waitMsec + delay > maxWaitMsec) {
          delay = maxWaitMsec - waitMsec;
        }
      }

      await sleep(delay);

      // Send cache request
      dto = await sendRequest(async () => sdk.export.getCache(sessionId, body));
      delay = ShapeDiverUtilsApi.getMaxExportDelay(dto, body);
    }

    return dto;
  }

  /**
   * Get the maximum delay that was reported for output versions.
   *
   * @returns maximum delay, -1 in case no delay was reported
   */
  private static getMaxOutputDelay(dto: ShapeDiverResponseDto): number {
    return Math.max(
      ...Object.values(dto.outputs!)
        .map((output) => output as ShapeDiverResponseOutput)
        .map((output) => output.delay ?? -1),
    );
  }

  /**
   * Get the maximum delay that was reported for the exports. If outputs have been reported as
   * well, their delay time is included too.
   *
   * @returns delay, -1 in case no delay was reported
   */
  private static getMaxExportDelay(
    dto: ShapeDiverResponseDto,
    body: ShapeDiverRequestExport,
  ): number {
    const exports = Array.isArray(body.exports)
      ? body.exports
      : [body.exports.id];
    const outputs = body.outputs ?? [];

    return Math.max(
      ...Object.values(dto.exports ?? {})
        .filter((e) => exports.includes(e.id))
        .map((e) => e as ShapeDiverResponseExport)
        .map((e) => e.delay ?? -1),
      ...Object.values(dto.outputs ?? {})
        .filter((o) => outputs.includes(o.id))
        .map((o) => o as ShapeDiverResponseOutput)
        .map((o) => o.delay ?? -1),
    );
  }
}
