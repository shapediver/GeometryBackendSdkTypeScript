import { beforeEach, describe } from "@jest/globals"
import { strict as assert } from "assert"
import { create, ShapeDiverSdk } from "../src"

const modelId = "cc5d4dee-1ee2-4907-97cf-c3802858cf5b"

let sdk: ShapeDiverSdk | undefined

beforeEach(() => {
    sdk = create(
        "test",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNldHRpbmcuYXV0aC50aWNrZXQuc2V0Liogc2V0dGluZy5jb21wdXRlLnNldC4qIHNldHRpbmcuYXV0aC50aWNrZXQuY3JlYXRlLiogc2V0dGluZy52aWV3ZXIuZ2V0LioiLCJpYXQiOjE2MDY5Mjk4MzIsImV4cCI6MTYwNjkzMzQzMiwiYXVkIjoiUGxhdGZvcm0gRnJvbnRlbmQiLCJpc3MiOiJodHRwczovL2FwcC5zaGFwZWRpdmVyLmNvbS92Mi9hcGkiLCJzdWIiOiJiYWNrZW5kIn0.CV7wJqwepKSm11DoZU2bCYaeOFPMIN_OF_GeY5Z9ELQhyPKPD-b2NpiDW1ubTLPa3c2W5PiwdfoBvyP2Vk0E5ZW7Eym0YFqSv5RAmmqbIIzE0YbKhSrrCMAlEDyLdHnsssDBh8jU7PM_GnwOJ98Kr76SFRHdqHWxnVvOFhxpNrZTQSj1INPirDnkTrEV_JvIwfiZwVBg-jgUhaOmrsU9cUH9OVLwc-4F8T-CZ0tFkEAZJWKvcvyoh5mQEUKwSgLdQYV4_HnFWGcsHdD1Tic3ZgHzEQp8sjQlI2gISI8ez0o00_QFpPAx8Xjjfth61PNFXFsru_T-7JFwDJuxK__u7A",
        "http://localhost:8081",
    )
})

describe("configs", () => {

    it("get", async () => {
        assert(sdk)
        const res = await sdk.configs.get(modelId)
        expect(res.config).toBeDefined()
    })

    // TODO add create-test when config-DTO-definitions have been refactored

})
