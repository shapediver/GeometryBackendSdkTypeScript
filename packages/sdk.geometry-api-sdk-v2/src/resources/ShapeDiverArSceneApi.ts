import {
  BaseResourceApi,
  ShapeDiverResponseError,
  ShapeDiverSdkApi,
  ShapeDiverSdkApiResponseType,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { sendRequest } from "../utils/utils";

export class ShapeDiverArSceneApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * Checks the existence of the specific AR scene.
   * @param id AR scene ID or Model-State ID.
   * @returns `true` when the AR scene exists, otherwise `false`.
   */
  async exists(id: string): Promise<boolean> {
    return await sendRequest(async () => {
      try {
        const [_, status] = await this.api.head(
          `${this.buildArSceneUri()}/${id}`,
          { disableAuthorization: true },
        );
        return status === 200;
      } catch (e) {
        // A 404 HTTP status is returned when the AR scene was not found.
        if (e instanceof ShapeDiverResponseError && e.status === 404)
          return false;
        else throw e;
      }
    });
  }

  /**
   * Download the glTF file of the specified AR scene.
   *
   * @param id AR scene ID or Model-State ID.
   * @returns Array of size 2: [0] = content data, [1] = content type
   */
  async getGltf(id: string): Promise<[ArrayBuffer, string]> {
    return await sendRequest(async () => {
      const [header, data] = await this.api.get<ArrayBuffer>(
        `${this.buildArSceneUri()}/${id}/gltf`,
        undefined,
        {
          responseType: ShapeDiverSdkApiResponseType.DATA,
          disableAuthorization: true,
        },
      );
      const contentType = header["Content-Type"] ?? header["content-type"];
      return [data, contentType];
    });
  }

  /**
   * Download the USDZ file of the specified AR scene.
   *
   * @param id AR scene ID or Model-State ID.
   * @returns Array of size 2: [0] = content data, [1] = content type
   */
  async getUsdz(id: string): Promise<[ArrayBuffer, string]> {
    return await sendRequest(async () => {
      const [header, data] = await this.api.get<ArrayBuffer>(
        `${this.buildArSceneUri()}/${id}/usdz`,
        undefined,
        {
          responseType: ShapeDiverSdkApiResponseType.DATA,
          disableAuthorization: true,
        },
      );
      const contentType = header["Content-Type"] ?? header["content-type"];
      return [data, contentType];
    });
  }
}
