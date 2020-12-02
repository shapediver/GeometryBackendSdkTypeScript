import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
import { create, ShapeDiverSdk, ShapeDiverTicketRequest, ShapeDiverTicketType } from "../src"

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    sdk = create(
        "test",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNldHRpbmcuYXV0aC50aWNrZXQuc2V0Liogc2V0dGluZy5jb21wdXRlLnNldC4qIHNldHRpbmcuYXV0aC50aWNrZXQuY3JlYXRlLioiLCJpYXQiOjE2MDY5Mjg5MzYsImV4cCI6MTYwNjkzMjUzNiwiYXVkIjoiUGxhdGZvcm0gRnJvbnRlbmQiLCJpc3MiOiJodHRwczovL2FwcC5zaGFwZWRpdmVyLmNvbS92Mi9hcGkiLCJzdWIiOiJiYWNrZW5kIn0.Qk2XB3AHESxIqOQFqQy19jJnrtsN0Urdvpv1IHtf-24whmwiGX0G9sI56ZufQCBtuvtMLTqW8R5M8khVQ7L7ju3fDN-xeAvNhn0iZKbbgdSJk6gBitEoM_1TZVGFOyBIjZKAFVaaib4cESFApc5T13cIMJzk76Kq1LPF_xMkNfKAgqvn57HwF2ExwEYE1pmej2EAGaWorMApydkFgLISuOeoqWd5cQj0rwTn9EUYV-WObmqcoWQ2sTbum5PTfpufDe4Uj6t45mAf5sQ9z6zBEAnwgdySY4M_mr1hke1VTMfSXgYC-KpO0FVKxbFuGIoVs2yLAN5IaFjQa-UslHSUhQ",
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
            "until": "29991231235959"
        }
        const res = await sdk.tickets.create("cc5d4dee-1ee2-4907-97cf-c3802858cf5b", body)
        expect(res.collection).toBeDefined()
    })

})
