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
   */
  async init(
    ticket: string,
    request?: ShapeDiverRequestCustomization | ShapeDiverRequestExport,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildTicketUri(ticket),
            undefined,
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
   */
  async initForModel(
    modelId: string,
    request?: ShapeDiverRequestCustomization | ShapeDiverRequestExport,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.post<ShapeDiverResponseDto>(
            this.buildModelUri(modelId) + "/session",
            undefined,
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
