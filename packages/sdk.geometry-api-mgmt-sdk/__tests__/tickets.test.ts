import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
import { create, ShapeDiverSdk, ShapeDiverTicketRequest, ShapeDiverTicketType } from "../src"

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

describe("tickets", () => {

    it("create", async () => {
        assert(sdk)
        const body: ShapeDiverTicketRequest = {
            "pub": true,
            "author": true,
            "type": ShapeDiverTicketType.NONE,
            "until": "29991231235959",
        }
        const res = await sdk.tickets.create(modelId, body)
        expect(res.collection).toBeDefined()
    })

})
