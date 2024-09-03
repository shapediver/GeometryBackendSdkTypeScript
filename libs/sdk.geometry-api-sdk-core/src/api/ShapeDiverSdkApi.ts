import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SdkConfigInternal } from "../config/ShapeDiverSdkConfig";
import {
  ShapeDiverError,
  ShapeDiverRequestError,
  ShapeDiverResponseError,
} from "../ShapeDiverErrors";
import { sdAssertUnreachable } from "../utils";

enum Method {
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
}

export interface ShapeDiverSdkApiRequestOptions {
  contentDisposition?: string;

  contentType?: string;

  responseType: ShapeDiverSdkApiResponseType;

  disableAuthorization?: boolean;

  disableCustomHeaders?: boolean;

  accept?: string;
}

export enum ShapeDiverSdkApiResponseType {
  JSON = "json",
  DATA = "arraybuffer",
  TEXT = "text",
}

export class ShapeDiverSdkApi {
  constructor(private config: SdkConfigInternal) {}

  private buildRequestConfig(
    method: Method,
    options: ShapeDiverSdkApiRequestOptions,
    data: any,
  ): AxiosRequestConfig {
    const request: AxiosRequestConfig = {
      method: method,
      headers: {},
      responseType: options.responseType,
      data: undefined,
    };

    // Process HTTP headers
    if (!options.disableCustomHeaders)
      request.headers = { ...this.config.headers };

    // Process HTTP authorization header
    if (options.disableAuthorization) {
      delete request.headers!["Authorization"];
      delete request.headers!["authorization"]; // config.headers might use lower case
    } else if (this.config.jwt) {
      request.headers!["Authorization"] = "Bearer " + this.config.jwt;
    }

    // Set data and convert depending on content-type
    if (options.contentType) {
      request.headers!["Content-Type"] = options.contentType;
      request.data = data;
    }

    // Set the HTTP Accept header if specified
    if (options.accept) {
      request.headers!["Accept"] = options.accept;
    }

    // Set the HTTP Content-Disposition header if specified
    if (options.contentDisposition) {
      request.headers!["Content-Disposition"] = options.contentDisposition;
    }

    return request;
  }

  private buildUrl(uri: unknown, queries: string[]): string {
    if (typeof uri !== "string") {
      throw new ShapeDiverError("No URL or URI was specified");
    }

    let url = uri.startsWith("http")
      ? uri
      : `${this.config.baseUrl}/${uri.startsWith("/") ? uri.substring(1) : uri}`;

    if (queries.length) {
      url += `?${queries.join("&")}`;
    }

    return url;
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
  private static async processError(
    error: any,
    responseType: ShapeDiverSdkApiResponseType,
  ): Promise<any> {
    if (error.response) {
      // Request was made and server responded with 4xx or 5xx
      const resp = error.response as AxiosResponse;

      let data;
      if (responseType === ShapeDiverSdkApiResponseType.DATA) {
        data = this.convertErrorResponseData(resp.data);
      } else {
        data = resp.data;
      }

      throw new ShapeDiverResponseError(
        data.message || data.desc || (data.error ?? ""),
        resp.status,
        data.error ?? "",
        data.desc ?? "",
        resp.headers,
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new ShapeDiverRequestError(
        "Could not send request.",
        "The request was made but no response was received",
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new ShapeDiverError(error.message);
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
  private static convertErrorResponseData(data: any): {
    [key: string]: string;
  } {
    let stringData;

    if (typeof window === "undefined") {
      // NodeJs
      stringData = Buffer.from(data).toString();
    } else if (window.TextDecoder) {
      // Browser + TextDecoder support
      stringData = new TextDecoder("utf-8").decode(new Uint8Array(data));
    } else {
      throw new ShapeDiverError("Received an unknown error object");
    }

    try {
      // This should work for the ShapeDiver backend
      return JSON.parse(stringData);
    } catch (_) {
      // This might be an XML when calling another system (e.g. S3)
      return { message: stringData };
    }
  }

  private static parseResponse(
    data: any,
    requestedType: ShapeDiverSdkApiResponseType,
  ): any {
    switch (requestedType) {
      case ShapeDiverSdkApiResponseType.TEXT:
      case ShapeDiverSdkApiResponseType.JSON:
        // For now, we do not validate or parse those responses
        return data;
      case ShapeDiverSdkApiResponseType.DATA:
        // This is required to support Node.js as well as Browsers
        return data instanceof ArrayBuffer
          ? data
          : Uint8Array.from(data).buffer;
      default:
        // Force the compiler to make the switch block exhaustive
        sdAssertUnreachable(requestedType);
    }
  }

  async head(
    url: string,
    options: Omit<ShapeDiverSdkApiRequestOptions, "responseType"> = {},
  ): Promise<[Record<string, any>, number]> {
    const fullOptions: ShapeDiverSdkApiRequestOptions = {
      ...options,
      responseType: ShapeDiverSdkApiResponseType.JSON, // To handle API error responses
    };
    const config = this.buildRequestConfig(Method.HEAD, fullOptions, undefined);
    try {
      const response = await axios(this.buildUrl(url, []), config);
      return [response.headers, response.status];
    } catch (e: any) {
      return await ShapeDiverSdkApi.processError(e, fullOptions.responseType);
    }
  }

  async get<T>(
    url: string,
    queries: string[] = [],
    options: ShapeDiverSdkApiRequestOptions = {
      contentType: "application/json",
      responseType: ShapeDiverSdkApiResponseType.JSON,
    },
  ): Promise<[Record<string, any>, T]> {
    const config = this.buildRequestConfig(Method.GET, options, undefined);
    try {
      const response = await axios(this.buildUrl(url, queries), config);
      return [
        response.headers,
        ShapeDiverSdkApi.parseResponse(
          response.data,
          options.responseType,
        ) as T,
      ];
    } catch (e: any) {
      return await ShapeDiverSdkApi.processError(e, options.responseType);
    }
  }

  async post<T>(
    url: string,
    queries: string[] = [],
    data: any = {},
    options: ShapeDiverSdkApiRequestOptions = {
      contentType: "application/json",
      responseType: ShapeDiverSdkApiResponseType.JSON,
    },
  ): Promise<[Record<string, any>, T]> {
    const config = this.buildRequestConfig(Method.POST, options, data);
    try {
      const response = await axios(this.buildUrl(url, queries), config);
      return [
        response.headers,
        ShapeDiverSdkApi.parseResponse(
          response.data,
          options.responseType,
        ) as T,
      ];
    } catch (e: any) {
      return await ShapeDiverSdkApi.processError(e, options.responseType);
    }
  }

  async put<T>(
    url: string,
    queries: string[] = [],
    data: any = {},
    options: ShapeDiverSdkApiRequestOptions = {
      contentType: "application/json",
      responseType: ShapeDiverSdkApiResponseType.JSON,
    },
  ): Promise<[Record<string, any>, T]> {
    const config = this.buildRequestConfig(Method.PUT, options, data);
    try {
      const response = await axios(this.buildUrl(url, queries), config);
      return [
        response.headers,
        ShapeDiverSdkApi.parseResponse(
          response.data,
          options.responseType,
        ) as T,
      ];
    } catch (e: any) {
      return await ShapeDiverSdkApi.processError(e, options.responseType);
    }
  }

  async patch<T>(
    url: string,
    queries: string[] = [],
    data: any = {},
    options: ShapeDiverSdkApiRequestOptions = {
      contentType: "application/json",
      responseType: ShapeDiverSdkApiResponseType.JSON,
    },
  ): Promise<[Record<string, any>, T]> {
    const config = this.buildRequestConfig(Method.PATCH, options, data);
    try {
      const response = await axios(this.buildUrl(url, queries), config);
      return [
        response.headers,
        ShapeDiverSdkApi.parseResponse(
          response.data,
          options.responseType,
        ) as T,
      ];
    } catch (e: any) {
      return await ShapeDiverSdkApi.processError(e, options.responseType);
    }
  }

  async delete<T>(
    url: string,
    queries: string[] = [],
    options: ShapeDiverSdkApiRequestOptions = {
      contentType: "application/json",
      responseType: ShapeDiverSdkApiResponseType.JSON,
    },
  ): Promise<[Record<string, any>, T]> {
    const config = this.buildRequestConfig(Method.DELETE, options, {});
    try {
      const response = await axios(this.buildUrl(url, queries), config);
      return [
        response.headers,
        ShapeDiverSdkApi.parseResponse(
          response.data,
          options.responseType,
        ) as T,
      ];
    } catch (e: any) {
      return await ShapeDiverSdkApi.processError(e, options.responseType);
    }
  }
}
