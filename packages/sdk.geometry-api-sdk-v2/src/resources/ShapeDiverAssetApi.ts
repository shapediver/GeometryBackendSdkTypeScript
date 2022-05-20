import { BaseResourceApi, ShapeDiverSdkApi, ShapeDiverSdkApiResponseType } from "@shapediver/sdk.geometry-api-sdk-core"
import { sendRequest } from "../utils/utils"

export class ShapeDiverAssetApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * Download an export.
     *
     * @param sessionId
     * @param assetData
     */
    async getExport (sessionId: string, assetData: string): Promise<ArrayBuffer> {
        return await sendRequest(async () =>
            (await this.api.get<ArrayBuffer>(
                `${ this.buildSessionUri(sessionId) }/export/${ assetData }`,
                { responseType: ShapeDiverSdkApiResponseType.DATA },
            ))[1],
        )
    }

    /**
     * Download an output.
     *
     * @param sessionId
     * @param assetData
     */
    async getOutput (sessionId: string, assetData: string): Promise<ArrayBuffer> {
        return await sendRequest(async () =>
            (await this.api.get<ArrayBuffer>(
                `${ this.buildSessionUri(sessionId) }/output/${ assetData }`,
                { responseType: ShapeDiverSdkApiResponseType.DATA },
            ))[1],
        )
    }

    /**
     * Download a texture file.
     *
     * @param sessionId
     * @param assetData
     */
    async getTexture (sessionId: string, assetData: string): Promise<ArrayBuffer> {
        return await sendRequest(async () =>
            (await this.api.get<ArrayBuffer>(
                `${ this.buildSessionUri(sessionId) }/texture/${ assetData }`,
                { responseType: ShapeDiverSdkApiResponseType.DATA },
            ))[1],
        )
    }

    /**
     * Download a glTF file.
     *
     * @param sessionId
     * @param assetData
     */
    async getGltf (sessionId: string, assetData: string): Promise<ArrayBuffer> {
        return await sendRequest(async () =>
            (await this.api.get<ArrayBuffer>(
                `${ this.buildSessionUri(sessionId) }/gltf/${ assetData }`,
                { responseType: ShapeDiverSdkApiResponseType.DATA },
            ))[1],
        )
    }

    /**
     * Download a USDZ file.
     *
     * @param sessionId
     * @param assetData
     */
    async getUsdz (sessionId: string, assetData: string): Promise<ArrayBuffer> {
        return await sendRequest(async () =>
            (await this.api.get<ArrayBuffer>(
                `${ this.buildSessionUri(sessionId) }/usdz/${ assetData }`,
                { responseType: ShapeDiverSdkApiResponseType.DATA },
            ))[1],
        )
    }

}
