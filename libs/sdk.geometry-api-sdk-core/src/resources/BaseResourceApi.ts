import { ShapeDiverSdkApi } from ".."

export abstract class BaseResourceApi {

    // NOTE currently not used on sddev2!
    // protected readonly commonPath: string = "api/v1/"
    protected readonly commonPath: string = ""

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
