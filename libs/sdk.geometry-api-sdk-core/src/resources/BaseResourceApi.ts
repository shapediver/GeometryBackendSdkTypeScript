import { ShapeDiverSdkApi } from ".."

export abstract class BaseResourceApi {

    protected readonly commonPath: string = "/api/v2"
    protected readonly api: ShapeDiverSdkApi

    protected constructor (api: ShapeDiverSdkApi) {
        this.api = api
    }

    /**
     * Create the URI for ticket-based controller endpoints.
     *
     * @param ticketId
     * @protected
     */
    protected buildTicketUri (ticketId: string): string {
        return `${ this.commonPath }/ticket/${ ticketId }`
    }

    /**
     * Create the URI for session-based controller endpoints.
     *
     * @param sessionId
     * @protected
     */
    protected buildSessionUri (sessionId: string): string {
        return `${ this.commonPath }/session/${ sessionId }`
    }

    /**
     * Create the URI for model-based controller endpoints.
     *
     * @param modelId
     * @protected
     */
    protected buildModelUri (modelId: string): string {
        return `${ this.commonPath }/model/${ modelId }`
    }

}
