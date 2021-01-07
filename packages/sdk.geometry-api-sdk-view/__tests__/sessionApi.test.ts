import { beforeEach, describe, expect } from "@jest/globals"
import { ShapeDiverViewResponseDto } from "@shapediver/api.geometry-api-dto-view"
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
    sdk = create("", global.sdUrl)
    // @ts-ignore
    sdk.sdkConfig.origin = global.sdOrigin
})

describe("session Api", () => {

    function extractSessionId (dto: ShapeDiverViewResponseDto): string {
        if (!dto.actions) return ""
        const parts = dto.actions[0].href.split("/")
        if (parts.length === 0) return ""
        return parts[parts.length - 2]
    }

    it("init and close", async () => {
        assert(sdk)
        const res = await sdk.session.init(ticketId)
        expect(res.version).toBeDefined()
        expect(res.name).toBeDefined()
        expect(res.config).toBeDefined()
        expect(res.actions).toBeDefined()
        expect(res.templates).toBeDefined()
        expect(res.parameters).toBeDefined()
        expect(res.outputs).toBeDefined()

        const sessionId = extractSessionId(res)
        expect(await sdk.session.close(sessionId)).toBeDefined()
    })

    it("default", async () => {
        assert(sdk)
        const res = await sdk.session.default(sessionId)
        expect(res).toBeDefined()
    })

})
