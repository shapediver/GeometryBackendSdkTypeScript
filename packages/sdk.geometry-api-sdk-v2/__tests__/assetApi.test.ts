// @ts-ignore
import { create, ShapeDiverSdk } from "../src";
// @ts-ignore
import { getTestSession1, getTestUrl } from "./testUtils";

let sdk: ShapeDiverSdk;

beforeAll(() => {
  sdk = create(getTestUrl());
});

describe("asset Api", () => {
  const sessionId = getTestSession1();

  it.skip("get export", async () => {
    const res = await sdk.asset.getExport(sessionId, "");
    expect(res).toBeDefined();
  });

  it.skip("get output", async () => {
    const res = await sdk.asset.getOutput(sessionId, "");
    expect(res).toBeDefined();
  });

  it.skip("get sdTF JSON content", async () => {
    const res = await sdk.asset.getSdtfJsonContent(sessionId, "");
    expect(res).toBeDefined();
  });

  it.skip("get texture", async () => {
    const res = await sdk.asset.getTexture(sessionId, "");
    expect(res).toBeDefined();
  });

  it.skip("get gltf", async () => {
    const res = await sdk.asset.getGltf(sessionId, "");
    expect(res).toBeDefined();
  });

  it.skip("get usdz", async () => {
    const res = await sdk.asset.getUsdz(sessionId, "");
    expect(res).toBeDefined();
  });

  describe("download image", function () {
    let origGet: any;
    let spyUrl: string, spyQueries: string[] | undefined;

    beforeAll(() => {
      // @ts-ignore
      origGet = sdk.sdkApi.get;
      // @ts-ignore
      sdk.sdkApi.get = jest.fn(async (url, queries) => {
        spyUrl = url;
        spyQueries = queries;
        return [{}, {}];
      });
    });

    afterAll(() => {
      // @ts-ignore
      sdk.sdkApi.get = origGet;
    });

    beforeEach(() => {
      spyUrl = "";
    });

    it.each([
      [
        "api asset texture url",
        `https://no-cdn.shapediver.com/session/${sessionId}/texture/navbar_logo.png`,
      ],
      [
        "cdn asset texture url",
        "https://shapediver.com/cdn-asset-textures/navbar_logo.png",
      ],
      ["direct download viewer-url", "https://viewer.shapediver.com"],
      ["direct download texture-url", "http://textures.shapediver.com/foo"],
      ["direct download downloads-url", "downloads.shapediver.com/bar"],
    ])("%s; should call url", async (_, url) => {
      await sdk.asset.downloadImage(sessionId, url);
      expect(spyUrl).toBe(url);
      expect(spyQueries).toStrictEqual([]);
    });

    it("should call session-url", async () => {
      await sdk.asset.downloadImage(
        sessionId,
        "https://sduse1-assets.shapediver.com/production/assets/img/navbar_logo.png",
      );
      expect(spyUrl).toMatch(new RegExp(`/session/${sessionId}/image`));
      expect(spyQueries).toHaveLength(1);
      expect(spyQueries![0]).toMatch(/url=.+/);
    });
  });

  it.skip("getAsset", async () => {
    await sdk.asset.getAsset(""); // TODO implement
  });
});
