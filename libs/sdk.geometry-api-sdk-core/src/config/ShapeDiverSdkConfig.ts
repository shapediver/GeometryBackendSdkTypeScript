import { ShapeDiverError } from "../ShapeDiverErrors";

/** ShapeDiver configuration object */
export interface ShapeDiverSdkConfig {
  baseUrl: string;

  jwt: string;

  headers: { [key: string]: any };
}

/** Supported types of the ShapeDiver configuration object */
export enum ShapeDiverSdkConfigType {
  BASE_URL = "BASE_URL",
  JWT_TOKEN = "JWT_TOKEN",
  REQUEST_HEADERS = "REQUEST_HEADERS",
}

export type RequestHeader = Record<string, string>;

/** Private interface of the ShapeDiver configuration object */
export class SdkConfigInternal {
  private _baseUrl: string;
  private _headers: RequestHeader;
  private _jwt: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this._headers = {};
    this._jwt = "";
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  get headers(): RequestHeader {
    return this._headers;
  }

  get jwt(): string {
    return this._jwt;
  }

  public toConfig(): ShapeDiverSdkConfig {
    return {
      baseUrl: this._baseUrl,
      headers: this._headers,
      jwt: this._jwt,
    };
  }

  public setConfigValue(type: ShapeDiverSdkConfigType, value: any): void {
    switch (type) {
      case ShapeDiverSdkConfigType.BASE_URL:
        this._baseUrl = SdkConfigInternal.validateValue(
          type,
          value,
          "string",
        ) as string;
        break;
      case ShapeDiverSdkConfigType.JWT_TOKEN:
        this._jwt = SdkConfigInternal.validateValue(
          type,
          value,
          "string",
        ) as string;
        break;
      case ShapeDiverSdkConfigType.REQUEST_HEADERS:
        this._headers = SdkConfigInternal.validateValue(
          type,
          value,
          "string_map",
        ) as RequestHeader;
        break;
      default:
        throw new ShapeDiverError(`Invalid config-type ${type}`);
    }
  }

  public static validateValue(
    type: ShapeDiverSdkConfigType,
    value: any,
    dataType: "string" | "string_map",
  ): any {
    switch (dataType) {
      case "string":
        if (typeof value !== "string")
          throw new ShapeDiverError(
            `Invalid value for config-type '${type}': Value must be a string`,
          );
        break;
      case "string_map":
        if (
          typeof value !== "object" ||
          !Object.values(value).every((v) => typeof v === "string")
        )
          throw new ShapeDiverError(
            `Invalid value for config-type '${type}': Value must be a string-map`,
          );
        break;
    }

    return value;
  }
}
