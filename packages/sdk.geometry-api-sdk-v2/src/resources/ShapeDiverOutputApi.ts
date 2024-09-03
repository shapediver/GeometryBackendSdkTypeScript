import {
  ShapeDiverRequestCache,
  ShapeDiverRequestCustomization,
  ShapeDiverRequestOutputDefinition,
  ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2";
import {
  BaseResourceApi,
  ShapeDiverSdkApi,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { sendRequest } from "../utils/utils";

export class ShapeDiverOutputApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * Request a specific version of an output.
   *
   * @param sessionId
   * @param body
   */
  async customize(
    sessionId: string,
    body: ShapeDiverRequestCustomization,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.put<ShapeDiverResponseDto>(
            this.buildSessionUri(sessionId) + "/output",
            undefined,
            body,
          )
        )[1],
    );
  }

  /**
   * Check if a specific version of a requested output has been computed yet.
   *
   * @param sessionId
   * @param body
   */
  async getCache(
    sessionId: string,
    body: ShapeDiverRequestCache,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.put<ShapeDiverResponseDto>(
            this.buildSessionUri(sessionId) + "/output/cache",
            undefined,
            body,
          )
        )[1],
    );
  }

  /**
   * Updates the definitions of the given outputs.
   *
   * @param modelId
   * @param body
   */
  async updateDefinitions(
    modelId: string,
    body: ShapeDiverRequestOutputDefinition,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.patch<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/output",
            undefined,
            body,
          )
        )[1],
    );
  }

  /**
   * List all cached versions of the specified output.
   *
   * @param sessionId
   * @param outputId
   */
  async listVersions(
    sessionId: string,
    outputId: string,
    offset?: string,
  ): Promise<ShapeDiverResponseDto> {
    // Build queries
    const queries: string[] = [];
    if (offset !== undefined) queries.push("offset=" + offset);

    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            `${this.buildSessionUri(sessionId)}/output/${outputId}/list`,
            queries,
          )
        )[1],
    );
  }
}
