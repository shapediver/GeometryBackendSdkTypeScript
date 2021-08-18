import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
import { getTestJwt1, getTestModel1, getTestSession1, getTestUrl } from "./utils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl(), getTestJwt1())
})

describe("output Api", () => {

    const sessionId = getTestSession1()
    const modelId = getTestModel1()

    it("customize", async () => {
        assert(sdk)
        const res = await sdk.output.customize(sessionId, {
            "c8a7f451-d1ea-472a-9910-e6aa290f5d16": "false",
        })
        expect(res).toBeDefined()
    })

    it("cache", async () => {
        assert(sdk)
        const res = await sdk.output.getCache(sessionId, {
            "d6823c7f67b6384f665400ea36eaa3e9": "43c544427745122aae228e0009e4c332",
        })
        expect(res).toBeDefined()
    })

    it("definitions", async () => {
        assert(sdk)
        const res = await sdk.output.updateDefinitions(modelId, {
            "d6823c7f67b6384f665400ea36eaa3e9": {
                displayname: "",
                hidden: false,
                order: 1,
            },
        })
        expect(res).toBeDefined()
    })

})
