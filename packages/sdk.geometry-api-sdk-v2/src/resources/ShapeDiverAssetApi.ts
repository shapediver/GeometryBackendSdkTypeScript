import { BaseResourceApi, ShapeDiverSdkApi, ShapeDiverSdkApiResponseType } from "@shapediver/sdk.geometry-api-sdk-core"

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
    async getExport (sessionId: string, assetData: string): Promise<Blob> {
        return await this.api.get<Blob>(
            `${ this.buildSessionUri(sessionId) }/export/${ assetData }`,
            undefined,
            ShapeDiverSdkApiResponseType.BLOB,
        )
    }

    /**
     * Download an output.
     *
     * @param sessionId
     * @param assetData
     */
    async getOutput (sessionId: string, assetData: string): Promise<Blob> {
        return await this.api.get<Blob>(
            `${ this.buildSessionUri(sessionId) }/output/${ assetData }`,
            undefined,
            ShapeDiverSdkApiResponseType.BLOB,
        )
    }

    /**
     * Download a texture file.
     *
     * @param sessionId
     * @param assetData
     */
    async getTexture (sessionId: string, assetData: string): Promise<Blob> {
        return await this.api.get<Blob>(
            `${ this.buildSessionUri(sessionId) }/texture/${ assetData }`,
            undefined,
            ShapeDiverSdkApiResponseType.BLOB,
        )
    }

}
