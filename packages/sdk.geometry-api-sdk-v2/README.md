<p align="center">
  <a href="https://www.shapediver.com/">
    <img src="https://sduse1-assets.shapediver.com/production/assets/img/navbar_logo.png" alt="ShapeDiver" width="392" />
  </a>
</p>

# ShapeDiver Geometry Backend API - SDK v2
[ShapeDiver](https://www.shapediver.com/) is a cloud platform for building online applications based on parametric 3D files made with Rhinoceros 3D and Grasshopper.

Using the **ShapeDiver Geometry Backend API** allows accessing ShapeDiver models without using the **ShapeDiver Viewer**.
The SDKs provide the functionality to communicate with a specific version of our Geometry Backend API, and they expose all TypeScript-types describing request and response objects.

This SDK provides functionality to communicate with the **ShapeDiver Geometry Backend API v2** and exposes all TypeScript-types describing request and response objects.
See the [API documentation](https://sdeuc1.eu-central-1.shapediver.com/api/v2/docs/) for more details.

## Authentication
The authentication system for the Geometry Backend API is based on **ticket objects** and **JWT tokens**, which are handled by the [ShapeDiver Platform](https://www.shapediver.com/app/).
You can obtain **tickets** and **JWT tokens** by
 
* using your account on the [ShapeDiver Platform](https://www.shapediver.com/app/) (tickets only), or
* you can obtain them programmatically using the [ShapeDiver Platform API](https://app.shapediver.com/api/documentation) (both tickets and JWT tokens).

An SDK for the [ShapeDiver Platform API](https://app.shapediver.com/api/documentation) will be released soon. 

When obtaining a ticket for your model from the ShapeDiver Platform, please be aware that you will need a 

* _ticket for direct embedding_ in case you are accessing the Geometry Backend API from a web browser, or a
* _ticket for backend access_ in case you are accessing the Geometry Backend API from an arbitrary client application that is not a web browser.

## Base URL
The base URL to use depends on which ShapeDiver Geometry Backend System your model was uploaded to.
You can find the base URL in your model's dashboard on the ShapeDiver Platform, it is also called the _model view url_.

## Usage - Ticket only

```
import { create } from "@shapediver/sdk.geometry-api-sdk-v2"

(async function () {
    # Please see above on how to obtain a ticket
    const ticket = "8b23fae66cf535719a9ec797e390208b2003e3cfc894b7624ada2f6894515f8836a4-66303337623538322d34386"
    
    # Initialize the SDK by providing the base URL 
    const sdk = create("https://sdeuc1.eu-central-1.shapediver.com")
    
    # This initializes a new session and returns your ShapeDiver Model and your session
    const res = await sdk.session.init(ticket)
    console.log(res)
})()
```

## Usage - Ticket and JWT
It is possible to configure your ShapeDiver models such that JWT tokens are required to communicate with them, which provides a strong authorisation mechanism.
In this case you will need to use the [ShapeDiver Platform API](https://app.shapediver.com/api/documentation) to obtain a JWT token for your model on demand.

```
import { create } from "@shapediver/sdk.geometry-api-sdk-v2"

(async function () {
    # Please see above on how to obtain a ticket and a JWT
    const jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1c3QgYSB0ZXN0IiwiaWF0IjoxNjE4OTExMjcxLCJleHAiOjE2MTg5MTQ4OTcsImp0aSI6IjYzMjA3ODE3LWJiNWQtNDY3Zi04NzRkLWM4N2EyYzAxYmZlZCJ9.S5Ps_Fx5p6aJxdBOJMBKgpf2SIlp--6kkIZU55tiqEg"
    const ticket = "8b23fae66cf535719a9ec797e390208b2003e3cfc894b7624ada2f6894515f8836a4-66303337623538322d34386"
    
    # Initialize the SDK by providing the base URL and your JWT 
    const sdk = create("https://sdeuc1.eu-central-1.shapediver.com", jwt)
    
    # This initializes a new session and returns your ShapeDiver Model and your session
    const res = await sdk.session.init(ticket)
    console.log(res)
})()
```

## Examples
Some practical use cases, we will regularly extend the list: 

* [A Twitter Bot calling a ShapeDiver Model](https://github.com/shapediver/ServerlessExample-TwitterBot):
  This example shows how to run computations using a ShapeDiver Model which has image and data inputs and outputs.

## Support
If you have questions, please use the [ShapeDiver Help Center](https://help.shapediver.com/).

You can find out more about ShapeDiver [right here](https://www.shapediver.com/).

## Licensing
This project is released under the [MIT License](https://github.com/shapediver/GeometryBackendSdkTypeScript/blob/master/packages/sdk.geometry-api-sdk-v2/LICENSE).
