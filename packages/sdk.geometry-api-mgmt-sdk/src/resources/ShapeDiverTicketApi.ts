import { BaseResourceApi } from "./BaseResourceApi"
import { ShapeDiverTicketRequest } from "./dto/RequestDtos"
import { ShapeDiverModelResponse } from "./dto/ResponseDtos"

export class ShapeDiverTicketApi extends BaseResourceApi {

    buildUri (modelId: string): string {
        return this.commonPath + modelId + "/ticket";
    }

    /**
     * Create a ticket for a ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async create (modelId: string, body: ShapeDiverTicketRequest): Promise<ShapeDiverModelResponse> {
        return await this.api.post<ShapeDiverModelResponse>(this.buildUri(modelId), body)
    }
}
