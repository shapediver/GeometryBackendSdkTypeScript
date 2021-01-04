# `sdk.geometry-api-mgmt-sdk`

This SDK provides functionality to communicate with the *ShapeDiver Geometry Backend Management-API*,
as well as all TypeScript-types describing request and response objects.

## Usage

```
import { create } from "@shapediver/sdk.geometry-api-mgmt-sdk"

(async function () {
    const jwt = "eyJhbGci1NsInR5c.eyJzY2sImlhdCI6MTYw.O9deLIqzTszRNdvdt302Bh"
    const sdk = create(jwt)
    const model = await sdk.models.get("cc5d4dee-1ee2-4907-97cf-c3802858cf5b")
    console.log(model.collection)
})()
```
