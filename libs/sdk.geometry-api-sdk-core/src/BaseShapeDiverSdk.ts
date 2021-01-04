import { ShapeDiverSdkApi } from "./api/ShapeDiverSdkApi"
import { ShapeDiverSdkConfig, ShapeDiverSdkConfigInternal } from "./config/ShapeDiverSdkConfig"

export abstract class BaseShapeDiverSdk {

    protected readonly sdkConfig: ShapeDiverSdkConfigInternal
    protected readonly sdkApi: ShapeDiverSdkApi

    /**
     * ShapeDiverSDK constructor
     *
     * @param jwt - the client's jwt
     * @param baseUrl - the URL of the target system (just for testing)
     */
    protected constructor (jwt?: string, baseUrl?: string) {
        this.sdkConfig = new ShapeDiverSdkConfigInternal(jwt, baseUrl)

        this.sdkApi = new ShapeDiverSdkApi(this.sdkConfig)
    }

    get configuration (): ShapeDiverSdkConfig {
        return this.sdkConfig.toConfig()
    }

}
