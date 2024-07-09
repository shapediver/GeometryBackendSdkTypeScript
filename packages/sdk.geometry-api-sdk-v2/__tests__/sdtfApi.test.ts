import { ShapeDiverRequestSdtfUploadPartType } from "@shapediver/api.geometry-api-dto-v2";
import fs from "fs";

// @ts-ignore
import { create, ShapeDiverSdk } from "../src";
// @ts-ignore
import { getTestJwt1, getTestSession1, getTestUrl } from "./testUtils";

let sdk: ShapeDiverSdk;

beforeEach(() => {
  sdk = create(getTestUrl(), getTestJwt1());
});

describe("sdtf Api", () => {
  const sessionId = getTestSession1();
  const namespace = "pub";

  it("request upload - upload - download - list - delete", async () => {
    const data = fs.readFileSync("test_data/Box.glb");

    /* REQUEST UPLOAD */
    let res = await sdk.sdtf.requestUpload(sessionId, [
      {
        content_length: data.length,
        content_type: ShapeDiverRequestSdtfUploadPartType.MODEL_SDTF,
        namespace: namespace,
      },
    ]);
    expect(res).toBeDefined();
    expect(res.asset).toBeDefined();
    expect(res.asset!.sdtf).toBeDefined();
    expect(res.asset!.sdtf!.length).toBe(1);
    expect(res.asset!.sdtf![0].href).toBeDefined();
    expect(res.asset!.sdtf![0].id).toBeDefined();

    const sdtfId = res.asset!.sdtf![0].id;

    /* UPLOAD */
    await sdk.utils.upload(
      res.asset!.sdtf![0].href,
      data,
      ShapeDiverRequestSdtfUploadPartType.MODEL_SDTF,
    );

    /* DOWNLOAD */
    const sdtf = await sdk.sdtf.get(sessionId, sdtfId);
    expect(sdtf).toBeDefined();

    /* LIST */
    res = await sdk.sdtf.list(sessionId, namespace);
    expect(res);
    expect(res.list).toBeDefined();
    expect(res.list!.sdtf).toBeDefined();
    expect(res.list!.sdtf!.length).toBeGreaterThanOrEqual(1);

    /* DELETE */
    await sdk.sdtf.delete(sessionId, sdtfId);
  });
});
