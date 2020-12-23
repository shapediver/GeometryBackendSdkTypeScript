import { ShapeDiverMgmtRequestModel, ShapeDiverMgmtResponseDto } from "@shapediver/api.geometry-api-mgmt-dto"
import { BaseResourceApi } from "./BaseResourceApi"

export class ShapeDiverModelApi extends BaseResourceApi {

    buildUri (modelId: string): string {
        return this.commonPath + modelId
    }

    /**
     * Get information about a ShapeDiver Model.
     *
     * @param modelId
     */
    async get (modelId: string): Promise<ShapeDiverMgmtResponseDto> {
        return await this.api.get<ShapeDiverMgmtResponseDto>(this.buildUri(modelId))
    }

    /**
     * Create a new ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async create (modelId: string, body: ShapeDiverMgmtRequestModel): Promise<ShapeDiverMgmtResponseDto> {
        return await this.api.post<ShapeDiverMgmtResponseDto>(this.buildUri(modelId), body)
    }

    /**
     * Update properties of a ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async update (modelId: string, body: ShapeDiverMgmtRequestModel): Promise<ShapeDiverMgmtResponseDto> {
        return await this.api.put<ShapeDiverMgmtResponseDto>(this.buildUri(modelId), body)
    }

    /**
     * Delete a ShapeDiver Model.
     *
     * @param modelId
     */
    async delete (modelId: string): Promise<ShapeDiverMgmtResponseDto> {
        return await this.api.delete<ShapeDiverMgmtResponseDto>(this.buildUri(modelId))
    }
}
