import {
    ShapeDiverRequestConfigure,
    ShapeDiverRequestCustomization,
    ShapeDiverRequestModel,
    ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverModelApi extends BaseResourceApi {

    buildUri (): string {
        return `${ this.commonPath }/model/`
    }

    /**
     * Get information about a ShapeDiver Model.
     *
     * @param modelId
     */
    async get (modelId: string): Promise<ShapeDiverResponseDto> {
        return await this.api.get<ShapeDiverResponseDto>(this.buildUri() + modelId)
    }

    /**
     * Create a new ShapeDiver Model.
     *
     * @param body
     */
    async create (body: ShapeDiverRequestModel): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(this.buildUri(), body)
    }

    /**
     * Update properties of a ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async update (modelId: string, body: ShapeDiverRequestModel): Promise<ShapeDiverResponseDto> {
        return await this.api.put<ShapeDiverResponseDto>(this.buildUri() + modelId, body)
    }

    /**
     * Delete a ShapeDiver Model.
     *
     * @param modelId
     */
    async delete (modelId: string): Promise<ShapeDiverResponseDto> {
        return await this.api.delete<ShapeDiverResponseDto>(this.buildUri() + modelId)
    }

    /**
     * Get configurations of the viewer.
     *
     * @param modelId
     */
    async getConfig (modelId: string): Promise<ShapeDiverResponseDto> {
        return await this.api.get<ShapeDiverResponseDto>(this.buildUri() + modelId + "/config")
    }

    /**
     * Create configurations of the viewer.
     *
     * @param modelId
     * @param body
     */
    async createConfig (modelId: string, body: ShapeDiverRequestConfigure): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(this.buildUri() + modelId + "/config", body)
    }

    /**
     * Update the configurations of the viewer.
     *
     * @param modelId
     * @param body
     */
    async updateConfig (modelId: string, body: ShapeDiverRequestConfigure): Promise<ShapeDiverResponseDto> {
        return await this.api.patch<ShapeDiverResponseDto>(this.buildUri() + modelId + "/config", body)
    }

    /**
     * Get configurations of the viewer.
     *
     * @param modelId
     */
    async getFile (modelId: string): Promise<ShapeDiverResponseDto> {
        return await this.api.get<ShapeDiverResponseDto>(this.buildUri() + modelId + "/file/download")
    }

    /**
     * Set the default parameters for the ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async setDefaultParams (modelId: string, body: ShapeDiverRequestCustomization): Promise<ShapeDiverResponseDto> {
        return await this.api.patch<ShapeDiverResponseDto>(this.buildUri() + modelId + "/parameters/defval", body)
    }

}
