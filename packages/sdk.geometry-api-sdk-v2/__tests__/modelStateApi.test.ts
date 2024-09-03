// @ts-ignore
import { create, ShapeDiverSdk } from "../src";
// @ts-ignore
import { getTestSession1, getTestUrl } from "./testUtils";
import fs from "fs";

let sdk: ShapeDiverSdk;

beforeEach(() => {
  sdk = create(getTestUrl());
});

describe("model-state Api", () => {
  const sessionId = getTestSession1();

  it("simple model-state", async () => {
    const reqCreate = {
      parameters: {
        "a23b0838-d8e2-4f69-b650-3320a2caa0d5": "1",
        "505a9a2a-4359-4a71-8120-dc763c95aab9": "2",
      },
      data: { foo: "bar" },
    };
    const resCreate = await sdk.modelState.create(sessionId, reqCreate);
    expect(resCreate.modelState?.id).toBeDefined();
    expect(resCreate.asset).toBeUndefined();

    expect(await sdk.modelState.exists(resCreate.modelState!.id!)).toBeTruthy();
    expect(
      await sdk.modelState.hasImage(resCreate.modelState!.id!),
    ).toBeFalsy();

    const resGet = await sdk.modelState.get(resCreate.modelState!.id!);
    expect(resGet?.modelState?.id).toStrictEqual(resCreate.modelState?.id);
    expect(resGet?.modelState?.parameters).toStrictEqual(reqCreate.parameters);
    expect(resGet?.modelState?.data).toStrictEqual(reqCreate.data);
    expect(resGet?.modelState?.imageUrl).toBeUndefined();

    const resGetData = await sdk.modelState.getData(resCreate.modelState!.id!);
    expect(resGetData?.modelState?.parameters).toStrictEqual(
      reqCreate.parameters,
    );
    expect(resGetData?.modelState?.data).toStrictEqual(reqCreate.data);
  });

  it("model-state with image", async () => {
    const image = fs.readFileSync("test_data/logo.jpg");
    const reqCreate = {
      parameters: { "a23b0838-d8e2-4f69-b650-3320a2caa0d5": "1" },
      data: { foo: "bar" },
      image: {
        filename: "ShapeDiver Logo",
        format: "image/jpeg",
        size: image.byteLength,
      },
    };
    const resCreate = await sdk.modelState.create(sessionId, reqCreate);
    expect(resCreate.modelState?.id).toBeDefined();
    expect(resCreate.asset?.modelState).toBeDefined();

    await sdk.utils.uploadAsset(
      resCreate.asset!.modelState!.href,
      image,
      resCreate.asset!.modelState!.headers,
    );

    expect(await sdk.modelState.exists(resCreate.modelState!.id!)).toBeTruthy();
    expect(
      await sdk.modelState.hasImage(resCreate.modelState!.id!),
    ).toBeTruthy();
    const [data, content] = await sdk.modelState.getImage(
      resCreate.modelState!.id!,
    );
    expect(data).toBeDefined();
    expect(content).toBeDefined();

    const resGet = await sdk.modelState.get(resCreate.modelState!.id!);
    expect(resGet?.modelState?.id).toStrictEqual(resCreate.modelState?.id);
    expect(resGet?.modelState?.parameters).toStrictEqual(reqCreate.parameters);
    expect(resGet?.modelState?.data).toStrictEqual(reqCreate.data);
    expect(resGet?.modelState?.imageUrl).toBeDefined();

    // TODO: delete model-state
  });
});
