import {
    ShapeDiverViewRequestCache,
    ShapeDiverViewRequestCustomization,
    ShapeDiverViewResponseDto,
} from "@shapediver/api.geometry-api-dto-view"
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
    async customize (sessionId: string, body: ShapeDiverViewRequestCustomization): Promise<ShapeDiverViewResponseDto> {
        return await this.api.post<ShapeDiverViewResponseDto>(this.buildUri(sessionId) + "/customize", body)
    }

    /**
     * Check if a specific version of a requested output has been computed yet.
     *
     * @param sessionId
     * @param body
     */
    async getCache (sessionId: string, body: ShapeDiverViewRequestCache): Promise<ShapeDiverViewResponseDto> {
        return await this.api.post<ShapeDiverViewResponseDto>(this.buildUri(sessionId) + "/cache", body)
    }

}
