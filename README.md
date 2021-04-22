<p style="text-align: center">
  <a href="https://www.shapediver.com/">
    <img
      alt="ShapeDiver"
      src="https://d2tlksottdg9m1.cloudfront.net/production/assets/images/shapediver_logo_gradient.png"
      width="400"
    />
  </a>
</p>

# ShapeDiver Geometry API SDKs
[ShapeDiver](https://www.shapediver.com/) is a cloud platform that provides the right tools and scalable infrastructure needed to build online applications based on Grasshopper files.

Using the **ShapeDiver Geometry API** allows accessing ShapeDiver models without using the [ShapeDiver Viewer](https://viewer.shapediver.com/v3/latest/api/index.html).
The SDKs provide the functionality to communicate with a specific version of our Geometry Backend API, and they expose all TypeScript-types describing request and response objects.

The authentication system for the Geometry API is based on **ticket objects** and **JWT tokens**, which are handled by the [ShapeDiver Platform](https://dev-app.shapediver.com/api/documentation).
See the [ShapeDiver Platform SDK](https://github.com/shapediver/PlatformSDKTypeScript/blob/development/packages/sdk.platform-api) on how to authenticate and have a look at the examples given in each Geometry API SDK's readme file. 

## Content
This repository contains the following SDKs to communicate with the **ShapeDiver Geometry Backend API**:

<!-- NOTE we should describe functional differences between sdk versions here -->
* [**SDK v2**](https://github.com/shapediver/GeometryBackendSdkTypeScript/blob/master/packages/sdk.geometry-api-sdk-v2)

* There might be more in the future :rocket:

## Version
We take care to provide backward compatibility for all older versions.
However, new features might be limited to newer API versions.
Therefore, we recommend always using the newest API version out there.

## Support
If you have questions, <a href="mailto:support@shapediver.com" rel="noopener noreferrer" class="link">reach out to us</a>.

And find out more about ShapeDiver [right here](https://www.shapediver.com/)!

## Licensing
This project is released under the [MIT License](https://github.com/shapediver/GeometryBackendSdkTypeScript/blob/master/LICENSE).
