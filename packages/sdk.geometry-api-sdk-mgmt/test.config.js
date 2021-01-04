/**
 * This file is called during the setup process of jest, before any test has
 * been started.
 */

global["fetch"] = require("node-fetch")
global["sdJwt"] = ""
global["sdUrl"] = "http://localhost:9091"

if (!global.sdJwt) {
    throw new Error("No JWT is set globally! Set one in 'test.config.js'.")
}
