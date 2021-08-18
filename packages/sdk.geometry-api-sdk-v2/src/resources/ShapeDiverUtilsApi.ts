import { ShapeDiverRequestLogMessage, ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverUtilsApi extends BaseResourceApi {

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
        return await this.api.post<ShapeDiverResponseDto>(this.buildSessionUri(sessionId) + "/log/message", body)
    }

}
