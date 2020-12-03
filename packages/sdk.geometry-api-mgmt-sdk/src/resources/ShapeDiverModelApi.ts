import { BaseResourceApi } from "./BaseResourceApi"
import { ShapeDiverModelRequest } from "./dto/RequestDtos"
import { ShapeDiverModelResponse } from "./dto/ResponseDtos"

export class ShapeDiverModelApi extends BaseResourceApi {

    buildUri (modelId: string): string {
        return this.commonPath + modelId;
    }

    /**
     * Get information about a ShapeDiver Model.
     *
     * @param modelId
     */
    async get (modelId: string): Promise<ShapeDiverModelResponse> {
        return await this.api.get<ShapeDiverModelResponse>(this.buildUri(modelId))
    }

    /**
     * Create a new ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async create (modelId: string, body: ShapeDiverModelRequest): Promise<ShapeDiverModelResponse> {
        return await this.api.post<ShapeDiverModelResponse>(this.buildUri(modelId), body)
    }

    /**
     * Update properties of a ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async update (modelId: string, body: ShapeDiverModelRequest): Promise<ShapeDiverModelResponse> {
        return await this.api.put<ShapeDiverModelResponse>(this.buildUri(modelId), body)
    }

    /**
     * Delete a ShapeDiver Model.
     *
     * @param modelId
     */
    async delete (modelId: string): Promise<ShapeDiverModelResponse> {
        return await this.api.delete<ShapeDiverModelResponse>(this.buildUri(modelId))
    }
}
