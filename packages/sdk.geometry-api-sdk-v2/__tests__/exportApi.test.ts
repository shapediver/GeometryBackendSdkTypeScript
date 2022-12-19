import { beforeEach, describe } from "@jest/globals"

// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
// @ts-ignore
import { getTestJwt1, getTestModel1, getTestSession1, getTestUrl } from "./testUtils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl(), getTestJwt1())
})

describe("export Api", () => {

    const sessionId = getTestSession1()
    const modelId = getTestModel1()

    it("compute", async () => {
        const res = await sdk.export.compute(sessionId, {
            exports: { id: "538fede4ec7ff072c1b246aba0e89e66" },
            parameters: {
                "9b586343-cfaf-4482-a35d-580a056eee96": "0",
            },
        })
        expect(res).toBeDefined()
    })

    it("cache", async () => {
        const res = await sdk.export.getCache(sessionId, {
            "538fede4ec7ff072c1b246aba0e89e66": "89f4b14081a9bbee8bff8cc924eeb896",
        })
        expect(res).toBeDefined()
    })

    it("definitions", async () => {
        const res = await sdk.export.updateDefinitions(modelId, {
            "e3d1b03d40764ad46bb2c65e42c9229c": {
                displayname: "Some awesome name",
                hidden: false,
                order: 1,
                tooltip: "Some helpful note"
            },
        })
        expect(res).toBeDefined()
    })

    it("listVersions", async () => {
        const res = await sdk.export.listVersions(sessionId, "")
        expect(res).toBeDefined()
        expect(res.list?.export).toBeDefined()
        expect(res.pagination).toBeDefined()
    })

})
