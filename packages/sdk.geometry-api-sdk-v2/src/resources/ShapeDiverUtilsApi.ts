import { ShapeDiverRequestLogMessage, ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverUtilsApi extends BaseResourceApi {

    buildUri (sessionId: string): string {
        return `${ this.commonPath }/session/${ sessionId }/log/message`
    }

    /**
     * Log the specified message.
     *
     * @param sessionId
     * @param body
     */
    async log (sessionId: string, body: ShapeDiverRequestLogMessage): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(this.buildUri(sessionId), body)
    }

}
