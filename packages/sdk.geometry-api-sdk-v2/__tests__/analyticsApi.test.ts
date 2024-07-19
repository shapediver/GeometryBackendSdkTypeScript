// @ts-ignore
import { create } from "../src";
// @ts-ignore
import {
  getTestJwt1,
  getTestJwtBackend,
  getTestModel1,
  getTestUrl,
} from "./testUtils";

describe("analytics Api", () => {
  it("model session statistics", async () => {
    const sdk = create(getTestUrl(), getTestJwt1());
    const res = await sdk.analytics.modelSessionStatistics({
      parameters: [
        {
          modelid: getTestModel1(),
          timestamp: "202101",
        },
        {
          modelid: getTestModel1(),
          timestamp: ["202112", "202101"],
        },
        {
          modelid: getTestModel1(),
          timestamp_from: "202012",
          timestamp_to: "202101",
        },
      ],
    });
    expect(res).toBeDefined();
    expect(res.analytics).toBeDefined();
    expect(res.analytics!.models.length).toBe(3);
  });

  it("credit metrics", async () => {
    const sdk = create(getTestUrl(), getTestJwt1());
    const res = await sdk.analytics.creditMetrics({
      parameters: [
        {
          id: { modelIds: [getTestModel1()] },
          timestamp: "2024",
        },
        {
          id: { modelIds: [getTestModel1()] },
          timestamp: "2025",
        },
      ],
    });
    expect(res).toBeDefined();
    expect(res.analytics?.creditMetrics.length).toBeGreaterThan(0);
  });

  it("user credit metrics", async () => {
    const sdk = create(getTestUrl(), getTestJwtBackend());
    const res = await sdk.analytics.userCreditMetrics("202406");
    expect(res).toBeDefined();
    expect(res.analytics?.creditMetrics.length).toBeGreaterThan(0);
  });

  it("org credit metrics", async () => {
    const sdk = create(getTestUrl(), getTestJwtBackend());
    const res = await sdk.analytics.organizationCreditMetrics("202406");
    expect(res).toBeDefined();
    expect(res.analytics?.creditMetrics.length).toBeGreaterThan(0);
  });

  it("model-user credit metrics", async () => {
    const userId = "92a8410b-6496-4b86-8c3f-1014d59f7fa3";

    const sdk = create(getTestUrl(), getTestJwtBackend());
    const res = await sdk.analytics.modelUserCreditMetrics(userId, "202407");
    expect(res).toBeDefined();
    expect(res.analytics?.creditMetrics.length).toBeGreaterThan(0);
  });

  it("model-org credit metrics", async () => {
    const orgId = "a785380e-183d-11ef-926a-f3f7d2b9f407";

    const sdk = create(getTestUrl(), getTestJwtBackend());
    const res = await sdk.analytics.modelOrganizationCreditMetrics(
      orgId,
      "202407",
    );
    expect(res).toBeDefined();
    expect(res.analytics?.creditMetrics.length).toBeGreaterThan(0);
  });
});
