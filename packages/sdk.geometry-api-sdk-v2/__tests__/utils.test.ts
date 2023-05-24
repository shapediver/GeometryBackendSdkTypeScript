import { ShapeDiverResponseError } from "@shapediver/sdk.geometry-api-sdk-core"

// @ts-ignore
import { sendRequest } from "../src/utils/utils"

describe("utils - sendRequest", () => {

    let spyCall: number
    let call = (e?: Error): Promise<string> => {
        spyCall++
        if (e) throw e
        else return Promise.resolve("foobar")
    }

    beforeEach(() => {
        spyCall = 0
    })

    test("success; should return data", async () => {
        expect(await sendRequest(call.bind(null))).toBe("foobar")
        expect(spyCall).toBe(1)
    })

    test("unmanaged error; should throw", async () => {
        await expect(async () => await sendRequest(call.bind(null, new Error("intended error"))))
            .rejects
            .toThrow()
        expect(spyCall).toBe(1)
    })

    test("managed error - 429; should throw", async () => {
        await expect(async () => await sendRequest(call.bind(null, new ShapeDiverResponseError("", 429, "", "", { "retry-after": 1 }))))
            .rejects
            .toThrow()
        expect(spyCall).toBe(5)
    })

    test("managed error - 502; should throw", async () => {
        await expect(async () => await sendRequest(call.bind(null, new ShapeDiverResponseError("", 502, "", "", { "retry-after": 1 }))))
            .rejects
            .toThrow()
        expect(spyCall).toBe(5)
    })

})
