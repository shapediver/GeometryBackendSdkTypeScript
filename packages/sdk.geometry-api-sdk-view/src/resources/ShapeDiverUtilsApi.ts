import { ShapeDiverViewRequestLogMessage, ShapeDiverViewResponseDto } from "@shapediver/api.geometry-api-dto-view"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverUtilsApi extends BaseResourceApi {

    buildUri (sessionId: string): string {
        return `${ this.commonPath }/session/${ sessionId }/logmsg`
    }

    /**
     * Log the specified message.
     *
     * @param sessionId
     * @param body
     */
    async log (sessionId: string, body: ShapeDiverViewRequestLogMessage): Promise<ShapeDiverViewResponseDto> {
        return await this.api.post<ShapeDiverViewResponseDto>(this.buildUri(sessionId), body)
    }

}
