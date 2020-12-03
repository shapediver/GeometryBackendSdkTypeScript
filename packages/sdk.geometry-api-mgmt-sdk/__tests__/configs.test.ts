import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
import { create, ShapeDiverSdk } from "../src"

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

describe("configs", () => {

    it("get", async () => {
        assert(sdk)
        const res = await sdk.configs.get(modelId)
        expect(res.config).toBeDefined()
    })

    // TODO add create-test when config-DTO-definitions have been refactored

})
