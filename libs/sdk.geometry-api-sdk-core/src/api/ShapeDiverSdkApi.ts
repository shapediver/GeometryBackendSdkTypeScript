import axios, { AxiosRequestConfig } from "axios"
import { SdkConfigInternal } from "../config/ShapeDiverSdkConfig"
import { ShapeDiverError, ShapeDiverRequestError, ShapeDiverResponseError } from "../ShapeDiverErrors"

enum Method {
    DELETE = "DELETE",
    GET = "GET",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
}

export interface ShapeDiverSdkApiRequestOptions {
    contentType: string

    responseType: ShapeDiverSdkApiResponseType

    disableAuthorization?: boolean

    disableCustomHeaders?: boolean
}

export enum ShapeDiverSdkApiResponseType {
    JSON = "json",
    DATA = "arraybuffer",
    TEXT = "text",
}

export class ShapeDiverSdkApi {

    constructor (private config: SdkConfigInternal) {
    }

    private buildRequestConfig (
        method: Method,
        options: ShapeDiverSdkApiRequestOptions,
        data: any,
    ): AxiosRequestConfig {
        const request: AxiosRequestConfig = {
            method: method,
            headers: {},
            responseType: options.responseType,
            data: undefined,
        }

        // Process HTTP headers
        if (!options.disableCustomHeaders) request.headers = { ...this.config.headers }
        request.headers!["Content-Type"] = options.contentType

        // Process HTTP authorization header
        if (options.disableAuthorization) {
            delete request.headers!["Authorization"]
            delete request.headers!["authorization"]    // config.headers might use lower case
        } else if (this.config.jwt) {
            request.headers!["Authorization"] = "Bearer " + this.config.jwt
        }

        // Set data and convert depending on content-type
        if (options.contentType === "application/json" && data) {
            request.data = JSON.stringify(data)
        } else {
            request.data = data
        }

        return request
    }

    private buildUrl (uri: string): string {
        if (typeof uri !== "string") {
            throw new ShapeDiverError("No URL or URI was specified")
        } else if (uri.startsWith("http")) {
            return uri
        } else if (uri.startsWith("/")) {
            return `${ this.config.baseUrl }/${ uri.substring(1) }`
        } else {
            return `${ this.config.baseUrl }/${ uri }`
        }
    }

    /**
     * Processes the given Axios error, maps it content and throws the
     * respective ShapeDiver error.
     *
     * @param error
     * @param responseType
     * @throws
     * @private
     */
    private static async processError (error: any, responseType: ShapeDiverSdkApiResponseType): Promise<any> {
        if (error.response) {
            // Request was made and server responded with 4xx or 5xx

            let data
            if (responseType === ShapeDiverSdkApiResponseType.DATA) {
                data = this.convertErrorResponseData(error.response.data)
            } else {
                data = error.response.data
            }

            throw new ShapeDiverResponseError(
                error.response.status,
                data.error ?? "",
                data.desc ?? "",
                data.message || (data.desc ?? ""),
                error.response.headers,
            )
        } else if (error.request) {
            // The request was made but no response was received
            throw new ShapeDiverRequestError("The request was made but no response was received", error.request)
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new ShapeDiverError(error.message)
        }
    }

    /**
     * Axios returns errors in the same type that we where using to specify the
     * data response type of the happy-path. Thus, we have to convert them
     * manually.
     *
     * @param data
     * @private
     */
    private static convertErrorResponseData (data: any): { [key: string]: string } {
        let stringData

        if (typeof window === "undefined") {
            // NodeJs
            stringData = Buffer.from(data).toString()
        } else if (window.TextDecoder) {
            // Browser + TextDecoder support
            stringData = new TextDecoder("utf-8").decode(new Uint8Array(data))
        } else {
            throw new ShapeDiverError("Received an unknown error object")
        }

        try {
            // This should work for the ShapeDiver backend
            return JSON.parse(stringData)
        } catch (_) {
            // This might be an XML when calling another system (e.g. S3)
            return { message: stringData }
        }
    }

    async get<T> (
        url: string,
        options: ShapeDiverSdkApiRequestOptions = {
            contentType: "application/json",
            responseType: ShapeDiverSdkApiResponseType.JSON,
        },
    ): Promise<T> {
        const config = this.buildRequestConfig(Method.GET, options, undefined)
        try {
            const response = await axios(this.buildUrl(url), config)
            return response.data as T
        } catch (e: any) {
            return await ShapeDiverSdkApi.processError(e, options.responseType)
        }
    }

    async post<T> (
        url: string,
        data: any = {},
        options: ShapeDiverSdkApiRequestOptions = {
            contentType: "application/json",
            responseType: ShapeDiverSdkApiResponseType.JSON,
        },
    ): Promise<T> {
        const config = this.buildRequestConfig(Method.POST, options, data)
        try {
            const response = await axios(this.buildUrl(url), config)
            return response.data as T
        } catch (e: any) {
            return await ShapeDiverSdkApi.processError(e, options.responseType)
        }
    }

    async put<T> (
        url: string,
        data: any = {},
        options: ShapeDiverSdkApiRequestOptions = {
            contentType: "application/json",
            responseType: ShapeDiverSdkApiResponseType.JSON,
        },
    ): Promise<T> {
        const config = this.buildRequestConfig(Method.PUT, options, data)
        try {
            const response = await axios(this.buildUrl(url), config)
            return response.data as T
        } catch (e: any) {
            return await ShapeDiverSdkApi.processError(e, options.responseType)
        }
    }

    async patch<T> (
        url: string,
        data: any = {},
        options: ShapeDiverSdkApiRequestOptions = {
            contentType: "application/json",
            responseType: ShapeDiverSdkApiResponseType.JSON,
        },
    ): Promise<T> {
        const config = this.buildRequestConfig(Method.PATCH, options, data)
        try {
            const response = await axios(this.buildUrl(url), config)
            return response.data as T
        } catch (e: any) {
            return await ShapeDiverSdkApi.processError(e, options.responseType)
        }
    }

    async delete<T> (
        url: string,
        options: ShapeDiverSdkApiRequestOptions = {
            contentType: "application/json",
            responseType: ShapeDiverSdkApiResponseType.JSON,
        },
    ): Promise<T> {
        const config = this.buildRequestConfig(Method.DELETE, options, {})
        try {
            const response = await axios(this.buildUrl(url), config)
            return response.data as T
        } catch (e: any) {
            return await ShapeDiverSdkApi.processError(e, options.responseType)
        }
    }
}
