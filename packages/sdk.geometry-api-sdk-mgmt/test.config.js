/**
 * This file is called during the setup process of jest, before any test has
 * been started.
 */

global["fetch"] = require("node-fetch")
global["sdUrl"] = "https://sddev2.eu-central-1.shapediver.com:1914"
global["sdJwt"] = ""

if (!global.sdJwt) {
    throw new Error("No JWT is set globally! Set one in 'test.config.js'.")
}
