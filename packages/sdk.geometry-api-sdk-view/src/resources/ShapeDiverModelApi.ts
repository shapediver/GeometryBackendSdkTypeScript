import {
    ShapeDiverViewRequestConfigure,
    ShapeDiverViewRequestCustomization,
    ShapeDiverViewResponseDto,
} from "@shapediver/api.geometry-api-dto-view"
import { BaseResourceApi } from "@shapediver/sdk.geometry-api-sdk-core"

export class ShapeDiverModelApi extends BaseResourceApi {

    buildUri (sessionId: string): string {
        return `${ this.commonPath }/session/${ sessionId }`
    }

    /**
     * Save configurations of the viewer.
     *
     * @param sessionId
     * @param body
     */
    async configure (sessionId: string, body: ShapeDiverViewRequestConfigure): Promise<ShapeDiverViewResponseDto> {
        return await this.api.post<ShapeDiverViewResponseDto>(this.buildUri(sessionId) + "/configure", body)
    }

    /**
     * Set the default parameters for the ShapeDiver Model.
     *
     * @param sessionId
     * @param body
     */
    async defaultParams (sessionId: string, body: ShapeDiverViewRequestCustomization): Promise<ShapeDiverViewResponseDto> {
        return await this.api.post<ShapeDiverViewResponseDto>(this.buildUri(sessionId) + "/defaultparam", body)
    }

}
