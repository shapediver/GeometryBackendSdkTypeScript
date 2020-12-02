import { ShapeDiverSdkApi } from "../api/ShapeDiverSdkApi"

export abstract class BaseResourceApi {

    // NOTE currently not used on sddev2!
    // protected readonly commonPath: string = "api/v1/"
    protected readonly commonPath: string = ""

    constructor (protected readonly api: ShapeDiverSdkApi) {
    }

    abstract buildUri(id: string): string

}
