import { ShapeDiverSdkApi } from "..";

export abstract class BaseResourceApi {
  protected readonly commonPath: string = "/api/v2";
  protected readonly api: ShapeDiverSdkApi;

  protected constructor(api: ShapeDiverSdkApi) {
    this.api = api;
  }

  /**
   * Create the URI for analytics-based controller endpoints.
   *
   * @protected
   */
  protected buildAnalyticsUri(): string {
    return `${this.commonPath}/analytics`;
  }

  /**
   * Create the URI for AR-scene-based controller endpoints.
   *
   * @protected
   */
  protected buildArSceneUri(): string {
    return `${this.commonPath}/ar-scene`;
  }

  /**
   * Create the URI for auth_group-based controller endpoints.
   *
   * @protected
   */
  protected buildAuthGroupUri(): string {
    return `${this.commonPath}/auth_group`;
  }

  /**
   * Create the URI for ticket-based controller endpoints.
   *
   * @param ticketId
   * @protected
   */
  protected buildTicketUri(ticketId: string): string {
    return `${this.commonPath}/ticket/${ticketId}`;
  }

  /**
   * Create the URI for session-based controller endpoints.
   *
   * @param sessionId
   * @protected
   */
  protected buildSessionUri(sessionId: string): string {
    return `${this.commonPath}/session/${sessionId}`;
  }

  /**
   * Create the URI for model-based controller endpoints.
   *
   * @param modelId
   * @protected
   */
  protected buildModelUri(modelId: string): string {
    return `${this.commonPath}/model/${modelId}`;
  }

  /**
   * Create the URI for model-state-based controller endpoints.
   *
   * @param modelStateId
   * @protected
   */
  protected buildModelStateUri(modelStateId?: string): string {
    const base = `${this.commonPath}/model-state`;
    return modelStateId ? base + `/${modelStateId}` : base;
  }

  /**
   * Create the URI for system-based controller endpoints.
   *
   * @protected
   */
  protected buildSystemUri(): string {
    return `${this.commonPath}/system`;
  }
}
