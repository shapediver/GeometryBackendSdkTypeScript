import { beforeEach, describe, expect } from "@jest/globals"
import {
    ShapeDiverRequestTicket,
    ShapeDiverRequestTicketType,
    ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2"
import { strict as assert } from "assert"
// @ts-ignore
import { create, ShapeDiverSdk } from "../src"

const modelId = "cc5d4dee-1ee2-4907-97cf-c3802858cf5b"

// @ts-ignore
const ticketId = global.sdTicket
// @ts-ignore
const sessionId = global.sdSession1

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    // @ts-ignore
    sdk = create(global.sdUrl)
    // @ts-ignore
    sdk.sdkConfig.origin = global.sdOrigin
})

describe("session Api", () => {

    function extractSessionId (dto: ShapeDiverResponseDto): string {
        if (!dto.actions) return ""
        const parts = dto.actions[0].href.split("/")
        if (parts.length === 0) return ""
        return parts[parts.length - 2]
    }

    it("ticket", async () => {
        // @ts-ignore
        sdk.sdkConfig.jwt = global.sdJwtBackend

        assert(sdk)
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
        assert(sdk)
        const res = await sdk.session.init(ticketId)
        expect(res).toBeDefined()

        const sessionId = extractSessionId(res)
        expect(await sdk.session.close(sessionId)).toBeDefined()
    })

    it("default", async () => {
        assert(sdk)
        const res = await sdk.session.default(sessionId)
        expect(res).toBeDefined()
    })

})
