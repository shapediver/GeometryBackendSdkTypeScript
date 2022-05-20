import { beforeEach, describe } from "@jest/globals"

// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
// @ts-ignore
import { getTestSession1, getTestUrl } from "./testUtils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl())
})

describe.skip("asset Api", () => {

    const sessionId = getTestSession1()

    it("get export", async () => {
        const res = await sdk.asset.getExport(sessionId, "")
        expect(res).toBeDefined()
    })

    it("get output", async () => {
        const res = await sdk.asset.getOutput(sessionId, "")
        expect(res).toBeDefined()
    })

    it("get texture", async () => {
        const res = await sdk.asset.getTexture(sessionId, "")
        expect(res).toBeDefined()
    })

    it("get gltf", async () => {
        const res = await sdk.asset.getGltf(sessionId, "")
        expect(res).toBeDefined()
    })

    it("get usdz", async () => {
        const res = await sdk.asset.getUsdz(sessionId, "")
        expect(res).toBeDefined()
    })

    it("download image", async () => {
        const [ data, content ] = await sdk.asset.downloadImage(sessionId, "https://sduse1-assets.shapediver.com/production/assets/img/navbar_logo.png")
        expect(data).toBeDefined()
        expect(content).toBeDefined()
    })

})
