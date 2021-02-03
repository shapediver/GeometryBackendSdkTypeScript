import { beforeEach, describe } from "@jest/globals"
import { ShapeDiverRequestSdtfUploadPartType } from "@shapediver/api.geometry-api-dto-v2"
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

describe("sdtf Api", () => {

    // NOTE activate when dedicated test model is in use
    it.skip("upload", async () => {
        assert(sdk)
        const res = await sdk.sdtf.upload(sessionId, [
            {
                "content_length": 123,
                "content_type": ShapeDiverRequestSdtfUploadPartType.MODEL_SDTF,
                namespace: "foobar",
            },
        ])
        expect(res).toBeDefined()
    })

})
