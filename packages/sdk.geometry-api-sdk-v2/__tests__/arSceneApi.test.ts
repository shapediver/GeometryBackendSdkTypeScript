import { beforeEach, describe } from "@jest/globals"

// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
// @ts-ignore
import { getTestUrl } from "./testUtils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl())
})

describe("ar-scene Api", () => {

    it("get gltf", async () => {
        const res = await sdk.arScene.getGltf("")
        expect(res).toBeDefined()
    })

    it("get usdz", async () => {
        const res = await sdk.arScene.getUsdz("")
        expect(res).toBeDefined()
    })

})