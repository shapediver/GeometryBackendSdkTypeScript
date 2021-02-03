import {
    ShapeDiverRequestCache,
    ShapeDiverRequestExport,
    ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverExportApi extends BaseResourceApi {

    buildUri (sessionId: string): string {
        return `${ this.commonPath }/session/${ sessionId }`
    }

    /**
     * Request a specific version of an export.
     *
     * @param sessionId
     * @param body
     */
    async compute (sessionId: string, body: ShapeDiverRequestExport): Promise<ShapeDiverResponseDto> {
        return await this.api.put<ShapeDiverResponseDto>(this.buildUri(sessionId) + "/export", body)
    }

    /**
     * Check if a specific version of a requested export has been computed yet.
     *
     * @param sessionId
     * @param body
     */
    async getCache (sessionId: string, body: ShapeDiverRequestCache): Promise<ShapeDiverResponseDto> {
        return await this.api.put<ShapeDiverResponseDto>(this.buildUri(sessionId) + "/export/cache", body)
    }

}
