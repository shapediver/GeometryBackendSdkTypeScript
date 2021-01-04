import { BaseShapeDiverSdk } from "@shapediver/sdk.geometry-api-sdk-core"
import { ShapeDiverConfigApi } from "./resources/ShapeDiverConfigApi"
import { ShapeDiverModelApi } from "./resources/ShapeDiverModelApi"
import { ShapeDiverTicketApi } from "./resources/ShapeDiverTicketApi"

export function create (jwt?: string, baseUrl?: string): ShapeDiverSdk {
    return new ShapeDiverSdk(jwt, baseUrl)
}

export class ShapeDiverSdk extends BaseShapeDiverSdk {

    private readonly _model: ShapeDiverModelApi
    private readonly _ticket: ShapeDiverTicketApi
    private readonly _config: ShapeDiverConfigApi

    /**
     * ShapeDiverSDK constructor
     *
     * @param jwt - the client's jwt
     * @param baseUrl - the URL of the target system (just for testing)
     */
    constructor (jwt?: string, baseUrl?: string) {
        super(jwt, baseUrl)

        this._model = new ShapeDiverModelApi(this.sdkApi)
        this._ticket = new ShapeDiverTicketApi(this.sdkApi)
        this._config = new ShapeDiverConfigApi(this.sdkApi)
    }

    get model (): ShapeDiverModelApi {
        return this._model
    }

    get ticket (): ShapeDiverTicketApi {
        return this._ticket
    }

    get config (): ShapeDiverConfigApi {
        return this._config
    }
}
