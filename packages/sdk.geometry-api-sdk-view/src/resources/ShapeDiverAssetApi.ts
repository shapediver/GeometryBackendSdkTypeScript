import { ShapeDiverSdkApiResponseType } from "@shapediver/sdk.geometry-api-sdk-core"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverAssetApi extends BaseResourceApi {

    buildUri (sessionId: string): string {
        return `${ this.commonPath }/session/${ sessionId }`
    }

    /**
     * Download an export.
     *
     * @param sessionId
     * @param assetData
     */
    async getExport (sessionId: string, assetData: string): Promise<Blob> {
        return await this.api.get<Blob>(`${ this.buildUri(sessionId) }/export/${ assetData }`, ShapeDiverSdkApiResponseType.BLOB)
    }

    /**
     * Download an output.
     *
     * @param sessionId
     * @param assetData
     */
    async getOutput (sessionId: string, assetData: string): Promise<Blob> {
        return await this.api.get<Blob>(`${ this.buildUri(sessionId) }/output/${ assetData }`, ShapeDiverSdkApiResponseType.BLOB)
    }

    /**
     * Download a texture file.
     *
     * @param sessionId
     * @param assetData
     */
    async getTexture (sessionId: string, assetData: string): Promise<Blob> {
        return await this.api.get<Blob>(`${ this.buildUri(sessionId) }/texture/${ assetData }`, ShapeDiverSdkApiResponseType.BLOB)
    }

}
