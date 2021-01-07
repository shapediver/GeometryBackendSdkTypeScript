import { BaseShapeDiverSdk } from "@shapediver/sdk.geometry-api-sdk-core"
import { ShapeDiverAssetApi } from "./resources/ShapeDiverAssetApi"
import { ShapeDiverExportApi } from "./resources/ShapeDiverExportApi"
import { ShapeDiverFileApi } from "./resources/ShapeDiverFileApi"
import { ShapeDiverModelApi } from "./resources/ShapeDiverModelApi"
import { ShapeDiverOutputApi } from "./resources/ShapeDiverOutputApi"
import { ShapeDiverSdtfApi } from "./resources/ShapeDiverSdtfApi"
import { ShapeDiverSessionApi } from "./resources/ShapeDiverSessionApi"
import { ShapeDiverUtilsApi } from "./resources/ShapeDiverUtilsApi"

export function create (jwt?: string, baseUrl?: string): ShapeDiverSdk {
    return new ShapeDiverSdk(jwt, baseUrl)
}

export class ShapeDiverSdk extends BaseShapeDiverSdk {

    private readonly _session: ShapeDiverSessionApi
    private readonly _export: ShapeDiverExportApi
    private readonly _output: ShapeDiverOutputApi
    private readonly _model: ShapeDiverModelApi
    private readonly _file: ShapeDiverFileApi
    private readonly _sdtf: ShapeDiverSdtfApi
    private readonly _asset: ShapeDiverAssetApi
    private readonly _utils: ShapeDiverUtilsApi

    /**
     * ShapeDiverSDK constructor
     *
     * @param jwt - the client's jwt
     * @param baseUrl - the URL of the target system (just for testing)
     */
    constructor (jwt?: string, baseUrl?: string) {
        super(jwt, baseUrl)

        this._session = new ShapeDiverSessionApi(this.sdkApi)
        this._export = new ShapeDiverExportApi(this.sdkApi)
        this._output = new ShapeDiverOutputApi(this.sdkApi)
        this._model = new ShapeDiverModelApi(this.sdkApi)
        this._file = new ShapeDiverFileApi(this.sdkApi)
        this._sdtf = new ShapeDiverSdtfApi(this.sdkApi)
        this._asset = new ShapeDiverAssetApi(this.sdkApi)
        this._utils = new ShapeDiverUtilsApi(this.sdkApi)
    }

    get session (): ShapeDiverSessionApi {
        return this._session
    }

    get export (): ShapeDiverExportApi {
        return this._export
    }

    get output (): ShapeDiverOutputApi {
        return this._output
    }

    get model (): ShapeDiverModelApi {
        return this._model
    }

    get file (): ShapeDiverFileApi {
        return this._file
    }

    get sdtf (): ShapeDiverSdtfApi {
        return this._sdtf
    }

    get asset (): ShapeDiverAssetApi {
        return this._asset
    }

    get utils (): ShapeDiverUtilsApi {
        return this._utils
    }

}
