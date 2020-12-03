import { ShapeDiverSdkConfig } from "../config/ShapeDiverSdkConfig"

enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

/** The error object returned by the backend **/
interface IResponseError {
    readonly error: string;

    readonly desc: string;

    readonly message: string;
}

/** The error object used and exposed by the SDK **/
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

    private buildRequest (method: Method, data?: any): RequestInit {
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

        // Add jwt if provided
        if (this.config.jwt) {
            (request.headers as { [key: string]: string })["Authorization"] = "Bearer " + this.config.jwt
        }
        if (data) {
            request.body = JSON.stringify(data)
        }

        return request
    }

    async get<T> (url?: string): Promise<T> {
        const response = await fetch(`${ this.config.baseUrl }/${ url }`, this.buildRequest(Method.GET))

        if (response.ok) {
            return Promise.resolve(await response.json())
        } else {
            throw new ShapeDiverResponseError(await response.json())
        }
    }

    async post<T> (url: string, data: any): Promise<T> {
        const request = this.buildRequest(Method.POST, data)
        const response = await fetch(`${ this.config.baseUrl }/${ url }`, request)

        if (response.ok) {
            return Promise.resolve(await response.json())
        } else {
            throw new ShapeDiverResponseError(await response.json())
        }
    }

    async put<T> (url: string, data: any): Promise<T> {
        const request = this.buildRequest(Method.PUT, data)
        const response = await fetch(`${ this.config.baseUrl }/${ url }`, request)

        if (response.ok) {
            return Promise.resolve(await response.json())
        } else {
            throw new ShapeDiverResponseError(await response.json())
        }
    }

    async delete<T> (url: string): Promise<T> {
        const request = this.buildRequest(Method.DELETE)
        const response = await fetch(`${ this.config.baseUrl }/${ url }`, request)

        if (response.ok) {
            return Promise.resolve(await response.json())
        } else {
            throw new ShapeDiverResponseError(await response.json())
        }
    }
}
