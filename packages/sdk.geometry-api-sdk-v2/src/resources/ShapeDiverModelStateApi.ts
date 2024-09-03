import {
  BaseResourceApi,
  ShapeDiverResponseError,
  ShapeDiverSdkApi,
  ShapeDiverSdkApiResponseType,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { sendRequest } from "../utils/utils";
import {
  ShapeDiverRequestModelState,
  ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2";

export class ShapeDiverModelStateApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * Checks the existence of a Model-State.
   * @param modelStateId The ID of the Model-State.
   * @returns A boolean indicating whether the Model-State exists.
   */
  async exists(modelStateId: string): Promise<boolean> {
    return await sendRequest(async () => {
      try {
        const [_, status] = await this.api.head(
          this.buildModelStateUri(modelStateId),
          { disableAuthorization: true },
        );
        return status === 200;
      } catch (e) {
        // A 404 HTTP status is returned when the Model-State was not found.
        if (e instanceof ShapeDiverResponseError && e.status === 404)
          return false;
        else throw e;
      }
    });
  }

  /**
   * Get a Model-State.
   * @param modelStateId The ID of the Model-State.
   */
  async get(modelStateId: string): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            this.buildModelStateUri(modelStateId),
          )
        )[1],
    );
  }

  /**
   * Delete a Model-State.
   * @param modelStateId The ID of the Model-State.
   */
  async delete(modelStateId: string): Promise<void> {
    return await sendRequest(async () => {
      await this.api.delete(this.buildModelStateUri(modelStateId));
    });
  }

  /**
   * Get a Model-State's parameter and additional data.
   * @param modelStateId The ID of the Model-State.
   */
  async getData(modelStateId: string): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            `${this.buildModelStateUri(modelStateId)}/data`,
          )
        )[1],
    );
  }

  /**
   * Check if the Model-State has an image.
   * @param modelStateId The ID of the Model-State.
   * @returns A boolean indicating whether the Model-State has an image.
   */
  async hasImage(modelStateId: string): Promise<boolean> {
    return await sendRequest(async () => {
      try {
        const [_, status] = await this.api.head(
          `${this.buildModelStateUri(modelStateId)}/image`,
          { disableAuthorization: true },
        );
        return status === 200;
      } catch (e) {
        // A 404 HTTP status is returned when the Model-State image was not found.
        if (e instanceof ShapeDiverResponseError && e.status === 404)
          return false;
        else throw e;
      }
    });
  }

  /**
   * Downloads the Model-State image.
   * @param modelStateId The ID of the Model-State.
   * @returns Array of size 2: [0] = content data, [1] = content type.
   */
  async getImage(modelStateId: string): Promise<[ArrayBuffer, string]> {
    return await sendRequest(async () => {
      const [header, data] = await this.api.get<ArrayBuffer>(
        `${this.buildModelStateUri(modelStateId)}/image`,
        undefined,
        {
          responseType: ShapeDiverSdkApiResponseType.DATA,
          disableAuthorization: true,
        },
      );
      const contentType = header["Content-Type"] ?? header["content-type"];
      return [data, contentType];
    });
  }

  /**
   * List Model-States of a ShapeDiver model.
   * @param modelId The ID of the ShapeDiver model.
   * @param offset The offset to start the list from.
   */
  async list(modelId: string, offset?: string): Promise<ShapeDiverResponseDto> {
    // Build queries
    const queries: string[] = [];
    if (offset !== undefined) queries.push("offset=" + offset);

    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            `${this.buildModelStateUri()}/model/${modelId}/list`,
            queries,
          )
        )[1],
    );
  }

  /**
   * Create a new Model-State.
   * @param modelId The ID of the ShapeDiver model.
   * @param body The Model-State data.
   */
  async create(
    sessionId: string,
    body: ShapeDiverRequestModelState,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            `${this.buildSessionUri(sessionId)}/model-state`,
            undefined,
            body,
          )
        )[1],
    );
  }
}
