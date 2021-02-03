import { ShapeDiverRequestFileUpload, ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverFileApi extends BaseResourceApi {

    buildUri (sessionId: string): string {
        return `${ this.commonPath }/session/${ sessionId }/upload`
    }

    /**
     * Request an Upload-URL for a file.
     *
     * @param sessionId
     * @param body
     */
    async upload (sessionId: string, body: ShapeDiverRequestFileUpload): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(this.buildUri(sessionId), body)
    }

}
