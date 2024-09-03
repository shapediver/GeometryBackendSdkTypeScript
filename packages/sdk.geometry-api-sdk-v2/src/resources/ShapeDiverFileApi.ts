import {
  ShapeDiverRequestFileUpload,
  ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2";
import {
  BaseResourceApi,
  ShapeDiverSdkApi,
  ShapeDiverSdkApiResponseType,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { filenameFromContentDisposition, sendRequest } from "../utils/utils";

export interface ShapeDiverResponseFileInfo {
  filename?: string;
  size?: number;
}

export class ShapeDiverFileApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * List all file-assets of the given parameter.
   *
   * @param sessionId
   * @param paramId
   */
  async list(
    sessionId: string,
    paramId: string,
    offset?: string,
  ): Promise<ShapeDiverResponseDto> {
    // Build queries
    const queries: string[] = [];
    if (offset !== undefined) queries.push("offset=" + offset);

    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            `${this.buildSessionUri(sessionId)}/file/${paramId}/list`,
            queries,
          )
        )[1],
    );
  }

  /**
   * Get information about a file-asset of a parameter.
   *
   * @param sessionId
   * @param paramId
   */
  async info(
    sessionId: string,
    paramId: string,
    fileId: string,
  ): Promise<ShapeDiverResponseFileInfo> {
    return await sendRequest(async () => {
      const headers = (
        await this.api.head(
          `${this.buildSessionUri(sessionId)}/file/${paramId}/${fileId}`,
        )
      )[0];

      const res: ShapeDiverResponseFileInfo = {
        size: Number(
          headers.get("Content-Length") || headers.get("content-length"),
        ),
      };

      // Extract filename from Content-Disposition header if available
      const contentDispositionHeader =
        headers.get("Content-Disposition") ||
        headers.get("content-disposition");
      if (typeof contentDispositionHeader === "string")
        res.filename = filenameFromContentDisposition(contentDispositionHeader);

      return res;
    });
  }

  /**
   * Download a file-asset.
   *
   * @param sessionId
   * @param paramId
   * @param fileId
   */
  async get(
    sessionId: string,
    paramId: string,
    fileId: string,
  ): Promise<ArrayBuffer> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ArrayBuffer>(
            `${this.buildSessionUri(sessionId)}/file/${paramId}/${fileId}`,
            undefined,
            { responseType: ShapeDiverSdkApiResponseType.DATA },
          )
        )[1],
    );
  }

  /**
   * Delete a file-asset.
   *
   * @param sessionId
   * @param paramId
   * @param fileId
   */
  async delete(
    sessionId: string,
    paramId: string,
    fileId: string,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.delete<ShapeDiverResponseDto>(
            `${this.buildSessionUri(sessionId)}/file/${paramId}/${fileId}`,
          )
        )[1],
    );
  }

  /**
   * Request an Upload-URL for a file.
   *
   * @param sessionId
   * @param body
   */
  async requestUpload(
    sessionId: string,
    body: ShapeDiverRequestFileUpload,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildSessionUri(sessionId) + "/file/upload",
            undefined,
            body,
          )
        )[1],
    );
  }
}
