import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"

// @ts-ignore
const sessionId = global.sdSession2

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    // @ts-ignore
    sdk = create("", global.sdUrl)
})

describe("asset Api", () => {

    // NOTE activate when dedicated test model is in use
    it.skip("get export", async () => {
        assert(sdk)
        const res = await sdk.asset.getExport(sessionId, "")
        expect(res).toBeDefined()
    })

    it("get output", async () => {
        assert(sdk)
        const res = await sdk.asset.getOutput(sessionId, "6480ab6fc1dab95f064fd2783b12bc62cf51300c4e39986a5e2aa38c52d13d282afed62418f1c9e35bc243251f2a960a6bed5090c61cf78e3a32e334ea675c947ce915e761208a2ae983c20b8d98dda301a330f3aaa33a3437d6e4e52180a376d9625060c94ebdab82e76fef35b6-64313361616633322d346264352d3464")
        console.log(res)
        expect(res).toBeDefined()
    })

    // NOTE activate when dedicated test model is in use
    it.skip("get texture", async () => {
        assert(sdk)
        const res = await sdk.asset.getTexture(sessionId, "")
        expect(res).toBeDefined()
    })

})
