import { Configuration, SessionApi, TextureApi } from '../src';
import { basePath, jwtModel, createTicket } from './config';

test('textures', async () => {
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });

    // Initialize a new session.
    const ticket = await createTicket();
    const sessionId = (await new SessionApi(modelConfig).createSessionByTicket(ticket)).data
        .sessionId;

    // List all model textures.
    const resList = (await new TextureApi(modelConfig).listTextures(sessionId)).data;
    expect(resList.list.texture).toBeDefined();

    // Close the session.
    await new SessionApi(modelConfig).closeSession(sessionId);
});
