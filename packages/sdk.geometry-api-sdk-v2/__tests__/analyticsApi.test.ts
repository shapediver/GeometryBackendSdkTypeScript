import { beforeEach, describe } from "@jest/globals"

// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
// @ts-ignore
import { getTestJwt1, getTestModel1, getTestUrl } from "./utils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl(), getTestJwt1())
})

describe("analytics Api", () => {

    it("model session statistics", async () => {
        const res = await sdk.analytics.modelSessionStatistics({
            "parameters": [ {
                "modelid": getTestModel1(),
                "timestamp": "2020",
            } ],
        })
        expect(res).toBeDefined()
        expect(res.analytics).toBeDefined()
        expect(res.analytics!.models.length).toBe(1)
    })

})
