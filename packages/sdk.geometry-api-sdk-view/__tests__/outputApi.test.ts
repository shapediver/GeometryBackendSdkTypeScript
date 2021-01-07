import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"

// @ts-ignore
const sessionId = global.sdSession1

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    // @ts-ignore
    sdk = create("", global.sdUrl)
})

describe("output Api", () => {

    it("customize", async () => {
        assert(sdk)
        const res = await sdk.output.customize(sessionId, {
            "c8a7f451-d1ea-472a-9910-e6aa290f5d16": "false",
        })
        expect(res.version).toBeDefined()
        expect(res.actions).toBeDefined()
        expect(res.outputs).toBeDefined()
        assert(res.outputs)
        expect(res.outputs["e94ea0575e44c0f952bf44f7c04c83e2"]).toBeDefined()
        expect(res.outputs["d6823c7f67b6384f665400ea36eaa3e9"]).toBeDefined()
        expect(res.templates).toBeDefined()
    })

    it("cache", async () => {
        assert(sdk)
        const res = await sdk.output.getCache(sessionId, {
            "d6823c7f67b6384f665400ea36eaa3e9": "43c544427745122aae228e0009e4c332",
        })
        expect(res.version).toBeDefined()
        expect(res.actions).toBeDefined()
        expect(res.outputs).toBeDefined()
        assert(res.outputs)
        expect(res.outputs["d6823c7f67b6384f665400ea36eaa3e9"]).toBeDefined()
        expect(res.templates).toBeDefined()
    })

})
