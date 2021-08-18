import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
import { getTestSession1, getTestUrl } from "./utils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl())
})

describe("file Api", () => {

    const sessionId = getTestSession1()

    // NOTE activate when dedicated test model is in use
    it.skip("upload", async () => {
        assert(sdk)
        const res = await sdk.file.upload(sessionId, {
            "795ac629-a574-47dc-816f-6906f5a13376": {
                "format": "image/gif",
                "size": 123,
            },
        })
        // TODO check response object
        expect(res).toBeDefined()
    })

})
