import {
    BaseResourceApi,
    ShapeDiverSdkApi,
    ShapeDiverSdkApiResponseType,
} from "@shapediver/sdk.geometry-api-sdk-core"
import { sendRequest } from "../utils/utils"

export class ShapeDiverArSceneApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * Download the glTF file of the specified AR scene.
     *
     * @param sceneId - The ID of the AR scene.
     * @returns Array of size 2: [0] = content data, [1] = content type
     */
    async getGltf (sceneId: string): Promise<[ ArrayBuffer, string ]> {
        return await sendRequest(async () => {
            const [ header, data ] = await this.api.get<ArrayBuffer>(
                `${ this.buildArSceneUri() }/${ sceneId }/gltf`,
                {
                    responseType: ShapeDiverSdkApiResponseType.DATA,
                    disableAuthorization: true,
                },
            )
            const contentType = header["Content-Type"] ?? header["content-type"]
            return [ data, contentType ]
        })
    }

    /**
     * Download the USDZ file of the specified AR scene.
     *
     * @param sceneId - The ID of the AR scene.
     * @returns Array of size 2: [0] = content data, [1] = content type
     */
    async getUsdz (sceneId: string): Promise<[ ArrayBuffer, string ]> {
        return await sendRequest(async () => {
            const [ header, data ] = await this.api.get<ArrayBuffer>(
                `${ this.buildArSceneUri() }/${ sceneId }/usdz`,
                {
                    responseType: ShapeDiverSdkApiResponseType.DATA,
                    disableAuthorization: true,
                },
            )
            const contentType = header["Content-Type"] ?? header["content-type"]
            return [ data, contentType ]
        })
    }

}
