// @ts-ignore
import { SdkConfigInternal, ShapeDiverSdkConfigType } from "../src/config/ShapeDiverSdkConfig"

describe("setConfigValue", function () {

    let config: SdkConfigInternal | undefined

    beforeEach(() => {
        config = new SdkConfigInternal("")
    })

    test("base url", () => {
        config!.setConfigValue(ShapeDiverSdkConfigType.BASE_URL, "foobar")
        expect(config!.baseUrl).toBe("foobar")
    })

    test("jwt token - valid", () => {
        config!.setConfigValue(ShapeDiverSdkConfigType.JWT_TOKEN, "foobar")
        expect(config!.jwt).toBe("foobar")
    })

    test("request headers - valid", () => {
        config!.setConfigValue(ShapeDiverSdkConfigType.REQUEST_HEADERS, { a: "foobar" })
        expect(config!.headers).toStrictEqual({ a: "foobar" })
    })

})

describe("validateValue", function () {

    test("string - valid", () => {
        SdkConfigInternal.validateValue(ShapeDiverSdkConfigType.BASE_URL, "foobar", "string")
    })

    test("string - invalid", () => {
        expect(() => SdkConfigInternal.validateValue(ShapeDiverSdkConfigType.BASE_URL, {}, "string")).toThrowError()
    })

    test("string map - valid", () => {
        SdkConfigInternal.validateValue(ShapeDiverSdkConfigType.REQUEST_HEADERS, {
            a: "foo",
            b: "666",
            c: "false",
        }, "string_map")
    })

    test("string keyed object - invalid", () => {
        expect(() => SdkConfigInternal.validateValue(ShapeDiverSdkConfigType.BASE_URL, {
            a: () => "",
            b: [ "foo", "bar" ],
        }, "string_map")).toThrowError()
    })

})
