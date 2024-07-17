import {
  ShapeDiverError as ShapeDiverErrorCore,
  ShapeDiverRequestError as ShapeDiverRequestErrorCore,
  ShapeDiverResponseError as ShapeDiverResponseErrorCore,
} from "@shapediver/sdk.geometry-api-sdk-core";
import {
  ShapeDiverResponseError,
  isGBError,
  isGBGenericError,
  isGBRequestError,
  isGBResponseError,
} from "..";

// @ts-ignore
import {
  contentDispositionFromFilename,
  filenameFromContentDisposition,
  sendRequest,
} from "../src/utils/utils";

describe("isGBError", () => {
  test.each([
    ["ShapeDiverErrorCore", new ShapeDiverErrorCore("")],
    ["ShapeDiverRequestErrorCore", new ShapeDiverRequestErrorCore("", "")],
    [
      "ShapeDiverResponseErrorCore",
      new ShapeDiverResponseErrorCore("", -1, "", "", {}),
    ],
    [
      "ShapeDiverResponseError",
      new ShapeDiverResponseError(
        new ShapeDiverResponseErrorCore("", -1, "", "", {}),
      ),
    ],
  ])("%s; should be truthy", (_, error) => {
    expect(isGBError(error)).toBeTruthy();
  });

  test.each([
    ["object", { message: "" }],
    ["JS-error", new Error("")],
  ])("should be falsy", (_, error) => {
    expect(isGBError(error)).toBeFalsy();
  });
});

describe("isGBGenericError", () => {
  test.each([["ShapeDiverErrorCore", new ShapeDiverErrorCore("")]])(
    "%s; should be truthy",
    (_, error) => {
      expect(isGBGenericError(error)).toBeTruthy();
    },
  );

  test.each([
    ["object", { message: "" }],
    ["JS-error", new Error("")],
    ["ShapeDiverRequestErrorCore", new ShapeDiverRequestErrorCore("", "")],
    [
      "ShapeDiverResponseErrorCore",
      new ShapeDiverResponseErrorCore("", -1, "", "", {}),
    ],
    [
      "ShapeDiverResponseError",
      new ShapeDiverResponseError(
        new ShapeDiverResponseErrorCore("", -1, "", "", {}),
      ),
    ],
  ])("%s; should be falsy", (_, error) => {
    expect(isGBGenericError(error)).toBeFalsy();
  });
});

describe("isGBRequestError", () => {
  test.each([
    ["ShapeDiverRequestErrorCore", new ShapeDiverRequestErrorCore("", "")],
  ])("%s; should be truthy", (_, error) => {
    expect(isGBRequestError(error)).toBeTruthy();
  });

  test.each([
    ["object", { message: "" }],
    ["JS-error", new Error("")],
    ["ShapeDiverErrorCore", new ShapeDiverErrorCore("")],
    [
      "ShapeDiverResponseErrorCore",
      new ShapeDiverResponseErrorCore("", -1, "", "", {}),
    ],
    [
      "ShapeDiverResponseError",
      new ShapeDiverResponseError(
        new ShapeDiverResponseErrorCore("", -1, "", "", {}),
      ),
    ],
  ])("%s; should be falsy", (_, error) => {
    expect(isGBRequestError(error)).toBeFalsy();
  });
});

describe("isGBResponseError", () => {
  test.each([
    [
      "ShapeDiverResponseErrorCore",
      new ShapeDiverResponseErrorCore("", -1, "", "", {}),
    ],
    [
      "ShapeDiverResponseError",
      new ShapeDiverResponseError(
        new ShapeDiverResponseErrorCore("", -1, "", "", {}),
      ),
    ],
  ])("%s; should be truthy", (_, error) => {
    expect(isGBResponseError(error)).toBeTruthy();
  });

  test.each([
    ["object", { message: "" }],
    ["JS-error", new Error("")],
    ["ShapeDiverErrorCore", new ShapeDiverErrorCore("")],
    ["ShapeDiverRequestErrorCore", new ShapeDiverRequestErrorCore("", "")],
  ])("%s; should be falsy", (_, error) => {
    expect(isGBResponseError(error)).toBeFalsy();
  });
});

describe("sendRequest", () => {
  let spyCall: number;
  let call = (e?: Error): Promise<string> => {
    spyCall++;
    if (e) throw e;
    else return Promise.resolve("foobar");
  };

  beforeEach(() => {
    spyCall = 0;
  });

  test("success; should return data", async () => {
    expect(await sendRequest(call.bind(null))).toBe("foobar");
    expect(spyCall).toBe(1);
  });

  test("unmanaged error; should throw", async () => {
    await expect(
      async () =>
        await sendRequest(call.bind(null, new Error("intended error"))),
    ).rejects.toThrow();

    expect(spyCall).toBe(1);
  });

  test("managed error - 429; should throw", async () => {
    await expect(
      async () =>
        await sendRequest(
          call.bind(
            null,
            new ShapeDiverResponseErrorCore("", 429, "", "", {
              "retry-after": 1,
            }),
          ),
        ),
    ).rejects.toThrow();

    expect(spyCall).toBe(5);
  });

  test("managed error - 502; should throw", async () => {
    await expect(
      async () =>
        await sendRequest(
          call.bind(
            null,
            new ShapeDiverResponseErrorCore("", 502, "", "", {
              "retry-after": 1,
            }),
          ),
        ),
    ).rejects.toThrow();

    expect(spyCall).toBe(5);
  });
});

describe("contentDispositionFromFilename", function () {
  test("ascii characters", () => {
    expect(contentDispositionFromFilename("foobar.txt")).toBe(
      'attachment; filename="foobar.txt"',
    );
  });

  test("non-ascii characters", () => {
    expect(contentDispositionFromFilename("ä€öü.jpg")).toBe(
      "attachment; filename=\"aou.jpg\"; filename*=UTF-8''a%CC%88%E2%82%ACo%CC%88u%CC%88.jpg",
    );
  });
});

describe("filenameFromContentDisposition", function () {
  test("invalid format; should return undefined", () => {
    expect(
      filenameFromContentDisposition('attachment; something="else"'),
    ).toBeUndefined();
  });

  test("ascii_characters", () => {
    expect(
      filenameFromContentDisposition('attachment; filename="foobar.txt"'),
    ).toBe("foobar.txt");
  });

  test("non_ascii_characters, with encoding", () => {
    expect(
      filenameFromContentDisposition(
        "attachment; filename=\"aou.jpg\"; filename*=UTF-8''a%CC%88%E2%82%ACo%CC%88u%CC%88.jpg",
      ),
    ).toBe("ä€öü.jpg");
  });

  test("non_ascii_characters, without encoding", () => {
    expect(
      filenameFromContentDisposition(
        'attachment; filename="aou.jpg"; filename*=a%CC%88%E2%82%ACo%CC%88u%CC%88.jpg',
      ),
    ).toBe("ä€öü.jpg");
  });
});
