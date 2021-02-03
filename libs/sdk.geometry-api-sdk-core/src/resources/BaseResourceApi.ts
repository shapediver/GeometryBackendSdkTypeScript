import { ShapeDiverSdkApi } from ".."

export abstract class BaseResourceApi {

    protected readonly commonPath: string = "/api/v2"

    // Intentionally not set to 'protected'
    constructor (protected readonly api: ShapeDiverSdkApi) {
    }

    /**
     * Create the controller specific URI.
     *
     * @param modelId
     */
    abstract buildUri (modelId: string): string

}
