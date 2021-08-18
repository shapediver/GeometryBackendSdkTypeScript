import { beforeEach, describe } from "@jest/globals"
import { ShapeDiverRequestSdtfUploadPartType } from "@shapediver/api.geometry-api-dto-v2"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
import { getTestSession1, getTestUrl } from "./utils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl())
})

describe("sdtf Api", () => {

    const sessionId = getTestSession1()

    // NOTE activate when dedicated test model is in use
    it.skip("upload", async () => {
        assert(sdk)
        const res = await sdk.sdtf.upload(sessionId, [
            {
                "content_length": 123,
                "content_type": ShapeDiverRequestSdtfUploadPartType.MODEL_SDTF,
                "namespace": "foobar",
            },
        ])
        expect(res).toBeDefined()
    })

})
