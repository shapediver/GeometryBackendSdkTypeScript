import {
  ShapeDiverRequestTicket,
  ShapeDiverRequestTicketType,
  ShapeDiverResponseDto,
} from "@shapediver/api.geometry-api-dto-v2";
import { ShapeDiverSdkConfigType } from "@shapediver/sdk.geometry-api-sdk-core";

// @ts-ignore
import { create, ShapeDiverSdk } from "../src";
// @ts-ignore
import {
  getTestJwt1,
  getTestJwtBackend,
  getTestModel1,
  getTestOrigin,
  getTestTicket,
  getTestUrl,
} from "./testUtils";

let sdk: ShapeDiverSdk;

beforeEach(() => {
  sdk = create(getTestUrl());
  sdk.setConfigurationValue(ShapeDiverSdkConfigType.REQUEST_HEADERS, {
    origin: getTestOrigin(),
  });
});

describe("session Api", () => {
  const modelId = getTestModel1();

  beforeEach(() => {
    sdk.setConfigurationValue(ShapeDiverSdkConfigType.JWT_TOKEN, "");
  });

  function extractSessionId(dto: ShapeDiverResponseDto): string {
    if (!dto.actions) return "";
    const parts = dto.actions[0].href.split("/");
    if (parts.length === 0) return "";
    return parts[parts.length - 2];
  }

  it("ticket", async () => {
    sdk.setConfigurationValue(
      ShapeDiverSdkConfigType.JWT_TOKEN,
      getTestJwtBackend(),
    );

    const body: ShapeDiverRequestTicket = {
      pub: true,
      author: true,
      type: ShapeDiverRequestTicketType.NONE,
      until: "29991231235959",
    };
    const res = await sdk.session.ticket(modelId, body);
    expect(res).toBeDefined();
  });

  it("init, default and close", async () => {
    const ticketId = getTestTicket();
    const res = await sdk.session.init(ticketId);
    expect(res).toBeDefined();

    const sessionId = extractSessionId(res);
    expect(await sdk.session.default(sessionId)).toBeDefined();
    expect(await sdk.session.close(sessionId)).toBeDefined();
  });

  it("initForModel, default and close", async () => {
    const jwt = getTestJwt1();
    sdk.setConfigurationValue(ShapeDiverSdkConfigType.JWT_TOKEN, jwt);

    const res = await sdk.session.initForModel(modelId);
    expect(res).toBeDefined();

    const sessionId = extractSessionId(res);
    expect(await sdk.session.default(sessionId)).toBeDefined();
    expect(await sdk.session.close(sessionId)).toBeDefined();
  });
});
