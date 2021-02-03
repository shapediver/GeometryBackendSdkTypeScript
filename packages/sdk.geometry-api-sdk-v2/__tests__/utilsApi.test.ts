import { beforeEach, describe } from "@jest/globals"
import { ShapeDiverRequestLogMessageLevel } from "@shapediver/api.geometry-api-dto-v2"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"

// @ts-ignore
const sessionId = global.sdSession1

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    // @ts-ignore
    sdk = create(global.sdUrl)
})

describe("utils Api", () => {

    it("log", async () => {
        assert(sdk)
        const res = await sdk.utils.log(sessionId, {
            level: ShapeDiverRequestLogMessageLevel.INFO,
            message: "Integration test log message"
        })
        expect(res).toBeDefined()
    })

})
