import { BaseResourceApi } from "./BaseResourceApi"
import { ShapeDiverTicketRequest } from "./dto/RequestDtos"
import { ShapeDiverModelResponse } from "./dto/ResponseDtos"

export class ShapeDiverTicketApi extends BaseResourceApi {

    buildUri (id: string): string {
        return this.commonPath + id + "/ticket";
    }

    async create (id: string, body: ShapeDiverTicketRequest): Promise<ShapeDiverModelResponse> {
        return await this.api.post<ShapeDiverModelResponse>(this.buildUri(id), body)
    }
}
