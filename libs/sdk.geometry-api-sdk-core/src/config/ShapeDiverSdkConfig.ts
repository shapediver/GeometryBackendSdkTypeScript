export interface ShapeDiverSdkConfig {
    jwt: string,

    baseUrl: string
}

export class ShapeDiverSdkConfigInternal {

    public readonly baseUrl: string
    public readonly jwt: string

    // The origin is needed during testing, but should not be exposed to the user!
    public readonly origin = undefined

    constructor (baseUrl: string, jwt?: string) {
        this.baseUrl = baseUrl
        this.jwt = (jwt) ? jwt : ""
    }

    public toConfig (): ShapeDiverSdkConfig {
        return {
            jwt: this.jwt,
            baseUrl: this.baseUrl,
        }
    }

}
