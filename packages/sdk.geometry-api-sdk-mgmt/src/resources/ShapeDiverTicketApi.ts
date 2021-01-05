import { ShapeDiverMgmtRequestTicket, ShapeDiverMgmtResponseDto } from "@shapediver/api.geometry-api-dto-mgmt"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverTicketApi extends BaseResourceApi {

    buildUri (modelId: string): string {
        return `${ this.commonPath }/${ modelId }/ticket`
    }

    /**
     * Create a ticket for a ShapeDiver Model.
     *
     * @param modelId
     * @param body
     */
    async create (modelId: string, body: ShapeDiverMgmtRequestTicket): Promise<ShapeDiverMgmtResponseDto> {
        return await this.api.post<ShapeDiverMgmtResponseDto>(this.buildUri(modelId), body)
    }
}
