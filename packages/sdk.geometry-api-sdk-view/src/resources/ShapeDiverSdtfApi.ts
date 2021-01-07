import { ShapeDiverViewRequestSdtfUpload, ShapeDiverViewResponseDto } from "@shapediver/api.geometry-api-dto-view"
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
    async upload (sessionId: string, body: ShapeDiverViewRequestSdtfUpload): Promise<ShapeDiverViewResponseDto> {
        return await this.api.post<ShapeDiverViewResponseDto>(this.buildUri(sessionId), body)
    }

}
