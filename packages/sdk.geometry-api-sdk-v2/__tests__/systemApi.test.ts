import { beforeEach, describe } from "@jest/globals"
import { ShapeDiverRequestLogMessageLevel } from "@shapediver/api.geometry-api-dto-v2"

// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
// @ts-ignore
import { getTestJwtBackend, getTestModel1, getTestModel2, getTestSession1, getTestTicket, getTestUrl } from "./utils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl(), getTestJwtBackend())
})

describe("system Api", () => {

    const sessionId = getTestSession1()

    it("log", async () => {
        sdk = create(getTestUrl())
        const res = await sdk.system.log(sessionId, {
            level: ShapeDiverRequestLogMessageLevel.INFO,
            message: "Integration test log message",
        })
        expect(res).toBeDefined()
    })

    it("decrypt ticket", async () => {
        const res = await sdk.system.decryptTicket(getTestTicket())
        expect(res).toBeDefined()
        expect(res.decryptedTicket).toBeDefined()
    })

    it("authorization group", async () => {
        const res = await sdk.system.authGroup({
            models: [ getTestModel1(), getTestModel2() ],
        })
        expect(res).toBeDefined()
        expect(res.auth_group).toBeDefined()
    })

    it("minion info", async () => {
        const res = await sdk.system.getMinionInfo()
        expect(res).toBeDefined()
        expect(res.system).toBeDefined()
        expect(res.system!.minions).toBeDefined()
    })

})
