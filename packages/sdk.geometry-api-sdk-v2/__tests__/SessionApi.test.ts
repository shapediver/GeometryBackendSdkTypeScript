import { basePath, jwtBackend, modelId, createTicket, now } from './config';
import {
    Configuration,
    ReqTicketType,
    ReqTicket,
    SessionApi,
    ModelStateApi,
    ReqModelState,
} from '../src';

test('init session via ticket', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });
    const config = new Configuration({ basePath });

    // Create new ticket that allows to initialize a new session.
    const reqTicket: ReqTicket = {
        pub: true,
        author: true,
        type: ReqTicketType.BACKEND,
        until: now(120),
        use_id2: false,
    };
    const resTicket = (await new SessionApi(backendConfig).createTicket(modelId, reqTicket)).data;
    expect(resTicket.ticket).toBeDefined();

    // Initialize a new session using the ticket.
    const sessionId = (await new SessionApi(config).createSessionByTicket(resTicket.ticket)).data
        .sessionId;
    expect(sessionId).toBeDefined();

    // Get the session defaults.
    const resDefaults = (await new SessionApi(config).getSessionDefaults(sessionId)).data;
    expect(resDefaults.sessionId).toBe(sessionId);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});

test('init session via model', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });
    const config = new Configuration({ basePath });

    // Initialize a new session using the model ID.
    const sessionId = (await new SessionApi(backendConfig).createSessionByModel(modelId)).data
        .sessionId;
    expect(sessionId).toBeDefined();

    // Get the session defaults.
    const resDefaults = (await new SessionApi(config).getSessionDefaults(sessionId)).data;
    expect(resDefaults.sessionId).toBe(sessionId);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});

test('init session with model state', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });
    const config = new Configuration({ basePath });

    // Initialize a new session.
    const ticket = await createTicket();
    const resSession = (await new SessionApi(config).createSessionByTicket(ticket)).data;
    expect(resSession.modelState).toBeUndefined();
    const sessionId = resSession.sessionId;

    // Create minimal Model-State.
    const reqModelState: ReqModelState = { parameters: {} };
    const resModelState = (
        await new ModelStateApi(config).createModelState(sessionId, reqModelState)
    ).data;
    const modelStateId = resModelState.modelState.id;
    const modelId = resModelState.modelState.modelId;

    // Test: Create session via ticket and Model-State.
    let res = (await new SessionApi(config).createSessionByTicket(ticket, modelStateId, true))
        .data;
    expect(res.modelState).toBeDefined();
    await new SessionApi(config).closeSession(res.sessionId);

    // Test: Create session via model and Model-State.
    res = (await new SessionApi(backendConfig).createSessionByModel(modelId, modelStateId, false))
        .data;
    expect(res.modelState).toBeDefined();
    await new SessionApi(config).closeSession(res.sessionId);

    // Delete the Model-State.
    await new ModelStateApi(backendConfig).deleteModelState(modelStateId);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});

test('decrypt ticket', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });

    // Create new ticket that allows to initialize a new session.
    const reqTicket: ReqTicket = {
        pub: true,
        author: true,
        type: ReqTicketType.BACKEND,
        until: now(120),
        use_id2: false,
    };
    const resTicket = (await new SessionApi(backendConfig).createTicket(modelId, reqTicket)).data;
    expect(resTicket.ticket).toBeDefined();

    // Decrypt the ticket.
    const decryptedTicket = (await new SessionApi(backendConfig).decryptTicket(resTicket.ticket))
        .data.decryptedTicket;
    expect(decryptedTicket.pub).toBe(reqTicket.pub);
    expect(decryptedTicket.author).toBe(reqTicket.author);
    expect(decryptedTicket.type).toBe(reqTicket.type);
    expect(decryptedTicket.until).toBe(reqTicket.until);
    expect(decryptedTicket.use_id2).toBe(reqTicket.use_id2);
});
