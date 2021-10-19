import { ShapeDiverRequestAnalyticsModel, ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverAnalyticsApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * Get model session analytics.
     *
     * @param body
     */
    async modelSessionStatistics (body: ShapeDiverRequestAnalyticsModel): Promise<ShapeDiverResponseDto> {
        return await this.api.put<ShapeDiverResponseDto>(this.buildAnalyticsUri() + "/session/model", body)
    }

}
