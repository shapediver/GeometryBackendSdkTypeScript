import { beforeEach, describe } from "@jest/globals"
import {
    ShapeDiverRequestModel,
    ShapeDiverRequestModelFiletype,
    ShapeDiverRequestModelTrustlevel,
} from "@shapediver/api.geometry-api-dto-v2"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"

const modelId = "cc5d4dee-1ee2-4907-97cf-c3802858cf5b"

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    // @ts-ignore
    sdk = create(global.sdUrl, global.sdJwt1)
})

describe("model Api", () => {

    it("get", async () => {
        assert(sdk)
        const res = await sdk.model.get(modelId)
        expect(res).toBeDefined()
    })

    // NOTE activate when hard delete functionality has been implemented on the server-side
    it.skip("create", async () => {
        assert(sdk)
        const body: ShapeDiverRequestModel = {
            "pub": true,
            "ftype": ShapeDiverRequestModelFiletype.GRASSHOPPER_XML,
            "max_comp_time": 10000,
        }
        const res = await sdk.model.create(modelId, body)
        expect(res).toBeDefined()
    })

    it("update", async () => {
        // @ts-ignore
        sdk.sdkConfig.jwt = global.sdJwtBackend

        assert(sdk)
        const body: ShapeDiverRequestModel = {
            "pub": true,
            "ftype": ShapeDiverRequestModelFiletype.GRASSHOPPER_XML,
            "name": "Local test via sdk",
            "max_comp_time": 9999,
            "max_output_size": 52428800,
            "max_export_size": 52428800,
            "trust": ShapeDiverRequestModelTrustlevel.FULL,
            "num_loaded_min": 0,
        }
        const res = await sdk.model.update(modelId, body)
        expect(res).toBeDefined()
    })

    // NOTE activate when hard delete functionality has been implemented on the server-side
    it.skip("delete", async () => {
        assert(sdk)
        const res = await sdk.model.delete(modelId)
        expect(res).toBeDefined()
    })

    it("default params", async () => {
        assert(sdk)
        const res = await sdk.model.setDefaultParams(modelId, { "e1d10474-4690-4e7d-a269-110919becc19": "0" })
        expect(res).toBeDefined()
    })

    it("get config", async () => {
        assert(sdk)
        const res = await sdk.model.getConfig(modelId)
        expect(res).toBeDefined()
    })

    // TODO add update & set config when DTO-definitions have been specified

})
