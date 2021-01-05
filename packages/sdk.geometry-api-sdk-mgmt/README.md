# `sdk.geometry-api-mgmt-sdk`

This SDK provides functionality to communicate with the *ShapeDiver Geometry Backend Management-API*
and exposes all TypeScript-types describing request and response objects.

## Usage

```
import { create } from "@shapediver/sdk.geometry-api-sdk-mgmt"

(async function () {
    const jwt = "eyJhbGci1NsInR5c.eyJzY2sImlhdCI6MTYw.O9deLIqzTszRNdvdt302Bh"
    const sdk = create(jwt)
    const model = await sdk.model.get("cc5d4dee-1ee2-4907-97cf-c3802858cf5b")
    console.log(model.collection)
})()
```
