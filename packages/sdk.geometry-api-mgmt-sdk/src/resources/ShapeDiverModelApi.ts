import { BaseResourceApi } from "./BaseResourceApi"
import { ShapeDiverModelRequest } from "./dto/RequestDtos"
import { ShapeDiverModelResponse } from "./dto/ResponseDtos"

export class ShapeDiverModelApi extends BaseResourceApi {

    buildUri (id: string): string {
        return this.commonPath + id;
    }

    async get (id: string): Promise<ShapeDiverModelResponse> {
        return await this.api.get<ShapeDiverModelResponse>(this.buildUri(id))
    }

    async create (id: string, body: ShapeDiverModelRequest): Promise<ShapeDiverModelResponse> {
        return await this.api.post<ShapeDiverModelResponse>(this.buildUri(id), body)
    }

    async update (id: string, body: ShapeDiverModelRequest): Promise<ShapeDiverModelResponse> {
        return await this.api.put<ShapeDiverModelResponse>(this.buildUri(id), body)
    }

    async delete (id: string): Promise<ShapeDiverModelResponse> {
        return await this.api.delete<ShapeDiverModelResponse>(this.buildUri(id))
    }
}
