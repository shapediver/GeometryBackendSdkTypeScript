import { ShapeDiverSdkConfig } from "../config/ShapeDiverSdkConfig"

enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

interface IResponseError {
    readonly error: string;

    readonly desc: string;

    readonly message: string;
}

export class ShapeDiverResponseError implements IResponseError {
    public readonly error: string
    public readonly desc: string
    public readonly message: string

    constructor (data: IResponseError) {
        this.error = data.error
        this.desc = data.desc
        this.message = data.message
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
            throw new ShapeDiverResponseError(await response.json())
        }
    }

    async post<T> (url: string, data: any): Promise<T> {
        const request = this.resolveRequest(Method.POST, data)
        const response = await fetch(`${ this.config.baseUrl }/${ url }`, request)

        if (response.ok) {
            return Promise.resolve(await response.json())
        } else {
            throw new ShapeDiverResponseError(await response.json())
        }
    }

    async put<T> (url: string, data: any): Promise<T> {
        const request = this.resolveRequest(Method.PUT, data)
        const response = await fetch(`${ this.config.baseUrl }/${ url }`, request)

        if (response.ok) {
            return Promise.resolve(await response.json())
        } else {
            throw new ShapeDiverResponseError(await response.json())
        }
    }

    async delete<T> (url: string): Promise<T> {
        const request = this.resolveRequest(Method.DELETE)
        const response = await fetch(`${ this.config.baseUrl }/${ url }`, request)

        if (response.ok) {
            return Promise.resolve(await response.json())
        } else {
            throw new ShapeDiverResponseError(await response.json())
        }
    }
}
