import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverMgmtRequestTicket, ShapeDiverMgmtRequestTicketType, ShapeDiverSdk } from "../src"

const modelId = "cc5d4dee-1ee2-4907-97cf-c3802858cf5b"

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    // @ts-ignore
    sdk = create(global.sdJwt, global.sdUrl)
})

describe("ticket Api", () => {

    it("create", async () => {
        assert(sdk)
        const body: ShapeDiverMgmtRequestTicket = {
            "pub": true,
            "author": true,
            "type": ShapeDiverMgmtRequestTicketType.NONE,
            "until": "29991231235959",
        }
        const res = await sdk.ticket.create(modelId, body)
        expect(res.collection).toBeDefined()
    })

})
