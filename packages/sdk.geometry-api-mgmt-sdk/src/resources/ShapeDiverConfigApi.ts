import { BaseResourceApi } from "./BaseResourceApi"
import { ShapeDiverMgmtResponseDto } from "@shapediver/api.geometry-api-mgmt-dto"

export class ShapeDiverConfigApi extends BaseResourceApi {

    buildUri (modelId: string): string {
        return this.commonPath + modelId + '/config';
    }

    /**
     * Get the viewer config object of a ShapeDiver Model.
     *
     * @param modelId
     */
    async get (modelId: string): Promise<ShapeDiverMgmtResponseDto> {
        return await this.api.get<ShapeDiverMgmtResponseDto>(this.buildUri(modelId))
    }

    /**
     * Set the viewer config object of a ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async create (modelId: string, body: any): Promise<ShapeDiverMgmtResponseDto> {
        return await this.api.post<ShapeDiverMgmtResponseDto>(this.buildUri(modelId), body)
    }
}
