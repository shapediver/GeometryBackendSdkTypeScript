import {
    ShapeDiverRequestCache,
    ShapeDiverRequestCustomization,
    ShapeDiverRequestOutputDefinition,
    ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi, ShapeDiverSdkApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverOutputApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * Request a specific version of an output.
     *
     * @param sessionId
     * @param body
     */
    async customize (sessionId: string, body: ShapeDiverRequestCustomization): Promise<ShapeDiverResponseDto> {
        return await this.api.put<ShapeDiverResponseDto>(this.buildSessionUri(sessionId) + "/output", body)
    }

    /**
     * Check if a specific version of a requested output has been computed yet.
     *
     * @param sessionId
     * @param body
     */
    async getCache (sessionId: string, body: ShapeDiverRequestCache): Promise<ShapeDiverResponseDto> {
        return await this.api.put<ShapeDiverResponseDto>(this.buildSessionUri(sessionId) + "/output/cache", body)
    }

    /**
     * Updates the definitions of the given outputs.
     *
     * @param modelId
     * @param body
     */
    async updateDefinitions (modelId: string, body: ShapeDiverRequestOutputDefinition): Promise<ShapeDiverResponseDto> {
        return await this.api.patch<ShapeDiverResponseDto>(this.buildModelUri(modelId) + "/output", body)
    }

}
