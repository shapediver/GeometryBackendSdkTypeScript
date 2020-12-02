import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
import { create, ShapeDiverModelFiletype, ShapeDiverModelTrustlevel, ShapeDiverSdk } from "../src"
import { ShapeDiverModelRequest } from "../src/resources/dto/RequestDtos"

const modelId = "cc5d4dee-1ee2-4907-97cf-c3802858cf5b"

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    sdk = create(
        "test",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNldHRpbmcuYXV0aC50aWNrZXQuc2V0Liogc2V0dGluZy5jb21wdXRlLnNldC4qIHNldHRpbmcuYXV0aC50aWNrZXQuY3JlYXRlLiogc2V0dGluZy52aWV3ZXIuZ2V0Liogc2V0dGluZy5pbmZvLnNldC4qIiwiaWF0IjoxNjA2OTMwMjcyLCJleHAiOjE2MDY5MzM4NzIsImF1ZCI6IlBsYXRmb3JtIEZyb250ZW5kIiwiaXNzIjoiaHR0cHM6Ly9hcHAuc2hhcGVkaXZlci5jb20vdjIvYXBpIiwic3ViIjoiYmFja2VuZCJ9.Jx3y9VaKkYWILQS0d6OBA4DHUyUgB5kcHdEF5IJQYDGLnE4EG-Y2Z0LsYxOpZEjRHeT5d2U1q97epoAeeq-dO7DZX0KXqANP31HQ5WV0kFYZRconWxGSdcS-osfN2N48kCsMONIk6JkbfKdRasYhhr8nK91qPceBR4sKXJtLmOiKJKSgUm9L-7hGHvA-msITv_FHMuWVFNsf8aKWSgrReg-lQkbTiW8SwJ59wxtstAFq2l9_wvU0kBJ5m5PC1k1bFw-CkyH0A8qf1o-VqiKDJD47lTViz_rxtfj2sRvaKu2joC2tFl2DhOF3LvBAKTofOjHJ3KhgUGoDzEK0-bffzg",
        "http://localhost:8081",
    )
})

describe("models", () => {

    it("get", async () => {
        assert(sdk)
        const res = await sdk.models.get(modelId)
        expect(res.collection).toBeDefined()
    })

    // it("create", async () => {
    //     assert(sdk)
    //     const body: ShapeDiverModelRequest = {
    //         "pub": true,
    //         "ftype": ShapeDiverModelFiletype.GRASSHOPPER_XML,
    //         "max_comp_time": 10000,
    //     }
    //     const res = await sdk.models.create(modelId, body)
    //     expect(res.collection).toBeDefined()
    // })

    it("update", async () => {
        assert(sdk)
        const body: ShapeDiverModelRequest = {
            "pub": false,
            "ftype": ShapeDiverModelFiletype.GRASSHOPPER_XML,
            "name": "Local test via sdk",
            "max_comp_time": 9999,
            "max_output_size": 52428800,
            "max_export_size": 52428800,
            "trust": ShapeDiverModelTrustlevel.FULL,
            "num_loaded_min": 0,
        }
        const res = await sdk.models.update(modelId, body)
        expect(res.collection).toBeDefined()
    })

    // it("delete", async () => {
    //     assert(sdk)
    //     const res = await sdk.models.delete(modelId)
    //     expect(res).toBeDefined()
    // })

})
