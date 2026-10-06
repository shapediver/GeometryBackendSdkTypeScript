# Tests and Examples

This folder contains test files with practical examples demonstrating how to interact with various
endpoints of the ShapeDiver Geometry Backend API. These examples illustrate capabilities like
interacting with models, computing new outputs and exports, updating parameter definitions, or
uploading and downloading files and sdTFs.

For detailed information about each endpoint, please refer to the
[API documentation](https://sdeuc1.eu-central-1.shapediver.com/api/v2/docs/).

## Authentication

The authentication system for the Geometry Backend API is based on **ticket objects** and **JWT
tokens**, which are handled by the [ShapeDiver Platform](https://www.shapediver.com/app/). You can
obtain **tickets** and **JWT tokens** by:

- using your account on the [ShapeDiver Platform](https://www.shapediver.com/app/) (tickets only),
  or

- you can obtain them programmatically using the
  [ShapeDiver Platform API](https://app.shapediver.com/api/documentation) (both tickets and JWT
  tokens).

An SDK for the [ShapeDiver Platform API](https://app.shapediver.com/api/documentation) will be
released soon.

When obtaining a ticket for your model from the ShapeDiver Platform, please be aware that you will
need a

- _ticket for direct embedding_ in case you are accessing the Geometry Backend API from a web
  browser, or a

- _ticket for backend access_ in case you are accessing the Geometry Backend API from an arbitrary
  client application that is not a web browser.

> :warning: It is important to note that some endpoint calls require a **backend JWT** to work.
> However, JWTs with backend access are never provided to users and, therefore, cannot be utilized.

## Support

If you have questions, please use the [ShapeDiver Help Center](https://help.shapediver.com/).

You can find out more about ShapeDiver [right here](https://www.shapediver.com/).
