/**
 * This file is called during the setup process of jest, before any test has
 * been started.
 */

global["fetch"] = require("node-fetch")
global["sdJwt"] = ""

if (!global.sdJwt) {
    throw new Error("No JWT is set globally! Set on in 'test.config.js'.")
}
