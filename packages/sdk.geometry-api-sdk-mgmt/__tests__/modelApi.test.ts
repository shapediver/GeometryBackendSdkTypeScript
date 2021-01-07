import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
import {
    create,
    ShapeDiverMgmtRequestModelFiletype,
    ShapeDiverMgmtRequestModel,
    ShapeDiverMgmtRequestModelTrustlevel,
    ShapeDiverSdk,
    // @ts-ignore
} from "../src"

const modelId = "cc5d4dee-1ee2-4907-97cf-c3802858cf5b"

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    // @ts-ignore
    sdk = create(global.sdJwt, global.sdUrl)
})

describe("model Api", () => {

    it("get", async () => {
        assert(sdk)
        const res = await sdk.model.get(modelId)
        expect(res.collection).toBeDefined()
    })

    // NOTE activate when hard delete functionality has been implemented on the server-side
    it.skip("create", async () => {
        assert(sdk)
        const body: ShapeDiverMgmtRequestModel = {
            "pub": true,
            "ftype": ShapeDiverMgmtRequestModelFiletype.GRASSHOPPER_XML,
            "max_comp_time": 10000,
        }
        const res = await sdk.model.create(modelId, body)
        expect(res.collection).toBeDefined()
    })

    it("update", async () => {
        assert(sdk)
        const body: ShapeDiverMgmtRequestModel = {
            "pub": true,
            "ftype": ShapeDiverMgmtRequestModelFiletype.GRASSHOPPER_XML,
            "name": "Local test via sdk",
            "max_comp_time": 9999,
            "max_output_size": 52428800,
            "max_export_size": 52428800,
            "trust": ShapeDiverMgmtRequestModelTrustlevel.FULL,
            "num_loaded_min": 0,
        }
        const res = await sdk.model.update(modelId, body)
        expect(res.collection).toBeDefined()
    })

    // NOTE activate when hard delete functionality has been implemented on the server-side
    it.skip("delete", async () => {
        assert(sdk)
        const res = await sdk.model.delete(modelId)
        expect(res).toBeDefined()
    })

})