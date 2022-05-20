import { ShapeDiverRequestFileUpload, ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi, ShapeDiverSdkApiResponseType } from "@shapediver/sdk.geometry-api-sdk-core"
import { sendRequest } from "../utils/utils"

export class ShapeDiverFileApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * List all file-assets of the given parameter.
     *
     * @param sessionId
     * @param paramId
     */
    async list (sessionId: string, paramId: string): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () =>
            (await this.api.get<ShapeDiverResponseDto>(`${ this.buildSessionUri(sessionId) }/file/${ paramId }/list`))[1],
        )
    }

    /**
     * Download a file-asset.
     *
     * @param sessionId
     * @param paramId
     * @param fileId
     */
    async get (sessionId: string, paramId: string, fileId: string): Promise<ArrayBuffer> {
        return await sendRequest(async () =>
            (await this.api.get<ArrayBuffer>(
                `${ this.buildSessionUri(sessionId) }/file/${ paramId }/${ fileId }`,
                { responseType: ShapeDiverSdkApiResponseType.DATA },
            ))[1],
        )
    }

    /**
     * Delete a file-asset.
     *
     * @param sessionId
     * @param paramId
     * @param fileId
     */
    async delete (sessionId: string, paramId: string, fileId: string): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () =>
            (await this.api.delete<ShapeDiverResponseDto>(`${ this.buildSessionUri(sessionId) }/file/${ paramId }/${ fileId }`))[1],
        )
    }

    /**
     * Request an Upload-URL for a file.
     *
     * @param sessionId
     * @param body
     */
    async requestUpload (sessionId: string, body: ShapeDiverRequestFileUpload): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () =>
            (await this.api.post<ShapeDiverResponseDto>(this.buildSessionUri(sessionId) + "/file/upload", body))[1],
        )
    }

}
