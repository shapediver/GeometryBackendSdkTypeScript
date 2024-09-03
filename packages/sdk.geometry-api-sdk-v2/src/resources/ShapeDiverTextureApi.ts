import { ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2";
import {
  BaseResourceApi,
  ShapeDiverSdkApi,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { sendRequest } from "../utils/utils";

export class ShapeDiverTextureApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * List all textures of the specified model.
   *
   * @param sessionId
   */
  async listModelTextures(
    sessionId: string,
    offset?: string,
  ): Promise<ShapeDiverResponseDto> {
    // Build queries
    const queries: string[] = [];
    if (offset !== undefined) queries.push("offset=" + offset);

    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            this.buildSessionUri(sessionId) + "/texture/list",
            queries,
          )
        )[1],
    );
  }
}
