import { ShapeDiverSdkConfigInternal } from "../config/ShapeDiverSdkConfig"

enum Method {
    DELETE = "DELETE",
    GET = "GET",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
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

export interface ShapeDiverSdkApiRequestHeaders {
    contentType: string
}

export enum ShapeDiverSdkApiResponseType {
    JSON,
    BLOB,
}

export class ShapeDiverSdkApi {

    constructor (private config: ShapeDiverSdkConfigInternal) {
    }

    private buildRequest (method: Method, headers: ShapeDiverSdkApiRequestHeaders, data: any): RequestInit {
        const request: RequestInit = {
            method: method,
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": headers.contentType,
                "Authorization": "",
            },
            body: undefined,
        }

        // Add origin if specified.
        // The browser adds the Origin automatically to each request.
        // However, during testing this needs to be set manually.
        if (this.config.origin) {
            (request.headers as { [key: string]: string })["Origin"] = this.config.origin
        }

        // Add jwt if provided
        if (this.config.jwt) {
            (request.headers as { [key: string]: string })["Authorization"] = "Bearer " + this.config.jwt
        }

        // Set data and convert depending on content-type
        if (headers.contentType === "application/json") {
            request.body = JSON.stringify(data)
        } else {
            request.body = data
        }

        return request
    }

    private buildUrl (uri: string): string {
        if (uri.startsWith("/")) {
            return `${ this.config.baseUrl }/${ uri.substring(1) }`
        } else {
            return `${ this.config.baseUrl }/${ uri }`
        }
    }

    private async extractBody (response: Response, type: ShapeDiverSdkApiResponseType): Promise<any> {
        if (response.ok) {
            switch (type) {
                case ShapeDiverSdkApiResponseType.JSON:
                    return Promise.resolve(await response.json())
                case ShapeDiverSdkApiResponseType.BLOB:
                    return Promise.resolve(await response.blob())
                default:
                    return Promise.reject("Invalid response type")
            }
        } else {
            throw new ShapeDiverResponseError(await response.json())
        }
    }

    async get<T> (
        url: string,
        requestHeaders: ShapeDiverSdkApiRequestHeaders = { contentType: "application/json" },
        responseType = ShapeDiverSdkApiResponseType.JSON,
    ): Promise<T> {
        const request = this.buildRequest(Method.GET, requestHeaders, {})
        const response = await fetch(this.buildUrl(url), request)

        return await this.extractBody(response, responseType)
    }

    async post<T> (
        url: string,
        data: any = {},
        requestHeaders: ShapeDiverSdkApiRequestHeaders = { contentType: "application/json" },
        responseType = ShapeDiverSdkApiResponseType.JSON,
    ): Promise<T> {
        const request = this.buildRequest(Method.POST, requestHeaders, data)
        const response = await fetch(this.buildUrl(url), request)

        return await this.extractBody(response, responseType)
    }

    async put<T> (
        url: string,
        data: any = {},
        requestHeaders: ShapeDiverSdkApiRequestHeaders = { contentType: "application/json" },
        responseType = ShapeDiverSdkApiResponseType.JSON,
    ): Promise<T> {
        const request = this.buildRequest(Method.PUT, requestHeaders, data)
        const response = await fetch(this.buildUrl(url), request)

        return await this.extractBody(response, responseType)
    }

    async patch<T> (
        url: string,
        data: any = {},
        requestHeaders: ShapeDiverSdkApiRequestHeaders = { contentType: "application/json" },
        responseType = ShapeDiverSdkApiResponseType.JSON,
    ): Promise<T> {
        const request = this.buildRequest(Method.PATCH, requestHeaders, data)
        const response = await fetch(this.buildUrl(url), request)

        return await this.extractBody(response, responseType)
    }

    async delete<T> (
        url: string,
        requestHeaders: ShapeDiverSdkApiRequestHeaders = { contentType: "application/json" },
        responseType = ShapeDiverSdkApiResponseType.JSON,
    ): Promise<T> {
        const request = this.buildRequest(Method.DELETE, requestHeaders, {})
        const response = await fetch(this.buildUrl(url), request)

        return await this.extractBody(response, responseType)
    }
}
