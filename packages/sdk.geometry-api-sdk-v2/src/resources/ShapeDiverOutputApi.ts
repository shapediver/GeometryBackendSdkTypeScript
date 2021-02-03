import {
    ShapeDiverRequestCache,
    ShapeDiverRequestCustomization,
    ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverOutputApi extends BaseResourceApi {

    buildUri (sessionId: string): string {
        return `${ this.commonPath }/session/${ sessionId }`
    }

    /**
     * Request a specific version of an output.
     *
     * @param sessionId
     * @param body
     */
    async customize (sessionId: string, body: ShapeDiverRequestCustomization): Promise<ShapeDiverResponseDto> {
        return await this.api.put<ShapeDiverResponseDto>(this.buildUri(sessionId) + "/output", body)
    }

    /**
     * Check if a specific version of a requested output has been computed yet.
     *
     * @param sessionId
     * @param body
     */
    async getCache (sessionId: string, body: ShapeDiverRequestCache): Promise<ShapeDiverResponseDto> {
        return await this.api.put<ShapeDiverResponseDto>(this.buildUri(sessionId) + "/output/cache", body)
    }

}
