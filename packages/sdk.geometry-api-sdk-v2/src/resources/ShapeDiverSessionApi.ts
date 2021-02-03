import { ShapeDiverRequestTicket, ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverSessionApi extends BaseResourceApi {

    buildUri (sessionId: string): string {
        return `${ this.commonPath }/session/${ sessionId }`
    }

    buildModelUri (modelId: string): string {
        return `${ this.commonPath }/model/${ modelId }`
    }

    buildTicketUri (ticketId: string): string {
        return `${ this.commonPath }/ticket/${ ticketId }`
    }

    /**
     * Create a new ticket that allows to initialize new sessions for the
     * specified model.
     *
     * @param modelId
     * @param body
     */
    async ticket (modelId: string, body: ShapeDiverRequestTicket): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/ticket", body)
    }

    /**
     * Create a new session for a ShapeDiver Model.
     *
     * @param ticketId
     */
    async init (ticketId: string): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(this.buildTicketUri(ticketId), {})
    }

    /**
     * Get the full description of a ShapeDiver Model.
     *
     * @param sessionId
     */
    async default (sessionId: string): Promise<ShapeDiverResponseDto> {
        return await this.api.get<ShapeDiverResponseDto>(this.buildUri(sessionId) + "/default")
    }

    /**
     * Close the specified session.
     *
     * @param sessionId
     */
    async close (sessionId: string): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(this.buildUri(sessionId) + "/close", {})
    }

}
