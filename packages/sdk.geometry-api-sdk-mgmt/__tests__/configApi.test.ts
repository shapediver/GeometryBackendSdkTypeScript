import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"

const modelId = "cc5d4dee-1ee2-4907-97cf-c3802858cf5b"

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    // @ts-ignore
    sdk = create(global.sdJwt, global.sdUrl)
})

describe("config Api", () => {

    it("get", async () => {
        assert(sdk)
        const res = await sdk.config.get(modelId)
        expect(res.config).toBeDefined()
    })

    // TODO add create-test when config-DTO-definitions have been refactored

})
