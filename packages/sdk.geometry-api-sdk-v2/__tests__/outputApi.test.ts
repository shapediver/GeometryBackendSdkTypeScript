import { beforeEach, describe } from "@jest/globals"

// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
// @ts-ignore
import { getTestJwt1, getTestModel1, getTestSession1, getTestUrl } from "./testUtils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl(), getTestJwt1())
})

describe("output Api", () => {

    const sessionId = getTestSession1()
    const modelId = getTestModel1()

    it("customize", async () => {
        const res = await sdk.output.customize(sessionId, {
            "ca9e5bee-a935-47e8-8854-1203a6651ee0": "false",
        })
        expect(res).toBeDefined()
    })

    it("cache", async () => {
        const res = await sdk.output.getCache(sessionId, {
            "563ce4255d30c83e8736083ba4f1bfa4": "0f2cf6388edfed3d091b3ed0051611dc",
        })
        expect(res).toBeDefined()
    })

    it("definitions", async () => {
        const res = await sdk.output.updateDefinitions(modelId, {
            "563ce4255d30c83e8736083ba4f1bfa4": {
                displayname: "Some awesome name",
                hidden: false,
                order: 1,
                tooltip: "Some helpful note"
            },
        })
        expect(res).toBeDefined()
    })

})
