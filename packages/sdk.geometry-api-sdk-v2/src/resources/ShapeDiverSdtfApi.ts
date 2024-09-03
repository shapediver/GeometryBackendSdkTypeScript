import {
  ShapeDiverRequestSdtfUpload,
  ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2";
import {
  BaseResourceApi,
  ShapeDiverSdkApi,
  ShapeDiverSdkApiResponseType,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { sendRequest } from "../utils/utils";

export class ShapeDiverSdtfApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * List all sdTF-assets of the given namespace.
   *
   * @param sessionId
   * @param namespace
   */
  async list(
    sessionId: string,
    namespace: string,
    offset?: string,
  ): Promise<ShapeDiverResponseDto> {
    // Build queries
    const queries: string[] = [];
    if (offset !== undefined) queries.push("offset=" + offset);

    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            `${this.buildSessionUri(sessionId)}/sdtf/${namespace}/list`,
            queries,
          )
        )[1],
    );
  }

  /**
   * Download a sdTF-asset.
   *
   * @param sessionId
   * @param sdtfId - Format: "<namespace>/<sdTF id>"
   */
  async get(sessionId: string, sdtfId: string): Promise<ArrayBuffer> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ArrayBuffer>(
            `${this.buildSessionUri(sessionId)}/sdtf/${sdtfId}`,
            undefined,
            { responseType: ShapeDiverSdkApiResponseType.DATA },
          )
        )[1],
    );
  }

  /**
   * Delete a sdTF-asset.
   *
   * @param sessionId
   * @param sdtfId
   */
  async delete(
    sessionId: string,
    sdtfId: string,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.delete<ShapeDiverResponseDto>(
            `${this.buildSessionUri(sessionId)}/sdtf/${sdtfId}`,
          )
        )[1],
    );
  }

  /**
   * Request an Upload-URL for a sdTF-asset.
   *
   * @param sessionId
   * @param body
   */
  async requestUpload(
    sessionId: string,
    body: ShapeDiverRequestSdtfUpload,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildSessionUri(sessionId) + "/sdtf/upload",
            undefined,
            body,
          )
        )[1],
    );
  }
}
