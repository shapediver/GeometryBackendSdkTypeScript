import {
    ShapeDiverRequestConfigure,
    ShapeDiverRequestCustomization,
    ShapeDiverRequestModel,
    ShapeDiverRequestParameterDefinition,
    ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi } from "@shapediver/sdk.geometry-api-sdk-core"

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
        return await this.api.get<ShapeDiverResponseDto>(this.buildModelUri(modelId))
    }

    /**
     * Create a new ShapeDiver Model.
     *
     * @param body
     */
    async create (body: ShapeDiverRequestModel): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(this.commonPath, body)
    }

    /**
     * Update properties of a ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async update (modelId: string, body: ShapeDiverRequestModel): Promise<ShapeDiverResponseDto> {
        return await this.api.put<ShapeDiverResponseDto>(this.buildModelUri(modelId), body)
    }

    /**
     * Delete a ShapeDiver Model.
     *
     * @param modelId
     */
    async delete (modelId: string): Promise<ShapeDiverResponseDto> {
        return await this.api.delete<ShapeDiverResponseDto>(this.buildModelUri(modelId))
    }

    /**
     * Get configurations of the viewer.
     *
     * @param modelId
     */
    async getConfig (modelId: string): Promise<ShapeDiverResponseDto> {
        return await this.api.get<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/config")
    }

    /**
     * Create configurations of the viewer.
     *
     * @param modelId
     * @param body
     */
    async createConfig (modelId: string, body: ShapeDiverRequestConfigure): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/config", body)
    }

    /**
     * Update the configurations of the viewer.
     *
     * @param modelId
     * @param body
     */
    async updateConfig (modelId: string, body: ShapeDiverRequestConfigure): Promise<ShapeDiverResponseDto> {
        return await this.api.patch<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/config", body)
    }

    /**
     * Download the Grasshopper file of the ShapeDiver Model.
     *
     * @param modelId
     */
    async getFile (modelId: string): Promise<ShapeDiverResponseDto> {
        return await this.api.get<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/file/download")
    }

    /**
     * Set the default parameters for the ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async setDefaultParams (modelId: string, body: ShapeDiverRequestCustomization): Promise<ShapeDiverResponseDto> {
        return await this.api.patch<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/parameter/defval", body)
    }

    /**
     * Updates the definitions of the given parameters.
     *
     * @param modelId
     * @param body
     */
    async updateParameterDefinitions (modelId: string, body: ShapeDiverRequestParameterDefinition): Promise<ShapeDiverResponseDto> {
        return await this.api.patch<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/parameter", body)
    }

}
