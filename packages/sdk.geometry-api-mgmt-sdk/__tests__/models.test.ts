import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
import {
    create,
    ShapeDiverModelFiletype,
    ShapeDiverModelRequest,
    ShapeDiverModelTrustlevel,
    ShapeDiverSdk,
} from "../src"

const modelId = "cc5d4dee-1ee2-4907-97cf-c3802858cf5b"

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    sdk = create(
        "test",
        // @ts-ignore
        global.sdJwt,
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
