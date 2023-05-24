import { ShapeDiverRequestGltfUploadQueryConversion } from "@shapediver/api.geometry-api-dto-v2"
import fs from "fs"

// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
// @ts-ignore
import { getTestSession1, getTestUrl } from "./testUtils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl())
})

describe("gltf Api", () => {

    const sessionId = getTestSession1()

    it("upload", async () => {
        const data = fs.readFileSync("test_data/Box.glb")
        const res = await sdk.gltf.upload(sessionId, data, "model/gltf-binary")
        expect(res).toBeDefined()
        expect(res?.gltf?.href).toBeDefined()
    })

    it("upload and convert", async () => {
        const data = fs.readFileSync("test_data/Box.glb")
        const res = await sdk.gltf.upload(sessionId, data, "model/gltf-binary", ShapeDiverRequestGltfUploadQueryConversion.USDZ)
        expect(res).toBeDefined()
        expect(res?.gltf?.href).toBeDefined()
    })

    it("upload and create AR scene", async () => {
        const data = fs.readFileSync("test_data/Box.glb")
        const res = await sdk.gltf.upload(sessionId, data, "model/gltf-binary", ShapeDiverRequestGltfUploadQueryConversion.SCENE)
        expect(res).toBeDefined()
        expect(res?.gltf?.href).toBeDefined()
        expect(res?.gltf?.sceneId).toBeDefined()
    })

})
