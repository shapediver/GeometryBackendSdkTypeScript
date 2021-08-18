import { beforeEach, describe } from "@jest/globals"
import { ShapeDiverRequestLogMessageLevel } from "@shapediver/api.geometry-api-dto-v2"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
import { getTestSession1, getTestUrl } from "./utils"

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    sdk = create(getTestUrl())
})

describe("utils Api", () => {

    const sessionId = getTestSession1()

    it("log", async () => {
        assert(sdk)
        const res = await sdk.utils.log(sessionId, {
            level: ShapeDiverRequestLogMessageLevel.INFO,
            message: "Integration test log message",
        })
        expect(res).toBeDefined()
    })

})
