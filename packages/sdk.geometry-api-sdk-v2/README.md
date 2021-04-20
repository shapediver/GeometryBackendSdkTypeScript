<p style="text-align: center">
  <a href="https://www.shapediver.com/">
    <img
      alt="ShapeDiver"
      src="https://d2tlksottdg9m1.cloudfront.net/production/assets/images/shapediver_logo_gradient.png"
      width="400"
    />
  </a>
</p>

# ShapeDiver Geometry API - SDK v2
This SDK provides functionality to communicate with the **ShapeDiver Geometry Backend API v2** and exposes all TypeScript-types describing request and response objects.
See the [API documentation](https://sddev2.eu-central-1.shapediver.com/api/docs/) for 

The authentication system for the Geometry API is based on **ticket objects** and **JWT tokens**, which are handled by the [ShapeDiver Platform](https://dev-app.shapediver.com/api/documentation).
See the examples given in the [ShapeDiver Platform SDK](https://github.com/shapediver/PlatformSDKTypeScript/blob/development/packages/sdk.platform-api) on how to authenticate and obtain these objects.

## Usage
```
import { create } from "@shapediver/sdk.geometry-api-sdk-v2"

(async function () {
    # The JWT and the ticket-id are provided by the ShapeDiver Platform after successfully logging in
    const jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1c3QgYSB0ZXN0IiwiaWF0IjoxNjE4OTExMjcxLCJleHAiOjE2MTg5MTQ4OTcsImp0aSI6IjYzMjA3ODE3LWJiNWQtNDY3Zi04NzRkLWM4N2EyYzAxYmZlZCJ9.S5Ps_Fx5p6aJxdBOJMBKgpf2SIlp--6kkIZU55tiqEg"
    const ticketId = "eyJhbGci1NsInR3ceyJzX1sImlhdCI7MTYwO9deLIqzTszRMdvdt302Bh"
    
    # Initialize the SDK by providing the base URL and your JWT 
    const sdk = create("https://sddev2.eu-central-1.shapediver.com", jwt)
    
    # This initializes a new session and returns your ShapeDiver Model and your session
    const res = await sdk.session.init(ticketId)
    console.log(res)
})()
```

## Support
If you have questions, <a href="mailto:support@shapediver.com" rel="noopener noreferrer" class="link">reach out to us</a>.

And find out more about ShapeDiver [right here](https://www.shapediver.com/)!

## Licensing
This project is released under the [MIT License](https://github.com/shapediver/GeometryBackendSdkTypeScript/blob/master/packages/sdk.geometry-api-sdk-v2/LICENSE).
