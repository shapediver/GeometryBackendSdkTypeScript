import {
    ShapeDiverRequestAuthorizationGroup,
    ShapeDiverRequestLogMessage,
    ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi } from "@shapediver/sdk.geometry-api-sdk-core"
import { sendRequest } from "../utils/utils"

export class ShapeDiverSystemApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * Log the specified message.
     *
     * @param sessionId
     * @param body
     */
    async log (sessionId: string, body: ShapeDiverRequestLogMessage): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.post<ShapeDiverResponseDto>(this.buildSessionUri(sessionId) + "/log/message", body))
    }

    /**
     * Remove a model with all it's components.
     *
     * **WARNING: This operation cannot be undone!**
     *
     * @param modelId
     */
    async pruneModel (modelId: string): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.delete<ShapeDiverResponseDto>(`${ this.buildSystemUri() }/model/${ modelId }`))
    }

    /**
     * Decrypt the given ticket.
     *
     * @param ticket
     */
    async decryptTicket (ticket: string): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.get<ShapeDiverResponseDto>(this.buildTicketUri(ticket)))
    }

    /**
     * Create a new authentication group.
     *
     * @param body
     */
    async authGroup (body: ShapeDiverRequestAuthorizationGroup): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.post<ShapeDiverResponseDto>(this.buildAuthGroupUri(), body))
    }

    /**
     * Returns system information about the Geometry Minions.
     */
    async getMinionInfo (): Promise<ShapeDiverResponseDto> {
        return await this.api.get<ShapeDiverResponseDto>(`${ this.buildSystemUri() }/minions/info`)
    }

}
