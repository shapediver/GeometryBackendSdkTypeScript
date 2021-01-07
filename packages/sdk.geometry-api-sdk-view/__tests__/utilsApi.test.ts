import { beforeEach, describe } from "@jest/globals"
import { ShapeDiverViewRequestLogMessageLevel } from "@shapediver/api.geometry-api-dto-view"
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

describe("utils Api", () => {

    it("log", async () => {
        assert(sdk)
        const res = await sdk.utils.log(sessionId, {
            level: ShapeDiverViewRequestLogMessageLevel.INFO,
            message: "Integration test log message"
        })
        expect(res).toBeDefined()
    })

})
