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

describe("file Api", () => {

    // NOTE activate when dedicated test model is in use
    it.skip("upload", async () => {
        assert(sdk)
        const res = await sdk.file.upload(sessionId, {
            "795ac629-a574-47dc-816f-6906f5a13376": {
                "format": "image/gif",
                "size": 123
            }
        })
        // TODO check response object
        expect(res).toBeDefined()
    })

})
