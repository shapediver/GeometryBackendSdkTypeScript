import { BaseResourceApi, ShapeDiverSdkApi, ShapeDiverSdkApiResponseType } from "@shapediver/sdk.geometry-api-sdk-core"
import { encodeBase64, sendRequest } from "../utils/utils"

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
     * Downloads the JSON content part of a sdTF output.
     *
     * @param sessionId
     * @param assetData
     */
    async getSdtfJsonContent (sessionId: string, assetData: string): Promise<Record<string, any>> {
        return await sendRequest(async () =>
            (await this.api.get<ArrayBuffer>(
                `${ this.buildSessionUri(sessionId) }/output/${ assetData }`,
                {
                    responseType: ShapeDiverSdkApiResponseType.JSON,
                    accept: "model/vnd.sdtf+json",
                },
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

    /**
     * Download an image.
     *
     * @param sessionId
     * @param url - The URL of the image that should be downloaded.
     * @returns Array of size 2: [0] = content data, [1] = content type.
     */
    async downloadImage (sessionId: string, url: string): Promise<[ ArrayBuffer, string ]> {
        return await sendRequest(async () => {
            const [ header, data ] = await this.api.get<ArrayBuffer>(
                `${ this.buildSessionUri(sessionId) }/image?url=${ encodeBase64(url) }`,
                { responseType: ShapeDiverSdkApiResponseType.DATA },
            )
            const contentType = header["Content-Type"] ?? header["content-type"]
            return [ data, contentType ]
        })
    }

}
