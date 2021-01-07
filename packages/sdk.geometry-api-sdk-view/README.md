# `sdk.geometry-api-sdk-view`

This SDK provides functionality to communicate with the *ShapeDiver Geometry Backend View-API*
and exposes all TypeScript-types describing request and response objects.

## Usage

```
import { create } from "@shapediver/sdk.geometry-api-sdk-view"

(async function () {
    const ticketId = "eyJhbGci1NsInR5ceyJzY2sImlhdCI6MTYwO9deLIqzTszRNdvdt302Bh"
    const sdk = create()
    const res = await sdk.session.init(ticketId)
    console.log(model)
})()
```
