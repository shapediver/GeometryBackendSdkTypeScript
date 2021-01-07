import { beforeEach, describe } from "@jest/globals"
import { ShapeDiverViewRequestSdtfUploadPartType } from "@shapediver/api.geometry-api-dto-view"
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

describe("sdtf Api", () => {

    // NOTE activate when dedicated test model is in use
    it.skip("upload", async () => {
        assert(sdk)
        const res = await sdk.sdtf.upload(sessionId, [
            {
                "content-length": 123,
                "content-type": ShapeDiverViewRequestSdtfUploadPartType.MODEL_SDTF,
                namespace: "foobar",
            },
        ])
        // TODO check response object
        expect(res).toBeDefined()
    })

})
