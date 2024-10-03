import {
  BaseResourceApi,
  ShapeDiverError,
  ShapeDiverSdkApi,
  ShapeDiverSdkApiResponseType,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { encodeBase64, sendRequest } from "../utils/utils";

const apiAssetExportUri = /.+\/session\/.+\/export\/.+/;
const apiAssetOutputUri = /.+\/session\/.+\/output\/.+/;
const apiAssetTextureUri = /.+\/session\/.+\/texture\/.+/;

const cdnAssetUri = /.+\/cdn-asset-(exports|outputs|textures)\/.+/;
const cdnAssetExportUri = /.+\/cdn-asset-exports\/.+/;
const cdnAssetOutputUri = /.+\/cdn-asset-outputs\/.+/;
const cdnAssetTextureUri = /.+\/cdn-asset-textures\/.+/;

const directDownloadUri =
  /^(http[s]?:\/\/)?(viewer|textures|downloads)\.shapediver\.com(\/.*)?$/;

export class ShapeDiverAssetApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * Download an export.
   *
   * @param sessionId
   * @param assetData
   */
  async getExport(
    sessionId: string,
    assetData: string,
  ): Promise<[ArrayBuffer, string]> {
    return await sendRequest(async () => {
      const [header, data] = await this.api.get<ArrayBuffer>(
        `${this.buildSessionUri(sessionId)}/export/${assetData}`,
        undefined,
        { responseType: ShapeDiverSdkApiResponseType.DATA },
      );
      const contentType = header["Content-Type"] ?? header["content-type"];
      return [data, contentType];
    });
  }

  /**
   * Download an output.
   *
   * @param sessionId
   * @param assetData
   */
  async getOutput(
    sessionId: string,
    assetData: string,
  ): Promise<[ArrayBuffer, string]> {
    return await sendRequest(async () => {
      const [header, data] = await this.api.get<ArrayBuffer>(
        `${this.buildSessionUri(sessionId)}/output/${assetData}`,
        undefined,
        { responseType: ShapeDiverSdkApiResponseType.DATA },
      );
      const contentType = header["Content-Type"] ?? header["content-type"];
      return [data, contentType];
    });
  }

  /**
   * Downloads the JSON content part of a sdTF output.
   *
   * @param sessionId
   * @param assetData
   */
  async getSdtfJsonContent(
    sessionId: string,
    assetData: string,
  ): Promise<Record<string, any>> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ArrayBuffer>(
            `${this.buildSessionUri(sessionId)}/output/${assetData}`,
            undefined,
            {
              responseType: ShapeDiverSdkApiResponseType.JSON,
              accept: "model/vnd.sdtf+json",
            },
          )
        )[1],
    );
  }

  /**
   * Download a texture file.
   *
   * @param sessionId
   * @param assetData
   */
  async getTexture(
    sessionId: string,
    assetData: string,
  ): Promise<[ArrayBuffer, string]> {
    return await sendRequest(async () => {
      const [header, data] = await this.api.get<ArrayBuffer>(
        `${this.buildSessionUri(sessionId)}/texture/${assetData}`,
        undefined,
        { responseType: ShapeDiverSdkApiResponseType.DATA },
      );
      const contentType = header["Content-Type"] ?? header["content-type"];
      return [data, contentType];
    });
  }

  /**
   * Download a glTF file.
   *
   * @param sessionId
   * @param assetData
   */
  async getGltf(sessionId: string, assetData: string): Promise<ArrayBuffer> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ArrayBuffer>(
            `${this.buildSessionUri(sessionId)}/gltf/${assetData}`,
            undefined,
            { responseType: ShapeDiverSdkApiResponseType.DATA },
          )
        )[1],
    );
  }

  /**
   * Download a USDZ file.
   *
   * @param sessionId
   * @param assetData
   */
  async getUsdz(sessionId: string, assetData: string): Promise<ArrayBuffer> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ArrayBuffer>(
            `${this.buildSessionUri(sessionId)}/usdz/${assetData}`,
            undefined,
            { responseType: ShapeDiverSdkApiResponseType.DATA },
          )
        )[1],
    );
  }

  /**
   * Download an image.
   *
   * @param sessionId
   * @param url - The URL of the image that should be downloaded.
   * @returns Array of size 2: [0] = content data, [1] = content type.
   */
  async downloadImage(
    sessionId: string,
    url: string,
  ): Promise<[ArrayBuffer, string]> {
    let targetUrl: string, queries: string[];

    if (
      apiAssetTextureUri.test(url) ||
      cdnAssetTextureUri.test(url) ||
      directDownloadUri.test(url)
    ) {
      // Call ShapeDiver texture-asset URLs directly
      targetUrl = url;
      queries = [];
    } else {
      // All other source URLs are called via the download-image endpoint
      targetUrl = `${this.buildSessionUri(sessionId)}/image`;
      queries = [`url=${encodeBase64(url)}`];
    }

    return await sendRequest(async () => {
      const [header, data] = await this.api.get<ArrayBuffer>(
        targetUrl,
        queries,
        {
          responseType: ShapeDiverSdkApiResponseType.DATA,
          /*
           * Disable authorization and custom headers for CDN and direct download URLs to preserve
           * simple GETs whenever possible (do not require preflight requests).
           */
          disableAuthorization:
            cdnAssetUri.test(url) || directDownloadUri.test(url),
          disableCustomHeaders:
            cdnAssetUri.test(url) || directDownloadUri.test(url),
        },
      );
      const contentType = header["Content-Type"] ?? header["content-type"];
      return [data, contentType];
    });
  }

  /**
   * Fetches a ShapeDiver asset of the following types:
   *  * Output
   *  * Export
   *  * Texture
   *
   * This function works similar to {@link getOutput}, {@link getExport} and {@link getTexture}, but does not require
   * extracted _session ID_ and _asset data_ parameters.
   *
   * @param url - The URL of the asset that should be fetched.
   * @returns Array of size 3: [0] = content data, [1] = content type, [2] = asset type.
   * @throws {@link ShapeDiverError} when the given URL is not a valid ShapeDiver asset URL.
   */
  async getAsset(
    url: string,
  ): Promise<[ArrayBuffer, string, "output" | "export" | "texture"]> {
    let type: "output" | "export" | "texture";

    // Check if the given URL is a valid API or CDN asset URL
    if (apiAssetExportUri.test(url) || cdnAssetExportUri.test(url))
      type = "export";
    else if (apiAssetOutputUri.test(url) || cdnAssetOutputUri.test(url))
      type = "output";
    else if (apiAssetTextureUri.test(url) || cdnAssetTextureUri.test(url))
      type = "texture";
    else
      throw new ShapeDiverError(
        "Cannot fetch asset: Invalid URL (only ShapeDiver asset URLs are allowed).",
      );

    return await sendRequest(async () => {
      const [header, data] = await this.api.get<ArrayBuffer>(url, undefined, {
        responseType: ShapeDiverSdkApiResponseType.DATA,
        /* Disable authorization and custom headers for CDN URLs to preserve simple GETs. */
        disableAuthorization: cdnAssetUri.test(url),
        disableCustomHeaders: cdnAssetUri.test(url),
      });
      const contentType = header["Content-Type"] ?? header["content-type"];
      return [data, contentType, type];
    });
  }
}
