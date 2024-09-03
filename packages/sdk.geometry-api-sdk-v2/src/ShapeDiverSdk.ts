import {
  BaseShapeDiverSdk,
  ShapeDiverSdkConfigType,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { ShapeDiverAnalyticsApi } from "./resources/ShapeDiverAnalyticsApi";
import { ShapeDiverArSceneApi } from "./resources/ShapeDiverArSceneApi";
import { ShapeDiverAssetApi } from "./resources/ShapeDiverAssetApi";
import { ShapeDiverExportApi } from "./resources/ShapeDiverExportApi";
import { ShapeDiverFileApi } from "./resources/ShapeDiverFileApi";
import { ShapeDiverGltfApi } from "./resources/ShapeDiverGltfApi";
import { ShapeDiverModelApi } from "./resources/ShapeDiverModelApi";
import { ShapeDiverOutputApi } from "./resources/ShapeDiverOutputApi";
import { ShapeDiverSdtfApi } from "./resources/ShapeDiverSdtfApi";
import { ShapeDiverSessionApi } from "./resources/ShapeDiverSessionApi";
import { ShapeDiverSystemApi } from "./resources/ShapeDiverSystemApi";
import { ShapeDiverTextureApi } from "./resources/ShapeDiverTextureApi";
import { ShapeDiverUtilsApi } from "./resources/ShapeDiverUtilsApi";
import { ShapeDiverModelStateApi } from "./resources/ShapeDiverModelStateApi";

export function create(baseUrl: string, jwt?: string): ShapeDiverSdk {
  return new ShapeDiverSdk(baseUrl, jwt);
}

export class ShapeDiverSdk extends BaseShapeDiverSdk {
  private readonly _analytics: ShapeDiverAnalyticsApi;
  private readonly _arScene: ShapeDiverArSceneApi;
  private readonly _asset: ShapeDiverAssetApi;
  private readonly _export: ShapeDiverExportApi;
  private readonly _file: ShapeDiverFileApi;
  private readonly _gltf: ShapeDiverGltfApi;
  private readonly _model: ShapeDiverModelApi;
  private readonly _modelState: ShapeDiverModelStateApi;
  private readonly _output: ShapeDiverOutputApi;
  private readonly _sdtf: ShapeDiverSdtfApi;
  private readonly _session: ShapeDiverSessionApi;
  private readonly _system: ShapeDiverSystemApi;
  private readonly _texture: ShapeDiverTextureApi;
  private readonly _utils: ShapeDiverUtilsApi;

  /**
   * ShapeDiverSDK constructor
   *
   * @param baseUrl - the URL of the target system
   * @param jwt - the client's jwt
   */
  constructor(baseUrl: string, jwt?: string) {
    super(baseUrl);
    if (jwt) this.setConfigurationValue(ShapeDiverSdkConfigType.JWT_TOKEN, jwt);

    this._analytics = new ShapeDiverAnalyticsApi(this.sdkApi);
    this._arScene = new ShapeDiverArSceneApi(this.sdkApi);
    this._asset = new ShapeDiverAssetApi(this.sdkApi);
    this._export = new ShapeDiverExportApi(this.sdkApi);
    this._file = new ShapeDiverFileApi(this.sdkApi);
    this._gltf = new ShapeDiverGltfApi(this.sdkApi);
    this._model = new ShapeDiverModelApi(this.sdkApi);
    this._modelState = new ShapeDiverModelStateApi(this.sdkApi);
    this._output = new ShapeDiverOutputApi(this.sdkApi);
    this._sdtf = new ShapeDiverSdtfApi(this.sdkApi);
    this._session = new ShapeDiverSessionApi(this.sdkApi);
    this._system = new ShapeDiverSystemApi(this.sdkApi);
    this._texture = new ShapeDiverTextureApi(this.sdkApi);
    this._utils = new ShapeDiverUtilsApi(this.sdkApi);
  }

  get analytics(): ShapeDiverAnalyticsApi {
    return this._analytics;
  }

  get arScene(): ShapeDiverArSceneApi {
    return this._arScene;
  }

  get asset(): ShapeDiverAssetApi {
    return this._asset;
  }

  get export(): ShapeDiverExportApi {
    return this._export;
  }

  get file(): ShapeDiverFileApi {
    return this._file;
  }

  get gltf(): ShapeDiverGltfApi {
    return this._gltf;
  }

  get model(): ShapeDiverModelApi {
    return this._model;
  }

  get modelState(): ShapeDiverModelStateApi {
    return this._modelState;
  }

  get output(): ShapeDiverOutputApi {
    return this._output;
  }

  get sdtf(): ShapeDiverSdtfApi {
    return this._sdtf;
  }

  get session(): ShapeDiverSessionApi {
    return this._session;
  }

  get system(): ShapeDiverSystemApi {
    return this._system;
  }

  get texture(): ShapeDiverTextureApi {
    return this._texture;
  }

  get utils(): ShapeDiverUtilsApi {
    return this._utils;
  }
}
