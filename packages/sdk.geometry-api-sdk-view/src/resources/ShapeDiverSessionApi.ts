import { ShapeDiverViewResponseDto } from "@shapediver/api.geometry-api-dto-view"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverSessionApi extends BaseResourceApi {

    buildUri (sessionId: string): string {
        return `${ this.commonPath }/session/${ sessionId }`
    }

    buildTicketUri (ticketId: string): string {
        return `${ this.commonPath }/ticket/${ ticketId }`
    }

    /**
     * Create a new session for a ShapeDiver Model.
     *
     * @param ticketId
     */
    async init (ticketId: string): Promise<ShapeDiverViewResponseDto> {
        return await this.api.post<ShapeDiverViewResponseDto>(this.buildTicketUri(ticketId), {})
    }

    /**
     * Get the full description of a ShapeDiver Model.
     *
     * @param sessionId
     */
    async default (sessionId: string): Promise<ShapeDiverViewResponseDto> {
        return await this.api.get<ShapeDiverViewResponseDto>(this.buildUri(sessionId) + "/default")
    }

    /**
     * Close the specified session.
     *
     * @param sessionId
     */
    async close (sessionId: string): Promise<ShapeDiverViewResponseDto> {
        return await this.api.post<ShapeDiverViewResponseDto>(this.buildUri(sessionId) + "/close", {})
    }

}
