import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
import { getTestJwt2, getTestModel2, getTestSession2, getTestUrl } from "./utils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl(), getTestJwt2())
})

describe("export Api", () => {

    const sessionId = getTestSession2()
    const modelId = getTestModel2()

    it("compute", async () => {
        assert(sdk)
        const res = await sdk.export.compute(sessionId, {
            exports: { id: "c286cd1053ebd65df601a092ccd47b64" },
            parameters: {
                "84fe8821-0c52-42fe-a877-92d60c1381a3": "15.0",
            },
        })
        expect(res).toBeDefined()
    })

    it("cache", async () => {
        assert(sdk)
        const res = await sdk.export.getCache(sessionId, {
            "c286cd1053ebd65df601a092ccd47b64": "fee251ac16843a404c6c2933270b18a6",
        })
        expect(res).toBeDefined()
    })

    it("definitions", async () => {
        assert(sdk)
        const res = await sdk.export.updateDefinitions(modelId, {
            "c286cd1053ebd65df601a092ccd47b64": {
                displayname: "",
                hidden: false,
                order: 1,
            },
        })
        expect(res).toBeDefined()
    })

})
