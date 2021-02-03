# `sdk.geometry-api-sdk-v2`

This SDK provides functionality to communicate with the *ShapeDiver Geometry Backend View-API v2*
and exposes all TypeScript-types describing request and response objects.

## Usage

```
import { create } from "@shapediver/sdk.geometry-api-sdk-v2"

(async function () {
    const ticketId = "eyJhbGci1NsInR5ceyJzY2sImlhdCI6MTYwO9deLIqzTszRNdvdt302Bh"
    const sdk = create(<target url>)
    const res = await sdk.session.init(ticketId)
    console.log(res)
})()
```
