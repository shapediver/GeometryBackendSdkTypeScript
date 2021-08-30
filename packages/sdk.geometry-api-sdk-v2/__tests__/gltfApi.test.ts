import { beforeEach, describe } from "@jest/globals"
import { ShapeDiverRequestGltfUploadQueryConversion } from "@shapediver/api.geometry-api-dto-v2"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
import { getTestSession1, getTestUrl } from "./utils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl())
})

describe("gltf Api", () => {

    const sessionId = getTestSession1()

    it.skip("upload", async () => {
        const fs = require('fs')

        const data = await fs.readFileSync('test_data/Box.glb')
        const blob = new Blob([data], { type: "model/gltf-binary" })

        const res = await sdk.gltf.upload(sessionId, blob, ShapeDiverRequestGltfUploadQueryConversion.NONE)
        expect(res).toBeDefined()
        expect(res?.gltf?.href).toBeDefined()
    })

    it.skip("upload and convert", async () => {
        const fs = require('fs')

        const data = await fs.readFileSync('test_data/Box.glb')
        const blob = new Blob([data], { type: "model/gltf-binary" })

        const res = await sdk.gltf.upload(sessionId, blob, ShapeDiverRequestGltfUploadQueryConversion.USDZ)
        expect(res).toBeDefined()
        expect(res?.gltf?.href).toBeDefined()
    })

})
