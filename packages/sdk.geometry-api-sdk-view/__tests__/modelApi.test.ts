import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"

const modelId = "cc5d4dee-1ee2-4907-97cf-c3802858cf5b"

// @ts-ignore
const sessionId = global.sdSession1

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    // @ts-ignore
    sdk = create("", global.sdUrl)
})

describe("model Api", () => {

    it("default params", async () => {
        assert(sdk)
        const res = await sdk.model.defaultParams(sessionId, { "e1d10474-4690-4e7d-a269-110919becc19": "0" })
        expect(res).toBeDefined()
    })

    // TODO add configure-test when DTO-definitions have been specified

})
