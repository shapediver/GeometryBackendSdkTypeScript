import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"

// @ts-ignore
const sessionId = global.sdSession2

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    // @ts-ignore
    sdk = create(global.sdUrl)
})

describe("export Api", () => {

    it("compute", async () => {
        assert(sdk)
        const res = await sdk.export.compute(sessionId, {
            exports: { id: "c286cd1053ebd65df601a092ccd47b64" },
            parameters: {
                "84fe8821-0c52-42fe-a877-92d60c1381a3": "15.0"
            },
        })
        expect(res).toBeDefined()
    })

    it("cache", async () => {
        assert(sdk)
        const res = await sdk.export.getCache(sessionId, {
            "c286cd1053ebd65df601a092ccd47b64": "fee251ac16843a404c6c2933270b18a6"
        })
        expect(res).toBeDefined()
    })

})
