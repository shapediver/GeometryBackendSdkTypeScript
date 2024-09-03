import {
  ShapeDiverRequestAnalyticsCreditMetrics,
  ShapeDiverRequestAnalyticsModel,
  ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2";
import {
  BaseResourceApi,
  ShapeDiverSdkApi,
} from "@shapediver/sdk.geometry-api-sdk-core";
import { sendRequest } from "../utils/utils";

export class ShapeDiverAnalyticsApi extends BaseResourceApi {
  constructor(api: ShapeDiverSdkApi) {
    super(api);
  }

  /**
   * Get model session analytics.
   *
   * @param body
   */
  async modelSessionStatistics(
    body: ShapeDiverRequestAnalyticsModel,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.put<ShapeDiverResponseDto>(
            this.buildAnalyticsUri() + "/session/model",
            undefined,
            body,
          )
        )[1],
    );
  }

  /** Get credit metrics. */
  async creditMetrics(
    body: ShapeDiverRequestAnalyticsCreditMetrics,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.put<ShapeDiverResponseDto>(
            this.buildAnalyticsUri() + "/credit-metrics",
            undefined,
            body,
          )
        )[1],
    );
  }

  /** Get credit metrics of all users active at timestamp. */
  async userCreditMetrics(timestamp: string): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            `${this.buildAnalyticsUri()}/credit-metrics/timestamp/${timestamp}/user`,
          )
        )[1],
    );
  }

  /** Get credit metrics of all organizations with users active at timestamp. */
  async organizationCreditMetrics(
    timestamp: string,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            `${this.buildAnalyticsUri()}/credit-metrics/timestamp/${timestamp}/org`,
          )
        )[1],
    );
  }

  /** Get model credit metrics of the user at timestamp. */
  async modelUserCreditMetrics(
    userId: string,
    timestamp: string,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            `${this.buildAnalyticsUri()}/credit-metrics/timestamp/${timestamp}/user/${userId}`,
          )
        )[1],
    );
  }

  /** Get model credit metrics of the organization at timestamp. */
  async modelOrganizationCreditMetrics(
    orgId: string,
    timestamp: string,
  ): Promise<ShapeDiverResponseDto> {
    return await sendRequest(
      async () =>
        (
          await this.api.get<ShapeDiverResponseDto>(
            `${this.buildAnalyticsUri()}/credit-metrics/timestamp/${timestamp}/org/${orgId}`,
          )
        )[1],
    );
  }
}
