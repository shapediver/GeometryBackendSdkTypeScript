import { DEFAULT_BASE_URL } from "../globals"

export class ShapeDiverSdkConfig {

    public readonly clientId: string
    public readonly jwt: string
    public readonly baseUrl: string

    constructor (clientId?: string, jwt?: string, baseUrl?: string) {
        this.clientId = (clientId) ? clientId : ""
        this.jwt = (jwt) ? jwt : ""
        this.baseUrl = (baseUrl) ? baseUrl : DEFAULT_BASE_URL
    }

}
