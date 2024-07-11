/**
 * This file is called during the setup process of jest, before any test has
 * been started.
 */

global["sdUrl"] = "https://sddev2.eu-central-1.shapediver.com";
global["sdOrigin"] = "http://localhost:8080";
global["sdTicket"] = "";
global["sdJwtBackend"] = "";
global["sdJwt1"] = ""; // Model 1
global["sdJwt2"] = ""; // Model 2
// NOTE merge into single session when dedicated test model is in use
global["sdModel1"] = "0f563296-4e61-4c53-91e1-0526d78723b9";
global["sdModel2"] = "13e899fa-75d0-45d8-9335-d22d8288437c";
global["sdSession1"] = ""; // Session of model 1
global["sdSession2"] = ""; // Session of model 2
global["sdArSceneId"] = "";
