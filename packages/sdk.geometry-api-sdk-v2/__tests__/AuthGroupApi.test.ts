import { AuthGroupApi, Configuration, ReqAuthorizationGroup } from '../src';
import { basePath, jwtBackend, modelId } from './config';
import { v4 as uuidv4 } from 'uuid';

test('create', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });

    // Create a new authorization group.
    const reqAuthGroup: ReqAuthorizationGroup = {
        models: [modelId],
        users: [uuidv4()],
        organizations: [uuidv4()],
    };
    const resAuthGroup = (
        await new AuthGroupApi(backendConfig).createAuthorizationGroup(reqAuthGroup)
    ).data;
    expect(resAuthGroup.auth_group).toBeDefined();
});
