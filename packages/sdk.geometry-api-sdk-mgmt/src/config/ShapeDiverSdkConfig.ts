import { DEFAULT_BASE_URL } from "../globals"

export class ShapeDiverSdkConfig {

    public readonly jwt: string
    public readonly baseUrl: string

    constructor (jwt?: string, baseUrl?: string) {
        this.jwt = (jwt) ? jwt : ""
        this.baseUrl = (baseUrl) ? baseUrl : DEFAULT_BASE_URL
    }

}
