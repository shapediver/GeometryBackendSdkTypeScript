import { ShapeDiverRequestFileUpload, ShapeDiverResponseDto } from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi, ShapeDiverSdkApiResponseType } from "@shapediver/sdk.geometry-api-sdk-core"
import { sendRequest } from "../utils/utils"

export interface ShapeDiverResponseFileInfo {
    filename?: string,
    size?: number,
}

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
            (await this.api.get<ShapeDiverResponseDto>(
                `${ this.buildSessionUri(sessionId) }/file/${ paramId }/list`,
            ))[1],
        )
    }

    /**
     * Get information about a file-asset of a parameter.
     *
     * @param sessionId
     * @param paramId
     */
    async info (
        sessionId: string,
        paramId: string,
        fileId: string,
    ): Promise<ShapeDiverResponseFileInfo> {
        return await sendRequest(async () => {
            const headers = (await this.api.head(
                `${ this.buildSessionUri(sessionId) }/file/${ paramId }/${ fileId }`,
            ))[0]

            const res: ShapeDiverResponseFileInfo = {
                size: Number(headers.get("Content-Length") || headers.get("content-length")),
            }

            // Extract filename from Content-Disposition header if available
            const contentDisposition = headers.get("Content-Disposition")
                || headers.get("content-disposition")
            if (
                typeof contentDisposition === "string" &&
                contentDisposition.indexOf("=") > 0
            ) {
                res.filename = contentDisposition
                    .split("=")[1] // Extract filename
                    .slice(1, -1)  // remove leading and trailing double quotes
            }

            return res
    })
    }

    /**
     * Download a file-asset.
     *
     * @param sessionId
     * @param paramId
     * @param fileId
     */
    async get (
        sessionId: string,
        paramId: string,
        fileId: string,
    ): Promise<ArrayBuffer> {
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
    async delete (
        sessionId: string,
        paramId: string,
        fileId: string,
    ): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () =>
            (await this.api.delete<ShapeDiverResponseDto>(
                `${ this.buildSessionUri(sessionId) }/file/${ paramId }/${ fileId }`,
            ))[1],
        )
    }

    /**
     * Request an Upload-URL for a file.
     *
     * @param sessionId
     * @param body
     */
    async requestUpload (
        sessionId: string,
        body: ShapeDiverRequestFileUpload,
    ): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () =>
            (await this.api.post<ShapeDiverResponseDto>(
                this.buildSessionUri(sessionId) + "/file/upload",
                body
            ))[1],
        )
    }

}
