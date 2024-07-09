// @ts-ignore
import { create, ShapeDiverSdk } from "../src";
// @ts-ignore
import { getTestJwt1, getTestModel1, getTestUrl } from "./testUtils";

let sdk: ShapeDiverSdk;

beforeEach(() => {
  sdk = create(getTestUrl(), getTestJwt1());
});

describe("analytics Api", () => {
  it("model session statistics", async () => {
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
});
