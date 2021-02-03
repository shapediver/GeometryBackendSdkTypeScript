import { ShapeDiverRequestSdtfUpload, ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverSdtfApi extends BaseResourceApi {

    buildUri (sessionId: string): string {
        return `${ this.commonPath }/session/${ sessionId }/sdtf/upload`
    }

    /**
     * Request an Upload-URL for a sdtf-file.
     *
     * @param sessionId
     * @param body
     */
    async upload (sessionId: string, body: ShapeDiverRequestSdtfUpload): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(this.buildUri(sessionId), body)
    }

}
