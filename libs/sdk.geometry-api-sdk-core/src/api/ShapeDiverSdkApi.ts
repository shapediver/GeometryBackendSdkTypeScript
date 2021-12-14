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

export interface ShapeDiverSdkApiRequestHeaders {
    contentType: string

    authorization?: "disabled"
}

export enum ShapeDiverSdkApiResponseType {
    JSON = "json",
    DATA = "arraybuffer",
}

export class ShapeDiverSdkApi {

    constructor (private config: SdkConfigInternal) {
    }

    private buildRequestConfig (
        method: Method,
        headers: ShapeDiverSdkApiRequestHeaders,
        data: any,
        responseType: ShapeDiverSdkApiResponseType,
    ): AxiosRequestConfig {
        const request: AxiosRequestConfig = {
            method: method,
            headers: {
                ...this.config.headers,
                "Content-Type": headers.contentType,
            },
            responseType: responseType,
            data: undefined,
        }

        // Add jwt if provided
        if (this.config.jwt) {
            request.headers!["Authorization"] = "Bearer " + this.config.jwt
        }

        // Set data and convert depending on content-type
        if (headers.contentType === "application/json") {
            request.data = JSON.stringify(data)
        } else {
            request.data = data
        }

        return request
    }

    private buildUrl (uri: string): string {
        if (uri.startsWith("http")) {
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
                data.error,
                data.desc,
                data.message,
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
            return {}
        }

        return JSON.parse(stringData)
    }

    async get<T> (
        url: string,
        requestHeaders: ShapeDiverSdkApiRequestHeaders = { contentType: "application/json" },
        responseType = ShapeDiverSdkApiResponseType.JSON,
    ): Promise<T> {
        const config = this.buildRequestConfig(Method.GET, requestHeaders, {}, responseType)
        try {
            const response = await axios(this.buildUrl(url), config)
            return response.data as T
        } catch (e: any) {
            return await ShapeDiverSdkApi.processError(e, responseType)
        }
    }

    async post<T> (
        url: string,
        data: any = {},
        requestHeaders: ShapeDiverSdkApiRequestHeaders = { contentType: "application/json" },
        responseType = ShapeDiverSdkApiResponseType.JSON,
    ): Promise<T> {
        const config = this.buildRequestConfig(Method.POST, requestHeaders, data, responseType)
        try {
            const response = await axios(this.buildUrl(url), config)
            return response.data as T
        } catch (e: any) {
            return await ShapeDiverSdkApi.processError(e, responseType)
        }
    }

    async put<T> (
        url: string,
        data: any = {},
        requestHeaders: ShapeDiverSdkApiRequestHeaders = { contentType: "application/json" },
        responseType = ShapeDiverSdkApiResponseType.JSON,
    ): Promise<T> {
        const config = this.buildRequestConfig(Method.PUT, requestHeaders, data, responseType)
        try {
            const response = await axios(this.buildUrl(url), config)
            return response.data as T
        } catch (e: any) {
            return await ShapeDiverSdkApi.processError(e, responseType)
        }
    }

    async patch<T> (
        url: string,
        data: any = {},
        requestHeaders: ShapeDiverSdkApiRequestHeaders = { contentType: "application/json" },
        responseType = ShapeDiverSdkApiResponseType.JSON,
    ): Promise<T> {
        const config = this.buildRequestConfig(Method.PATCH, requestHeaders, data, responseType)
        try {
            const response = await axios(this.buildUrl(url), config)
            return response.data as T
        } catch (e: any) {
            return await ShapeDiverSdkApi.processError(e, responseType)
        }
    }

    async delete<T> (
        url: string,
        requestHeaders: ShapeDiverSdkApiRequestHeaders = { contentType: "application/json" },
        responseType = ShapeDiverSdkApiResponseType.JSON,
    ): Promise<T> {
        const config = this.buildRequestConfig(Method.DELETE, requestHeaders, {}, responseType)
        try {
            const response = await axios(this.buildUrl(url), config)
            return response.data as T
        } catch (e: any) {
            return await ShapeDiverSdkApi.processError(e, responseType)
        }
    }
}
