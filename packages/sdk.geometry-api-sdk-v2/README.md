<p align="center">
  <a href="https://www.shapediver.com/">
    <img src="https://sduse1-assets.shapediver.com/production/assets/img/navbar_logo.png" alt="ShapeDiver" width="392" />
  </a>
</p>

# GeometryBackendSdkTypeScript

> :warning: **You might be looking for the [v1 docs](https://github.com/shapediver/GeometryBackendSdkTypeScript/tree/legacy/v1) - [Migration Guide](<https://help.shapediver.com/doc/geometry-backend-sdk-typescript-migration-guide#GeometryBackendSDKTypeScript-MigrationGuide-MigratingfromVersion1.x.xto2.x.x(03/11/2024)>).**

[ShapeDiver](https://www.shapediver.com/) is a cloud platform for building online applications
based on parametric 3D files made with [Rhinoceros 3D](https://www.rhino3d.com/) and
[Grasshopper](https://www.grasshopper3d.com/).

Using the **ShapeDiver Geometry Backend API** allows access to ShapeDiver models without using the
**ShapeDiver Viewer**. This SDK provides functionality to communicate with the Geometry Backend API
**version 2**, and includes type hints describing request and response data objects. See the
[API documentation](https://sdeuc1.eu-central-1.shapediver.com/api/v2/docs/) for more details.

## Authentication

The authentication system for the Geometry Backend API is based on **ticket objects** and **JWT
tokens**, which are handled by the [ShapeDiver Platform](https://www.shapediver.com/app/). You can
obtain **tickets** and **JWT tokens** by:

- using your account on the [ShapeDiver Platform](https://www.shapediver.com/app/) (tickets only),
    or

- you can obtain them programmatically using the [ShapeDiver Platform API](https://app.shapediver.com/api/documentation) (both tickets and JWT tokens).

An SDK for the [ShapeDiver Platform API](https://app.shapediver.com/api/documentation) will be
released soon.

When obtaining a ticket for your model from the ShapeDiver Platform, please be aware that you will
need a _ticket for backend access_, since you are accessing the Geometry Backend API from an
arbitrary client application that is not a web browser. For more details see the [ShapeDiver
Help Center developer settings](https://help.shapediver.com/doc/developers-settings).

## Base URL

The base URL to use depends on which ShapeDiver Geometry Backend System your model was uploaded to.
You can find the base URL in your model's dashboard on the ShapeDiver Platform, it is also called
the _model view url_.

## Usage - Ticket only

```typescript
import {
  Configuration,
  SessionApi
} from '@shapediver/sdk.geometry-api-sdk-v2';

(async function () {
    // Please see above on how to obtain a ticket
    const ticket = '8b23fae66cf535719a9ec797e390208b2003e3cfc894b7624ada2f6894515f8836a4-66303337623538322d34386';

    // Initialize the SDK configuration instance by providing the base URL
    const config = new Configuration({
      basePath: 'https://sdeuc1.eu-central-1.shapediver.com'
    });

    // Initialize a new session using the ticket.
    const res = (
      await new SessionApi(config).createSessionByTicket(ticket)
    ).data;

    console.log(res);
})();
```

## Usage - Ticket and JWT

It is possible to configure your ShapeDiver models such that JWT tokens are required to communicate
with them, which provides a strong authorisation mechanism. In this case you will need to use the
[ShapeDiver Platform API](https://app.shapediver.com/api/documentation) to obtain a JWT token for
your model on demand:

```typescript
import {
  Configuration,
  SessionApi
} from '@shapediver/sdk.geometry-api-sdk-v2';

(async function () {
    // Please see above on how to obtain a ticket and a JWT.
    const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1c3QgYSB0ZXN0IiwiaWF0IjoxNjE4OTExMjcxLCJleHAiOjE2MTg5MTQ4OTcsImp0aSI6IjYzMjA3ODE3LWJiNWQtNDY3Zi04NzRkLWM4N2EyYzAxYmZlZCJ9.S5Ps_Fx5p6aJxdBOJMBKgpf2SIlp--6kkIZU55tiqEg';
    const ticket = '8b23fae66cf535719a9ec797e390208b2003e3cfc894b7624ada2f6894515f8836a4-66303337623538322d34386';

    // Initialize the SDK client instance by providing the base URL
    const config = new Configuration({
        basePath: 'https://sdeuc1.eu-central-1.shapediver.com',
        accessToken: jwt,
    });

    // Initialize a new session using the ticket.
    const res = (
      await new SessionApi(config).createSessionByTicket(ticket)
    ).data;

    console.log(res);
})();
```

## Handling Errors

The SDK provides a helper function to extract ShapeDiver error information from an `AxiosError`:

```typescript
import {
  processError,
  SdError,
  SdRequestError,
  SdResponseError,
} from "@shapediver/sdk.geometry-api-sdk-v2"

try {
  sdk.model.get("be5d4ce5-f76d-417d-8496-1f038e6f0cab")
catch (err) {
  const e = processError(err);

  if (e instanceof SdRequestError) {
    // e is a request error.
    // In this case, the request was made but no response was received.
  }

  if (e instanceof SdResponseError) {
    // e is a response error.
    // In this case, the request was made and the server responded with a status code that falls
    // out of the range of 2xx.
  }

  if (e instanceof SdError) {
    // e is a generic error.
    // Generic errors are used for everything that is neither a request error nor a response error.
  }
}
```

## Examples

- For examples of interacting with SDK endpoints, refer to the [tests
    directory](https://github.com/shapediver/GeometryBackendSdkTypeScript/tree/master/packages/sdk.geometry-api-sdk-v2/__tests__),
    which provides detailed usage scenarios for each endpoint.

- [ShapeDiver CAD to sdTF and sdTF to glTF
    Conversion](https://github.com/shapediver/TypeScriptSdkExample-sdTF-in-out): An example of using
    the ShapeDiver backend to convert _CAD files to sdTF_ and _sdTF files to glTF_.

- [ShapeDiver CAD to glTF
    Conversion](https://github.com/shapediver/TypeScriptSdkExample-glTF-Converter): An example of
    using the ShapeDiver backend to convert _CAD files to glTF format_.

- [Command-Line Interface Example](https://github.com/shapediver/TypeScriptSdkExample-CLI): A simple
    example demonstrating how to use the ShapeDiver TypeScript SDKs (_Platform SDK_ and _Geometry
    Backend SDK_) within a CLI tool.

## Making Changes & Contributing

Most of the code in this repository has been generated via the
[OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator). The specification of the
Geometry Backend API version 2 can be found in the
[ShapeDiver
OAS](https://github.com/shapediver/OpenApiSpecifications/blob/main/geometry_backend_v2.yaml)
repository. Additionally, we have added wrappers and utility functions to improve overall
usability.

### Setup

This project is written in _TypeScript_ and uses [PNPM](https://pnpm.io/) as a dependency manager.
Project-specific commands are handled either via [NPM](https://docs.npmjs.com/cli/v8) or
[just](https://github.com/casey/just), so make sure that both tools are installed. To get an
overview of all available commands run `npm run -l` and `just --list`.

Run the following commands to install all dependencies:

```bash
npm run init
```

## Generate Code

To re-generate the code from the
[ShapeDiver
OAS](https://github.com/shapediver/OpenApiSpecifications/blob/main/geometry_backend_v2.yaml)
file, you need to install version 7 of the
[OpenAPI
Generator](https://github.com/OpenAPITools/openapi-generator?tab=readme-ov-file#1---installation).
We recommend installing it as a global NPM package:

```bash
npm i -g openapi-generator
```

Afterwards, update the local file `./oas_spec.yaml` and generate the new code via
`just generate <version>`. The _version_ argument represents the respective Git tag from
[ShapeDiver OAS](https://github.com/shapediver/OpenApiSpecifications/tags). For instance, use
version "1.0.0" when targeting the Git tag "gb_v2@1.0.0".

Alternatively, the client can be generated from a local file. Check out the [ShapeDiver OAS
repository](https://github.com/shapediver/OpenApiSpecifications) and run `just generate local`.

## Release

Before releasing a new versions of this package ensure that you have configured everything in your
`~/.npmrc` file. Afterwards, run `npm run publish` and follow the CLI to build, publish, and commit
a new version of the TypeScript package.
Before releasing a new version of this package, ensure that your `~/.npmrc` file is fully
configured. Then, run `npm run publish` and follow the CLI instructions to build, publish, and
commit the new version of the TypeScript package.

## Test

Unit and integration tests can be executed via `npm run test`. However, should you want to run only
a single test file then run `npx jest -i --forceExit <path>` within the package instead.

## Versioning

We take care to provide backwards compatibility for all older versions.
However, new features might be limited to newer API versions.
Therefore, we recommend always using the newest API version out there.

## Support

If you have questions, please use the [ShapeDiver Help Center](https://help.shapediver.com/).

You can find out more about ShapeDiver [right here](https://www.shapediver.com/).

## Licensing

This project is released under the [MIT
License](https://github.com/shapediver/GeometryBackendSdkTypeScript/blob/master/LICENSE).
