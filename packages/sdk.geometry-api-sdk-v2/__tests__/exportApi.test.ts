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

    it("compute, object-structure", async () => {
        const res = await sdk.export.compute(sessionId, {
            exports: { id: "538fede4ec7ff072c1b246aba0e89e66" },
            outputs: ["63a1c756d80d8c77317a440225e752e9"],
            parameters: {
                "9b586343-cfaf-4482-a35d-580a056eee96": "0",
            },
        })
        expect(res).toBeDefined()
        expect(res.exports).toBeDefined()
        expect(Object.keys(res.exports!).length).toBe(1)
        expect(res.outputs).toBeDefined()
        expect(Object.keys(res.outputs!).length).toBe(1)
    })

    it("compute, array-structure", async () => {
        const res = await sdk.export.compute(sessionId, {
            exports: ["538fede4ec7ff072c1b246aba0e89e66", "6c724f625301d261dc49a38fbe7ca26d"],
            outputs: ["63a1c756d80d8c77317a440225e752e9"],
            parameters: {
                "9b586343-cfaf-4482-a35d-580a056eee96": "4",
                "65f0f5da-7722-45bd-a123-a6f8b54d62c6": "5",
                "6ba40159-f0e9-45ec-97ff-9e5fd5d99679": "0"
            }
        })
        expect(res).toBeDefined()
        expect(res.exports).toBeDefined()
        expect(Object.keys(res.exports!).length).toBe(2)
        expect(res.outputs).toBeDefined()
        expect(Object.keys(res.outputs!).length).toBe(1)
    })

    it("cache, cache-request-body", async () => {
        const res = await sdk.export.getCache(sessionId, {
            "538fede4ec7ff072c1b246aba0e89e66": "89f4b14081a9bbee8bff8cc924eeb896",
        })
        expect(res).toBeDefined()
        expect(res.exports).toBeDefined()
        expect(Object.keys(res.exports!).length).toBe(1)
        expect(res.outputs).toBeUndefined()
    })

    it("cache, export-request-body", async () => {
        const res = await sdk.export.getCache(sessionId, {
            exports: ["538fede4ec7ff072c1b246aba0e89e66", "6c724f625301d261dc49a38fbe7ca26d"],
            outputs: ["63a1c756d80d8c77317a440225e752e9"],
            parameters: {
                "9b586343-cfaf-4482-a35d-580a056eee96": "4",
                "65f0f5da-7722-45bd-a123-a6f8b54d62c6": "5",
                "6ba40159-f0e9-45ec-97ff-9e5fd5d99679": "0"
            }
        })
        expect(res).toBeDefined()
        expect(res.exports).toBeDefined()
        expect(Object.keys(res.exports!).length).toBe(2)
        expect(res.outputs).toBeDefined()
        expect(Object.keys(res.outputs!).length).toBe(1)
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
