import { ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi } from "@shapediver/sdk.geometry-api-sdk-core"
import { sendRequest } from "../utils/utils"

export class ShapeDiverTextureApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * List all textures of the specified model.
     *
     * @param sessionId
     */
    async listModelTextures (sessionId: string): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () =>
            (await this.api.get<ShapeDiverResponseDto>(this.buildSessionUri(sessionId) + "/texture/list"))[1],
        )
    }

}
