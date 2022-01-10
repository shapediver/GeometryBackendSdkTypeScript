import {
    ShapeDiverRequestConfigure,
    ShapeDiverRequestCustomization,
    ShapeDiverRequestModel,
    ShapeDiverRequestModelComputationQueryOrder,
    ShapeDiverRequestModelComputationQueryStatus,
    ShapeDiverRequestModelComputationQueryType,
    ShapeDiverRequestParameterDefinition,
    ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi, ShapeDiverSdkApiResponseType } from "@shapediver/sdk.geometry-api-sdk-core"
import { sendRequest } from "../utils/utils"

export class ShapeDiverModelApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * Get information about a ShapeDiver Model.
     *
     * @param modelId
     */
    async get (modelId: string): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.get<ShapeDiverResponseDto>(this.buildModelUri(modelId)))
    }

    /**
     * Create a new ShapeDiver Model.
     *
     * @param body
     */
    async create (body: ShapeDiverRequestModel): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.post<ShapeDiverResponseDto>(this.commonPath, body))
    }

    /**
     * Update properties of a ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async update (modelId: string, body: ShapeDiverRequestModel): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.put<ShapeDiverResponseDto>(this.buildModelUri(modelId), body))
    }

    /**
     * Delete a ShapeDiver Model.
     *
     * @param modelId
     */
    async delete (modelId: string): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.delete<ShapeDiverResponseDto>(this.buildModelUri(modelId)))
    }

    /**
     * Get configurations of the viewer.
     *
     * @param modelId
     */
    async getConfig (modelId: string): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.get<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/config"))
    }

    /**
     * Create viewer configurations.
     *
     * @param modelId
     * @param body
     */
    async createConfig (modelId: string, body: ShapeDiverRequestConfigure): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.post<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/config", body))
    }

    /**
     * Update viewer configurations.
     *
     * @param modelId
     * @param body
     */
    async updateConfig (modelId: string, body: ShapeDiverRequestConfigure): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.patch<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/config", body))
    }

    /**
     * Download the Grasshopper file of the ShapeDiver Model.
     *
     * @param modelId
     */
    async getFile (modelId: string): Promise<ArrayBuffer> {
        return await sendRequest(async () => this.api.get<ArrayBuffer>(
            this.buildModelUri(modelId) + "/file/download",
            { contentType: "application/json", responseType: ShapeDiverSdkApiResponseType.DATA },
        ))
    }

    /**
     * Set the default parameters for the ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async setDefaultParams (modelId: string, body: ShapeDiverRequestCustomization): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.patch<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/parameter/defval", body))
    }

    /**
     * Updates the definitions of the given parameters.
     *
     * @param modelId
     * @param body
     */
    async updateParameterDefinitions (modelId: string, body: ShapeDiverRequestParameterDefinition): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.patch<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/parameter", body))
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
    async queryComputations (
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
        const queries: string[] = []
        if (timestampFrom !== undefined) queries.push("timestamp_from=" + timestampFrom)
        if (timestampTo !== undefined) queries.push("timestamp_to=" + timestampTo)
        if (limit !== undefined) queries.push("limit=" + limit)
        if (strictLimit !== undefined) queries.push("strict_limit=" + strictLimit)
        if (order !== undefined) queries.push("order=" + order)
        if (status !== undefined) queries.push("status=" + status)
        if (type !== undefined) queries.push("type=" + type)
        if (offset !== undefined) queries.push("offset=" + offset)

        return await sendRequest(async () => this.api.get<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/computations?" + queries.join("&")))
    }

}
