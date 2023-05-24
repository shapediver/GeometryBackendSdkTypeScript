import fs from "fs"

// @ts-ignore
import { create, ShapeDiverSdk } from "../src"
// @ts-ignore
import { getTestJwt1, getTestSession1, getTestUrl } from "./testUtils"

let sdk: ShapeDiverSdk

beforeEach(() => {
    sdk = create(getTestUrl(), getTestJwt1())
})

describe("file Api", () => {

    const sessionId = getTestSession1()

    it("request upload - upload - download - list - delete", async () => {
        const data = fs.readFileSync("test_data/Box.glb")
        const paramId = "9725bdec-f398-42db-8404-503e7713ed73"
        const type = "image/gif"

        /* REQUEST UPLOAD */
        let res = await sdk.file.requestUpload(sessionId, {
            [paramId]: {
                "format": type,
                "size": data.length,
            },
        })
        expect(res).toBeDefined()
        expect(res.asset).toBeDefined()
        expect(res.asset!.file![paramId]).toBeDefined()
        expect(res.asset!.file![paramId].href).toBeDefined()
        expect(res.asset!.file![paramId].id).toBeDefined()

        const fileId = res.asset!.file![paramId].id

        /* UPLOAD */
        await sdk.utils.upload(res.asset!.file![paramId].href, data, type)

        /* DOWNLOAD */
        const file = await sdk.file.get(sessionId, paramId, fileId)
        expect(file).toBeDefined()

        /* LIST */
        res = await sdk.file.list(sessionId, paramId)
        expect(res)
        expect(res.list).toBeDefined()
        expect(res.list!.file).toBeDefined()
        expect(res.list!.file!.length).toBeGreaterThanOrEqual(1)

        /* DELETE */
        await sdk.file.delete(sessionId, paramId, fileId)
    })

})
