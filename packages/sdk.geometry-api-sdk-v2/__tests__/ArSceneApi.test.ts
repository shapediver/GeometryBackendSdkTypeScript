import {
    ArSceneApi,
    Configuration,
    GltfApi,
    ModelStateApi,
    QueryGltfConversion,
    ReqModelState,
    SessionApi,
} from '../src';
import { basePath, jwtBackend, createTicket, readFile } from './config';

test('metadata and downloads', async () => {
    const config = new Configuration({ basePath });

    // Initialize a new session.
    const ticket = await createTicket();
    const sessionId = (await new SessionApi(config).createSessionByTicket(ticket)).data.sessionId;

    const data = readFile('__tests__/data/Box.glb', 'model/gltf-binary');

    // Create AR scene from glTF file.
    const resUpload = (
        await new GltfApi(config).uploadGltf(sessionId, data as File, QueryGltfConversion.SCENE)
    ).data;
    expect(resUpload.gltf.sceneId).toBeDefined();

    const sceneId = resUpload.gltf.sceneId!;

    // Get metadata of an existing AR scene.
    const resMetadata = await new ArSceneApi(config).getArSceneMetadata(sceneId);
    expect(resMetadata.status).toBe(200);

    // Download the created AR scene as glTF.
    const resGltf = (await new ArSceneApi(config).downloadArSceneGltf(sceneId))
        .data as unknown as string;
    expect(resGltf.length).toBeGreaterThan(0);

    // Download the created AR scene as USDZ.
    const resUsdz = (await new ArSceneApi(config).downloadArSceneUsdz(sceneId))
        .data as unknown as string;
    expect(resUsdz.length).toBeGreaterThan(0);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});

test('model state from ar-scene', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });
    const config = new Configuration({ basePath });

    // Initialize a new session.
    const ticket = await createTicket();
    const resSession = (await new SessionApi(config).createSessionByTicket(ticket)).data;
    const sessionId = resSession.sessionId;

    const data = readFile('__tests__/data/Box.glb', 'model/gltf-binary');

    // Create AR scene from glTF file.
    const resUpload = (
        await new GltfApi(config).uploadGltf(sessionId, data as File, QueryGltfConversion.SCENE)
    ).data;
    expect(resUpload.gltf.sceneId).toBeDefined();

    // Create minimal Model-State from AR scene.
    const reqModelState: ReqModelState = {
        parameters: {},
        arSceneId: resUpload.gltf.sceneId,
    };
    const resModelState = (
        await new ModelStateApi(config).createModelState(sessionId, reqModelState)
    ).data;
    const modelStateId = resModelState.modelState.id;

    // Get metadata of the Model-State's AR scene.
    const resMetadata = await new ArSceneApi(config).getArSceneMetadata(modelStateId);
    expect(resMetadata.status).toBe(200);

    // Download the created Model-State's AR scene as glTF.
    const resGltf = (await new ArSceneApi(config).downloadArSceneGltf(modelStateId))
        .data as unknown as string;
    expect(resGltf.length).toBeGreaterThan(0);

    // Download the created Model-State's AR scene as USDZ.
    const resUsdz = (await new ArSceneApi(config).downloadArSceneUsdz(modelStateId))
        .data as unknown as string;
    expect(resUsdz.length).toBeGreaterThan(0);

    // Delete the Model-State.
    await new ModelStateApi(backendConfig).deleteModelState(modelStateId);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});
