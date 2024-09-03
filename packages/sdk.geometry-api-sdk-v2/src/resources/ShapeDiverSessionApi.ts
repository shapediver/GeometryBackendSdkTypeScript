import {
  ShapeDiverRequestCustomization,
  ShapeDiverRequestExport,
  ShapeDiverRequestTicket,
  ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2";
import {
  BaseResourceApi,
  ShapeDiverSdkApi,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { sendRequest } from "../utils/utils";

export class ShapeDiverSessionApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * Create a new ticket that allows to initialize new sessions for the
   * specified model.
   *
   * @param modelId
   * @param body
   */
  async ticket(
    modelId: string,
    body: ShapeDiverRequestTicket,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/ticket",
            undefined,
            body,
          )
        )[1],
    );
  }

  /**
   * Create a new session for a ShapeDiver Model via a ticket.
   *
   * @param ticket
   * @param request - Optional customization or export request.
   * @param modelStateId - ID of the Model-State to apply.
   * @param strictValidation - When `false`, any Model-State parameter that cannot be applied to the
   * model is ignored. However, when set to `true`, any validation error will result in an error
   * response.
   */
  async init(
    ticket: string,
    request?: ShapeDiverRequestCustomization | ShapeDiverRequestExport,
    modelStateId?: string,
    strictValidation?: boolean,
  ): Promise<ShapeDiverResponseDto> {
    // Build queries
    const queries: string[] = [];
    if (modelStateId !== undefined)
      queries.push("modelStateId=" + modelStateId);
    if (strictValidation !== undefined)
      queries.push("strictValidation=" + strictValidation);

    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildTicketUri(ticket),
            queries,
            request,
          )
        )[1],
    );
  }

  /**
   * Create a new session for a ShapeDiver Model.
   *
   * @param ticket
   * @param request - Optional customization or export request.
   * @param modelStateId - ID of the Model-State to apply.
   * @param strictValidation - When `false`, any Model-State parameter that cannot be applied to the
   * model is ignored. However, when set to `true`, any validation error will result in an error
   * response.
   */
  async initForModel(
    modelId: string,
    request?: ShapeDiverRequestCustomization | ShapeDiverRequestExport,
    modelStateId?: string,
    strictValidation?: boolean,
  ): Promise<ShapeDiverResponseDto> {
    // Build queries
    const queries: string[] = [];
    if (modelStateId !== undefined)
      queries.push("modelStateId=" + modelStateId);
    if (strictValidation !== undefined)
      queries.push("strictValidation=" + strictValidation);

    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/session",
            queries,
            request,
          )
        )[1],
    );
  }

  /**
   * Get the full description of a ShapeDiver Model.
   *
   * @param sessionId
   */
  async default(sessionId: string): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            this.buildSessionUri(sessionId) + "/default",
          )
        )[1],
    );
  }

  /**
   * Close the specified session.
   *
   * @param sessionId
   */
  async close(sessionId: string): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildSessionUri(sessionId) + "/close",
          )
        )[1],
    );
  }
}
