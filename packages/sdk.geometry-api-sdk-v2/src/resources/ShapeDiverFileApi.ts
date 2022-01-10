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
        return await sendRequest(async () => this.api.get<ShapeDiverResponseDto>(`${ this.buildSessionUri(sessionId) }/file/${ paramId }/list`))
    }

    /**
     * Download a file-asset.
     *
     * @param sessionId
     * @param paramId
     * @param fileId
     */
    async get (sessionId: string, paramId: string, fileId: string): Promise<ArrayBuffer> {
        return await sendRequest(async () => this.api.get<ArrayBuffer>(
            `${ this.buildSessionUri(sessionId) }/file/${ paramId }/${ fileId }`,
            { contentType: "application/json", responseType: ShapeDiverSdkApiResponseType.DATA },
        ))
    }

    /**
     * Delete a file-asset.
     *
     * @param sessionId
     * @param paramId
     * @param fileId
     */
    async delete (sessionId: string, paramId: string, fileId: string): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.delete<ShapeDiverResponseDto>(`${ this.buildSessionUri(sessionId) }/file/${ paramId }/${ fileId }`))
    }

    /**
     * Request an Upload-URL for a file.
     *
     * @param sessionId
     * @param body
     */
    async requestUpload (sessionId: string, body: ShapeDiverRequestFileUpload): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.post<ShapeDiverResponseDto>(this.buildSessionUri(sessionId) + "/file/upload", body))
    }

}
