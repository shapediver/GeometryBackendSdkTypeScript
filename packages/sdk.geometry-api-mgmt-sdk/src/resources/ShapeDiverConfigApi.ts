import { BaseResourceApi } from "./BaseResourceApi"
import { ShapeDiverConfigResponse, ShapeDiverModelResponse } from "./dto/ResponseDtos"

export class ShapeDiverConfigApi extends BaseResourceApi {

    buildUri (id: string): string {
        return this.commonPath + id + '/config';
    }

    async get (id: string): Promise<ShapeDiverConfigResponse> {
        return await this.api.get<ShapeDiverConfigResponse>(this.buildUri(id))
    }

    async create (id: string, body: any): Promise<ShapeDiverModelResponse> {
        return await this.api.post<ShapeDiverModelResponse>(this.buildUri(id), body)
    }
}
