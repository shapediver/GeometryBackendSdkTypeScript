import { ShapeDiverSdkApi } from "./api/ShapeDiverSdkApi"
import { ShapeDiverSdkConfig } from "./config/ShapeDiverSdkConfig"
import { ShapeDiverConfigApi } from "./resources/ShapeDiverConfigApi"
import { ShapeDiverModelApi } from "./resources/ShapeDiverModelApi"
import { ShapeDiverTicketApi } from "./resources/ShapeDiverTicketApi"

export function create(jwt?: string, baseUrl?: string): ShapeDiverSdk {
    return new ShapeDiverSdk(jwt, baseUrl)
}

export class ShapeDiverSdk {

    private readonly config: ShapeDiverSdkConfig

    private readonly _models: ShapeDiverModelApi
    private readonly _tickets: ShapeDiverTicketApi
    private readonly _configs: ShapeDiverConfigApi

    /**
     * ShapeDiverSDK constructor
     *
     * @param jwt - the client's jwt
     * @param baseUrl - the URL of the target system (just for testing)
     */
    constructor (jwt?: string, baseUrl?: string) {
        this.config = new ShapeDiverSdkConfig(jwt, baseUrl)

        const sdkApi = new ShapeDiverSdkApi(this.config)

        this._models = new ShapeDiverModelApi(sdkApi)
        this._tickets = new ShapeDiverTicketApi(sdkApi)
        this._configs = new ShapeDiverConfigApi(sdkApi)
    }

    get configuration (): ShapeDiverSdkConfig {
        return this.config
    }

    get models (): ShapeDiverModelApi {
        return this._models
    }

    get tickets (): ShapeDiverTicketApi {
        return this._tickets
    }

    get configs (): ShapeDiverConfigApi {
        return this._configs
    }
}
