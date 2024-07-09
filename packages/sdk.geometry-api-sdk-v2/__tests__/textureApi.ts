// @ts-ignore
import { create, ShapeDiverSdk } from "../src";
// @ts-ignore
import {
  getTestJwt1,
  getTestModel1,
  getTestSession1,
  getTestUrl,
} from "./testUtils";

let sdk: ShapeDiverSdk;

beforeEach(() => {
  sdk = create(getTestUrl(), getTestJwt1());
});

describe("texture Api", () => {
  const sessionId = getTestSession1();

  test("list model textures", async () => {
    const res = await sdk.texture.listModelTextures(sessionId);
    expect(res).toBeDefined();
    expect(res.texture).toBeDefined();
    expect(res.pagination).toBeDefined();
  });
});
