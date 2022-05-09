import { beforeEach, describe } from "@jest/globals"
import {
    ShapeDiverRequestModel,
    ShapeDiverRequestModelComputationQueryOrder,
    ShapeDiverRequestModelComputationQueryStatus,
    ShapeDiverRequestModelComputationQueryType,
    ShapeDiverRequestModelFiletype,
    ShapeDiverRequestModelTrustlevel,
} from "@shapediver/api.geometry-api-dto-v2"

// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
// @ts-ignore
import { getTestJwt1, getTestJwtBackend, getTestModel1, getTestUrl } from "./testUtils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl(), getTestJwt1())
})

describe("model Api", () => {

    const modelId = getTestModel1()

    it("get", async () => {
        const res = await sdk.model.get(modelId)
        expect(res).toBeDefined()
    })

    // NOTE activate when hard delete functionality has been implemented on the server-side
    it.skip("create", async () => {
        const body: ShapeDiverRequestModel = {
            "pub": true,
            "ftype": ShapeDiverRequestModelFiletype.GRASSHOPPER_XML,
            "max_comp_time": 10000,
        }
        const res = await sdk.model.create(body)
        expect(res).toBeDefined()
    })

    it("update", async () => {
        // @ts-ignore
        sdk.sdkConfig.jwt = getTestJwtBackend()

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
        const res = await sdk.model.delete(modelId)
        expect(res).toBeDefined()
    })

    it("get model file", async () => {
        const file = await sdk.model.getFile(modelId)
        expect(file).toBeDefined()
    })

    it("set default params", async () => {
        const res = await sdk.model.setDefaultParams(modelId, { "ca9e5bee-a935-47e8-8854-1203a6651ee0": true })
        expect(res).toBeDefined()
    })

    it("get config", async () => {
        const res = await sdk.model.getConfig(modelId)
        expect(res).toBeDefined()
    })

    it.skip("create config", async () => {
        const res = await sdk.model.createConfig(modelId, {})
        expect(res).toBeDefined()
    })

    it.skip("update config", async () => {
        const res = await sdk.model.updateConfig(modelId, {})
        expect(res).toBeDefined()
    })

    it("update parameter definitions", async () => {
        const res = await sdk.model.updateParameterDefinitions(modelId, {
            "60f97239-b66b-4d4f-bae4-fbd7bb5c3e8b": {
                displayname: "Some awesome name",
                hidden: true,
                order: 1,
                tooltip: "Some helpful note"
            },
        })
        expect(res).toBeDefined()
    })

    // TODO add update & set config when DTO-definitions have been specified

    it("query computations", async () => {
        const res = await sdk.model.queryComputations(
            modelId,
            "20000101000000000",
            new Date().toISOString().replace(/[-:TZ.]/g, ""),   // now
            1,
            false,
            ShapeDiverRequestModelComputationQueryOrder.ASC,
            ShapeDiverRequestModelComputationQueryStatus.ALL,
            ShapeDiverRequestModelComputationQueryType.ALL,
            undefined
        )

        expect(res.computations).toBeDefined()
        expect(res.computations!.length).toBe(1)

        expect(res.pagination).toBeDefined()
        expect(res.pagination!.limit).toBe(1)
        expect(typeof res.pagination!.next_offset).toBe("string")
    })

    it("cleanup exports", async () => {
        const res = await sdk.model.enqueueCleanupExports(modelId, "2025")
        expect(res).toBeDefined()
    })

    it("cleanup outputs", async () => {
        const res = await sdk.model.enqueueCleanupOutputs(modelId, "2025")
        expect(res).toBeDefined()
    })

    it("cleanup textures", async () => {
        const res = await sdk.model.enqueueCleanupTextures(modelId, "2025")
        expect(res).toBeDefined()
    })

    it("cleanup status", async () => {
        const res = await sdk.model.getCleanupStatus(modelId)
        expect(Array.isArray(res.cleanup)).toBeTruthy()
    })

})
