import {
  ShapeDiverRequestConfigure,
  ShapeDiverRequestCustomization,
  ShapeDiverRequestModel,
  ShapeDiverRequestModelComputationQueryOrder,
  ShapeDiverRequestModelComputationQueryStatus,
  ShapeDiverRequestModelComputationQueryType,
  ShapeDiverRequestParameterDefinition,
  ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2";
import {
  BaseResourceApi,
  ShapeDiverSdkApi,
  ShapeDiverSdkApiResponseType,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { sendRequest } from "../utils/utils";

export class ShapeDiverModelApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * Get information about a ShapeDiver Model.
   *
   * @param modelId
   */
  async get(modelId: string): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(this.buildModelUri(modelId))
        )[1],
    );
  }

  /**
   * Create a new ShapeDiver Model.
   *
   * @param body
   */
  async create(body: ShapeDiverRequestModel): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.commonPath,
            undefined,
            body,
          )
        )[1],
    );
  }

  /**
   * Update properties of a ShapeDiver Model.
   *
   * @param modelId
   * @param body
   */
  async update(
    modelId: string,
    body: ShapeDiverRequestModel,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.put<ShapeDiverResponseDto>(
            this.buildModelUri(modelId),
            undefined,
            body,
          )
        )[1],
    );
  }

  /**
   * Delete a ShapeDiver Model.
   *
   * @param modelId
   */
  async delete(modelId: string): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.delete<ShapeDiverResponseDto>(
            this.buildModelUri(modelId),
          )
        )[1],
    );
  }

  /**
   * List models.
   */
  async list(offset?: string): Promise<ShapeDiverResponseDto> {
    // Build queries
    const queries: string[] = [];
    if (offset !== undefined) queries.push("offset=" + offset);

    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            `${this.commonPath}/list`,
            queries,
          )
        )[1],
    );
  }

  /**
   * Get configurations of the viewer.
   *
   * @param modelId
   */
  async getConfig(modelId: string): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/config",
          )
        )[1],
    );
  }

  /**
   * Create viewer configurations.
   *
   * @param modelId
   * @param body
   */
  async createConfig(
    modelId: string,
    body: ShapeDiverRequestConfigure,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/config",
            undefined,
            body,
          )
        )[1],
    );
  }

  /**
   * Update viewer configurations.
   *
   * @param modelId
   * @param body
   */
  async updateConfig(
    modelId: string,
    body: ShapeDiverRequestConfigure,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.patch<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/config",
            undefined,
            body,
          )
        )[1],
    );
  }

  /**
   * Download the Grasshopper file of the ShapeDiver Model.
   *
   * @param modelId
   */
  async getFile(modelId: string): Promise<ArrayBuffer> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ArrayBuffer>(
            this.buildModelUri(modelId) + "/file/download",
            undefined,
            {
              contentType: "application/json",
              responseType: ShapeDiverSdkApiResponseType.DATA,
            },
          )
        )[1],
    );
  }

  /**
   * Set the default parameters for the ShapeDiver Model.
   *
   * @param modelId
   * @param body
   */
  async setDefaultParams(
    modelId: string,
    body: ShapeDiverRequestCustomization,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.patch<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/parameter/defval",
            undefined,
            body,
          )
        )[1],
    );
  }

  /**
   * Updates the definitions of the given parameters.
   *
   * @param modelId
   * @param body
   */
  async updateParameterDefinitions(
    modelId: string,
    body: ShapeDiverRequestParameterDefinition,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.patch<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/parameter",
            undefined,
            body,
          )
        )[1],
    );
  }

  /**
   * Query model computation statistics.
   *
   * @param modelId
   * @param timestampFrom - Timestamp to query from
   * @param timestampTo - Timestamp to query to.
   * @param limit - How many items to return at most.
   * @param strictLimit - Whether the limit shall be attained (if there are enough items).
   * @param order - Order in which to query computation stats items.
   * @param status - Filter computations by the result status.
   * @param type - Filter computations by type.
   * @param offset - Continuation token for pagination.
   */
  async queryComputations(
    modelId: string,
    timestampFrom?: string,
    timestampTo?: string,
    limit?: number,
    strictLimit?: boolean,
    order?: ShapeDiverRequestModelComputationQueryOrder,
    status?: ShapeDiverRequestModelComputationQueryStatus,
    type?: ShapeDiverRequestModelComputationQueryType,
    offset?: string,
  ): Promise<ShapeDiverResponseDto> {
    // Build queries
    const queries: string[] = [];
    if (timestampFrom !== undefined)
      queries.push("timestamp_from=" + timestampFrom);
    if (timestampTo !== undefined) queries.push("timestamp_to=" + timestampTo);
    if (limit !== undefined) queries.push("limit=" + limit);
    if (strictLimit !== undefined) queries.push("strict_limit=" + strictLimit);
    if (order !== undefined) queries.push("order=" + order);
    if (status !== undefined) queries.push("status=" + status);
    if (type !== undefined) queries.push("type=" + type);
    if (offset !== undefined) queries.push("offset=" + offset);

    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/computations",
            queries,
          )
        )[1],
    );
  }

  /**
   * Delete all export components that have been last used at or before {@link untilLastSeen} timestamp.
   *
   * @param modelId
   * @param untilLastSeen - Timestamp, inclusive limit.
   * Allowed Patterns: YYYY, YYYYMM, YYYYMMDD, YYYYMMDDhh, YYYYMMDDhhmm, YYYYMMDDhhmmss, YYYYMMDDhhmmssSSS
   * @example
   * untilLastSeen = "20221104112923123"
   * represents the date-time "2022-11-04T11:29:23.123"
   */
  async enqueueCleanupExports(
    modelId: string,
    untilLastSeen: string,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/cleanup/export",
            [`untilLastSeen=${untilLastSeen}`],
          )
        )[1],
    );
  }

  /**
   * Delete all output components that have been last used at or before {@link untilLastSeen} timestamp.
   *
   * @param modelId
   * @param untilLastSeen - Timestamp, inclusive limit.
   * Allowed Patterns: YYYY, YYYYMM, YYYYMMDD, YYYYMMDDhh, YYYYMMDDhhmm, YYYYMMDDhhmmss, YYYYMMDDhhmmssSSS
   * @example
   * untilLastSeen = "20221104112923123"
   * represents the date-time "2022-11-04T11:29:23.123"
   */
  async enqueueCleanupOutputs(
    modelId: string,
    untilLastSeen: string,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/cleanup/output",
            [`untilLastSeen=${untilLastSeen}`],
          )
        )[1],
    );
  }

  /**
   * Delete all texture components that have been last used at or before {@link untilLastSeen} timestamp.
   *
   * @param modelId
   * @param untilLastSeen - Timestamp, inclusive limit.
   * Allowed Patterns: YYYY, YYYYMM, YYYYMMDD, YYYYMMDDhh, YYYYMMDDhhmm, YYYYMMDDhhmmss, YYYYMMDDhhmmssSSS
   * @example
   * untilLastSeen = "20221104112923123"
   * represents the date-time "2022-11-04T11:29:23.123"
   */
  async enqueueCleanupTextures(
    modelId: string,
    untilLastSeen: string,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/cleanup/texture",
            [`untilLastSeen=${untilLastSeen}`],
          )
        )[1],
    );
  }

  /**
   * Get the status of all running model cleanup processes.
   *
   * @param modelId
   */
  async getCleanupStatus(modelId: string): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/cleanup/status",
          )
        )[1],
    );
  }
}
