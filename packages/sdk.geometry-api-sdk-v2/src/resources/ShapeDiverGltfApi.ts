import { ShapeDiverRequestGltfUploadQueryConversion, ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverGltfApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * Request an Upload-URL for a file.
     *
     * The request's content-type is extracted from the blob-type.
     *
     * @param sessionId
     * @param body
     * @param queryConvert
     */
    async upload (sessionId: string, body: Blob, queryConvert: ShapeDiverRequestGltfUploadQueryConversion): Promise<ShapeDiverResponseDto> {
        return await this.api.post<ShapeDiverResponseDto>(
            `${ this.buildSessionUri(sessionId) }/gltf?conversion=${ queryConvert }`,
            await body.arrayBuffer(),
            { contentType: body.type },
        )
    }

}
