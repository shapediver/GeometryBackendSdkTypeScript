import { ShapeDiverSdkApi } from "./api/ShapeDiverSdkApi"
import { ShapeDiverSdkConfig, ShapeDiverSdkConfigInternal } from "./config/ShapeDiverSdkConfig"

export abstract class BaseShapeDiverSdk {

    protected readonly sdkConfig: ShapeDiverSdkConfigInternal
    protected readonly sdkApi: ShapeDiverSdkApi

    /**
     * ShapeDiverSDK constructor
     *
     * @param baseUrl - the URL of the target system
     * @param jwt - the client's jwt
     */
    protected constructor (baseUrl: string, jwt?: string) {
        this.sdkConfig = new ShapeDiverSdkConfigInternal(baseUrl, jwt)

        this.sdkApi = new ShapeDiverSdkApi(this.sdkConfig)
    }

    get configuration (): ShapeDiverSdkConfig {
        return this.sdkConfig.toConfig()
    }

}
