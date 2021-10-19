import { beforeEach, describe, expect } from "@jest/globals"
import {
    ShapeDiverRequestTicket,
    ShapeDiverRequestTicketType,
    ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2"

// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
// @ts-ignore
import { getTestJwtBackend, getTestModel1, getTestOrigin, getTestSession1, getTestTicket, getTestUrl } from "./utils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl())
    // @ts-ignore
    sdk.sdkConfig.origin = getTestOrigin()
})

describe("session Api", () => {

    const modelId = getTestModel1()
    const ticketId = getTestTicket()
    const sessionId = getTestSession1()

    function extractSessionId (dto: ShapeDiverResponseDto): string {
        if (!dto.actions) return ""
        const parts = dto.actions[0].href.split("/")
        if (parts.length === 0) return ""
        return parts[parts.length - 2]
    }

    it("ticket", async () => {
        // @ts-ignore
        sdk.sdkConfig.jwt = getTestJwtBackend()

        const body: ShapeDiverRequestTicket = {
            "pub": true,
            "author": true,
            "type": ShapeDiverRequestTicketType.NONE,
            "until": "29991231235959",
        }
        const res = await sdk.session.ticket(modelId, body)
        expect(res).toBeDefined()
    })

    it("init and close", async () => {
        const res = await sdk.session.init(ticketId)
        expect(res).toBeDefined()

        const sessionId = extractSessionId(res)
        expect(await sdk.session.close(sessionId)).toBeDefined()
    })

    it("default", async () => {
        const res = await sdk.session.default(sessionId)
        expect(res).toBeDefined()
    })

})
