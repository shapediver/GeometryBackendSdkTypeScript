/**
 * Helper functions to access the global object that contains some test data.
 *
 * WARNING:
 * This is a temporary solution that should be replaced as soon as we have a
 * working test environment.
 */

export function getTestUrl(): string {
  // @ts-ignore
  const url = global["sdUrl"];
  if (!url)
    throw new Error(
      "Missing test config value: 'sdUrl'. Set this in 'test.config.js'.",
    );
  return url;
}

export function getTestOrigin(): string {
  // @ts-ignore
  const origin = global["sdOrigin"];
  if (!origin)
    throw new Error(
      "Missing test config value: 'sdOrigin'. Set this in 'test.config.js'.",
    );
  return origin;
}

export function getTestTicket(): string {
  // @ts-ignore
  const ticket = global["sdTicket"];
  if (!ticket)
    throw new Error(
      "Missing test config value: 'sdTicket'. Set this in 'test.config.js'.",
    );
  return ticket;
}

export function getTestJwtBackend(): string {
  // @ts-ignore
  const jwt = global["sdJwtBackend"];
  if (!jwt)
    throw new Error(
      "Missing test config value: 'sdJwtBackend'. Set this in 'test.config.js'.",
    );
  return jwt;
}

export function getTestJwt1(): string {
  // @ts-ignore
  const jwt = global["sdJwt1"];
  if (!jwt)
    throw new Error(
      "Missing test config value: 'sdJwt1'. Set this in 'test.config.js'.",
    );
  return jwt;
}

export function getTestJwt2(): string {
  // @ts-ignore
  const jwt = global["sdJwt2"];
  if (!jwt)
    throw new Error(
      "Missing test config value: 'sdJwt2'. Set this in 'test.config.js'.",
    );
  return jwt;
}

export function getTestModel1(): string {
  // @ts-ignore
  const model = global["sdModel1"];
  if (!model)
    throw new Error(
      "Missing test config value: 'sdModel1'. Set this in 'test.config.js'.",
    );
  return model;
}

export function getTestModel2(): string {
  // @ts-ignore
  const model = global["sdModel2"];
  if (!model)
    throw new Error(
      "Missing test config value: 'sdModel2'. Set this in 'test.config.js'.",
    );
  return model;
}

export function getTestSession1(): string {
  // @ts-ignore
  const session = global["sdSession1"];
  if (!session)
    throw new Error(
      "Missing test config value: 'sdSession1'. Set this in 'test.config.js'.",
    );
  return session;
}

export function getTestSession2(): string {
  // @ts-ignore
  const session = global["sdSession2"];
  if (!session)
    throw new Error(
      "Missing test config value: 'sdSession2'. Set this in 'test.config.js'.",
    );
  return session;
}

/** General helper functions for tests */
export async function extractException(
  fnUnderTest: Function,
): Promise<string | undefined> {
  try {
    await fnUnderTest();
  } catch (e: unknown) {
    return (<Error>e).message;
  }
}
