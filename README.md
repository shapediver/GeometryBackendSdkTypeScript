<p align="center">
  <a href="https://www.shapediver.com/">
    <img src="https://sduse1-assets.shapediver.com/production/assets/img/navbar_logo.png" alt="ShapeDiver" width="392" />
  </a>
</p>

# ShapeDiver Geometry Backend API SDKs
[ShapeDiver](https://www.shapediver.com/) is a cloud platform for building online applications based on parametric 3D files made with Rhinoceros 3D and Grasshopper.

Using the **ShapeDiver Geometry Backend API** allows accessing ShapeDiver models without using the **ShapeDiver Viewer**.
The SDKs provide the functionality to communicate with a specific version of our Geometry Backend API, and they expose all TypeScript-types describing request and response objects.

## Authentication

The authentication system for the Geometry Backend API is based on **ticket objects** and **JWT tokens**, which are handled by the [ShapeDiver Platform](https://www.shapediver.com/app/). You can obtain **tickets** and **JWT tokens** 
 
* using your account on the [ShapeDiver Platform](https://www.shapediver.com/app/) (tickets only)
* or programmatically using the [ShapeDiver Platform API](https://app.shapediver.com/api/documentation) (both tickets and JWT tokens).

An SDK for the [ShapeDiver Platform API](https://app.shapediver.com/api/documentation) will be released soon. 

When obtaining a ticket for your model from the ShapeDiver Platform, please be aware that you will need a 

* _ticket for direct embedding_ in case you are accessing the Geometry Backend API from a web browser, or a
* _ticket for backend access_ in case you are accessing the Geometry Backend API from an arbitrary client application that is not a web browser.

## Content
This repository contains the following SDKs to communicate with the **ShapeDiver Geometry Backend API**:

<!-- NOTE we should describe functional differences between sdk versions here -->
* [**SDK v2**](https://www.npmjs.com/package/@shapediver/sdk.geometry-api-sdk-v2)

* There might be more in the future :rocket:

## Versioning
We take care to provide backwards compatibility for all older versions.
However, new features might be limited to newer API versions.
Therefore, we recommend always using the newest API version out there.

## Support
If you have questions, please use the [ShapeDiver Help Center](https://help.shapediver.com/).

You can find out more about ShapeDiver [right here](https://www.shapediver.com/).

## Licensing
This project is released under the [MIT License](https://github.com/shapediver/GeometryBackendSdkTypeScript/blob/master/LICENSE).
