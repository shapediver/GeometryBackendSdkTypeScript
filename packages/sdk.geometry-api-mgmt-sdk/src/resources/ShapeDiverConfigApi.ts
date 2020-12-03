import { BaseResourceApi } from "./BaseResourceApi"
import { ShapeDiverConfigResponse, ShapeDiverModelResponse } from "./dto/ResponseDtos"

export class ShapeDiverConfigApi extends BaseResourceApi {

    buildUri (modelId: string): string {
        return this.commonPath + modelId + '/config';
    }

    /**
     * Get the viewer config object of a ShapeDiver Model.
     *
     * @param modelId
     */
    async get (modelId: string): Promise<ShapeDiverConfigResponse> {
        return await this.api.get<ShapeDiverConfigResponse>(this.buildUri(modelId))
    }

    /**
     * Set the viewer config object of a ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async create (modelId: string, body: any): Promise<ShapeDiverModelResponse> {
        return await this.api.post<ShapeDiverModelResponse>(this.buildUri(modelId), body)
    }
}
