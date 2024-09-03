import {
  ShapeDiverRequestGltfUploadQueryConversion,
  ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2";
import {
  BaseResourceApi,
  ShapeDiverSdkApi,
  ShapeDiverSdkApiResponseType,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { sendRequest } from "../utils/utils";

export class ShapeDiverGltfApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * Upload a glTF file.
   *
   * @param sessionId
   * @param body
   * @param type
   * @param queryConvert
   */
  async upload(
    sessionId: string,
    body: ArrayBuffer,
    type: string,
    queryConvert: ShapeDiverRequestGltfUploadQueryConversion = ShapeDiverRequestGltfUploadQueryConversion.NONE,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            `${this.buildSessionUri(sessionId)}/gltf`,
            [`conversion=${queryConvert}`],
            body,
            {
              contentType: type,
              responseType: ShapeDiverSdkApiResponseType.JSON,
            },
          )
        )[1],
    );
  }
}
