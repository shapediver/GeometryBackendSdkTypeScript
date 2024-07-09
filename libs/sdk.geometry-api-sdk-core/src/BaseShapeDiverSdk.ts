import { ShapeDiverSdkApi } from "./api/ShapeDiverSdkApi";
import {
  ShapeDiverSdkConfig,
  SdkConfigInternal,
  ShapeDiverSdkConfigType,
} from "./config/ShapeDiverSdkConfig";

export abstract class BaseShapeDiverSdk {
  protected readonly sdkConfig: SdkConfigInternal;
  protected readonly sdkApi: ShapeDiverSdkApi;

  /**
   * ShapeDiverSDK constructor
   *
   * @param baseUrl - the URL of the target system
   */
  protected constructor(baseUrl: string) {
    this.sdkConfig = new SdkConfigInternal(baseUrl);
    this.sdkApi = new ShapeDiverSdkApi(this.sdkConfig);
  }

  /**
   * Set a specific configuration value.
   *
   * @param type
   * @param value
   */
  setConfigurationValue(type: ShapeDiverSdkConfigType, value: any): void {
    this.sdkConfig.setConfigValue(type, value);
  }

  /** Get the ShapeDiver configuration object */
  get configuration(): ShapeDiverSdkConfig {
    return this.sdkConfig.toConfig();
  }
}
