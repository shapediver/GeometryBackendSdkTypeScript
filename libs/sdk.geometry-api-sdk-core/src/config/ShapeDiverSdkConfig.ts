import { DEFAULT_BASE_URL } from "../globals"

export interface ShapeDiverSdkConfig {
    jwt: string,

    baseUrl: string
}

export class ShapeDiverSdkConfigInternal {

    public readonly jwt: string
    public readonly baseUrl: string

    // The origin is needed during testing, but should not be exposed to the user!
    public readonly origin = undefined

    constructor (jwt?: string, baseUrl?: string) {
        this.jwt = (jwt) ? jwt : ""
        this.baseUrl = (baseUrl) ? baseUrl : DEFAULT_BASE_URL
    }

    public toConfig (): ShapeDiverSdkConfig {
        return {
            jwt: this.jwt,
            baseUrl: this.baseUrl,
        }
    }

}
