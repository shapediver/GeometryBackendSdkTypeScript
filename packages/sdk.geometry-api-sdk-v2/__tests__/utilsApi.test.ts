import { beforeEach, describe } from "@jest/globals"
import fs from "fs"

// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
// @ts-ignore
import { getTestSession1, getTestUrl } from "./utils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl())
})

describe("utils Api", () => {

    const sessionId = getTestSession1()

    // We skip this because this function is used in other tests as well
    test.skip("upload", async () => {
        const paramId = "9725bdec-f398-42db-8404-503e7713ed73"
        const data = await fs.readFileSync("test_data/Box.glb")
        const type = "image/gif"

        // Request s3 file upload
        const res = await sdk.file.requestUpload(sessionId, {
            [paramId]: {
                "format": type,
                "size": data.length,
            },
        })

        const url = res.asset!.file![paramId].href
        expect(url)

        // Upload file
        await sdk.utils.upload(url, data, type)
    })

    // NOTE this throws when tested against a locally running system
    test.skip("submitAndWaitForCustomization, limit reached; should throw", async () => {
        await sdk.utils.submitAndWaitForCustomization(
            sdk,
            sessionId,
            { "ca9e5bee-a935-47e8-8854-1203a6651ee0": "false" },
            35000,
        )
    })

    // NOTE this throws when tested against a locally running system
    test.skip("submitAndWaitForExport, limit reached; should throw", async () => {
        await sdk.utils.submitAndWaitForExport(
            sdk,
            sessionId,
            {
                exports: { id: "538fede4ec7ff072c1b246aba0e89e66" },
                parameters: {
                    "9b586343-cfaf-4482-a35d-580a056eee96": "0",
                },
            },
            35000,
        )
    })

})
