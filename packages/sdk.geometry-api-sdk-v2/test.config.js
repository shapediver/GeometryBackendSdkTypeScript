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
global["sdJwt2"] = "" // Model: eb449d6d-37a0-4c12-bd2c-f4e1972293bc
// NOTE merge into single session when dedicated test model is in use
global["sdModel1"] = "cc5d4dee-1ee2-4907-97cf-c3802858cf5b"
global["sdModel2"] = "eb449d6d-37a0-4c12-bd2c-f4e1972293bc"
global["sdSession1"] = "" // Session of model 1
global["sdSession2"] = "" // Session of model 2
