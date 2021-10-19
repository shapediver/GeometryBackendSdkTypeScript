import { ShapeDiverRequestGltfUploadQueryConversion, ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverGltfApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * Upload a glTF file.
     *
     * @param sessionId
     * @param body
     * @param type
     * @param queryConvert
     */
    async upload (
        sessionId: string,
        body: ArrayBuffer,
        type: string,
        queryConvert: ShapeDiverRequestGltfUploadQueryConversion = ShapeDiverRequestGltfUploadQueryConversion.NONE,
    ): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(
            `${ this.buildSessionUri(sessionId) }/gltf?conversion=${ queryConvert }`,
            body,
            { contentType: type },
        )
    }

}
