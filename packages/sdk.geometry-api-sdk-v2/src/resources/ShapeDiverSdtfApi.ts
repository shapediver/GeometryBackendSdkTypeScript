import { ShapeDiverRequestSdtfUpload, ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverSdtfApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * Request an Upload-URL for a sdtf-file.
     *
     * @param sessionId
     * @param body
     */
    async upload (sessionId: string, body: ShapeDiverRequestSdtfUpload): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(this.buildSessionUri(sessionId) + "/sdtf/upload", body)
    }

}
