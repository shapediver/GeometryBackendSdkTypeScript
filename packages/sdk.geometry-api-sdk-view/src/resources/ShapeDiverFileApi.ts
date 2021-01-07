import { ShapeDiverViewRequestFileUpload, ShapeDiverViewResponseDto } from "@shapediver/api.geometry-api-dto-view"
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
    async upload (sessionId: string, body: ShapeDiverViewRequestFileUpload): Promise<ShapeDiverViewResponseDto> {
        return await this.api.post<ShapeDiverViewResponseDto>(this.buildUri(sessionId), body)
    }

}
