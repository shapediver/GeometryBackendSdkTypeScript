import {
    ShapeDiverRequestCache,
    ShapeDiverRequestExport,
    ShapeDiverRequestExportDefinition,
    ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi } from "@shapediver/sdk.geometry-api-sdk-core"
import { sendRequest } from "../utils/utils"

export class ShapeDiverExportApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * Request a specific version of an export.
     *
     * @param sessionId
     * @param body
     */
    async compute (sessionId: string, body: ShapeDiverRequestExport): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.put<ShapeDiverResponseDto>(this.buildSessionUri(sessionId) + "/export", body))
    }

    /**
     * Check if a specific version of a requested export has been computed yet.
     *
     * @param sessionId
     * @param body
     */
    async getCache (sessionId: string, body: ShapeDiverRequestCache): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.put<ShapeDiverResponseDto>(this.buildSessionUri(sessionId) + "/export/cache", body))
    }

    /**
     * Updates the definitions of the given exports.
     *
     * @param modelId
     * @param body
     */
    async updateDefinitions (modelId: string, body: ShapeDiverRequestExportDefinition): Promise<ShapeDiverResponseDto> {
        return await sendRequest(async () => this.api.patch<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/export", body))
    }

}
