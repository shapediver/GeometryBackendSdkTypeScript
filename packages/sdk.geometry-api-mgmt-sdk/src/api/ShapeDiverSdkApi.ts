import { ShapeDiverSdkConfig } from "../config/ShapeDiverSdkConfig"

// const fetch = require("node-fetch") // TODO only for local testing

enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

interface IResponseError {
    readonly error: string;

    readonly error_description: string;

    readonly error_uri: string;
}

export class ShapeDiverResponseError implements IResponseError {
    public readonly error: string
    public readonly error_description: string
    public readonly error_uri: string

    constructor (data: IResponseError) {
        this.error = data.error
        this.error_description = data.error_description
        this.error_uri = data.error_uri
    }
}

export class ShapeDiverSdkApi {

    constructor (private config: ShapeDiverSdkConfig) {
    }

    private resolveRequest (method: Method, data?: any): RequestInit {
        const request: RequestInit = {
            method: method,
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "",
            },
            body: undefined,
        }

        if (this.config.jwt) {
            (request.headers as { [id: string]: string })["Authorization"] = `Bearer ${ this.config.jwt }`
        }
        if (this.config.clientId) {
            (request.headers as { [id: string]: string })["X-ShapeDiver-Client"] = this.config.clientId
        }
        if (data) {
            request.body = JSON.stringify(data)
        }

        return request
    }

    async get<T> (url?: string): Promise<T> {
        const response = await fetch(`${ this.config.baseUrl }/${ url }`, this.resolveRequest(Method.GET))

        if (response.ok) {
            return Promise.resolve(await response.json())
        } else {
            console.error(response) // TODO delete
            throw new ShapeDiverResponseError(await response.json())    // TODO add actual error mapping
        }
    }

    async post<T> (url: string, data: any): Promise<T> {
        const request = this.resolveRequest(Method.POST, data)
        const response = await fetch(`${ this.config.baseUrl }/${ url }`, request)

        if (response.ok) {
            return Promise.resolve(await response.json())
        } else {
            console.error(response) // TODO delete
            throw new ShapeDiverResponseError(await response.json())    // TODO add actual error mapping
        }
    }

    async put<T> (url: string, data: any): Promise<T> {
        const request = this.resolveRequest(Method.PUT, data)
        const response = await fetch(`${ this.config.baseUrl }/${ url }`, request)

        if (response.ok) {
            return Promise.resolve(await response.json())
        } else {
            console.error(response) // TODO delete
            throw new ShapeDiverResponseError(await response.json())    // TODO add actual error mapping
        }
    }

    async delete<T> (url: string): Promise<T> {
        const request = this.resolveRequest(Method.DELETE)
        const response = await fetch(`${ this.config.baseUrl }/${ url }`, request)

        if (response.ok) {
            return Promise.resolve(await response.json())
        } else {
            console.error(response) // TODO delete
            throw new ShapeDiverResponseError(await response.json())    // TODO add actual error mapping
        }
    }
}
