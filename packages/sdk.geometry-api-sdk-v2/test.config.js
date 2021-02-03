/**
 * This file is called during the setup process of jest, before any test has
 * been started.
 */

global["fetch"] = require("node-fetch")
global["sdUrl"] = "https://sddev2.eu-central-1.shapediver.com"
global["sdOrigin"] = "http://localhost:8080"
global["sdTicket"] = ""
global["sdJwtBackend"] = ""
global["sdJwt1"] = "" // Model: cc5d4dee-1ee2-4907-97cf-c3802858cf5b
// NOTE merge into single session when dedicated test model is in use
global["sdSession1"] = "" // Model: cc5d4dee-1ee2-4907-97cf-c3802858cf5b
global["sdSession2"] = "" // Model: eb449d6d-37a0-4c12-bd2c-f4e1972293bc

if (!global.sdTicket) {
    throw new Error("No Ticket is set globally! Set one in 'test.config.js'.")
}

if (!global.sdJwtBackend) {
    throw new Error("No Ticket is set globally! Set one in 'test.config.js'.")
}

if (!global.sdJwt1) {
    throw new Error("No Ticket is set globally! Set one in 'test.config.js'.")
}

if (!global.sdSession1) {
    throw new Error("No Session1 is set globally! Set one in 'test.config.js'.")
}

if (!global.sdSession2) {
    throw new Error("No Session2 is set globally! Set one in 'test.config.js'.")
}
