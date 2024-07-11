import fs from "fs";

// @ts-ignore
import { create, ShapeDiverSdk } from "../src";
// @ts-ignore
import { getTestJwt1, getTestSession1, getTestUrl } from "./testUtils";

let sdk: ShapeDiverSdk;

beforeEach(() => {
  sdk = create(getTestUrl(), getTestJwt1());
});

describe("file Api", () => {
  const sessionId = getTestSession1();

  it("request upload - upload - info - download - list - delete", async () => {
    const data = fs.readFileSync("test_data/Box.glb"),
      paramId = "9725bdec-f398-42db-8404-503e7713ed73",
      type = "image/gif",
      filename = "foo-ä€öü.jpg";

    /* REQUEST UPLOAD */
    let res = await sdk.file.requestUpload(sessionId, {
      [paramId]: {
        filename,
        format: type,
        size: data.length,
      },
    });
    expect(res).toBeDefined();
    expect(res.asset).toBeDefined();
    expect(res.asset!.file![paramId]).toBeDefined();
    expect(res.asset!.file![paramId].href).toBeDefined();
    expect(res.asset!.file![paramId].id).toBeDefined();
    expect(res.asset!.file![paramId].headers).toBeDefined();

    const fileId = res.asset!.file![paramId].id;

    /* UPLOAD */
    await sdk.utils.uploadAsset(
      res.asset!.file![paramId].href,
      data,
      res.asset!.file![paramId].headers,
    );

    /* INFO */
    const info = await sdk.file.info(sessionId, paramId, fileId);
    expect(info.filename).toBe(filename);
    expect(info.size).toBeGreaterThan(0);

    /* DOWNLOAD */
    const file = await sdk.file.get(sessionId, paramId, fileId);
    expect(file).toBeDefined();

    /* LIST */
    res = await sdk.file.list(sessionId, paramId);
    expect(res);
    expect(res.list).toBeDefined();
    expect(res.list!.file).toBeDefined();
    expect(res.list!.file!.length).toBeGreaterThanOrEqual(1);

    /* DELETE */
    await sdk.file.delete(sessionId, paramId, fileId);
  });
});
