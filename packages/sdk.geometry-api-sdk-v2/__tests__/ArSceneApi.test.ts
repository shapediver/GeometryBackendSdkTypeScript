import {
    ArSceneApi,
    Configuration,
    exists,
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
    const sessionId = (await new SessionApi(config).createSessionByTicket(ticket)).sessionId;

    const data = readFile('__tests__/data/Box.glb', 'model/gltf-binary');

    // Create AR scene from glTF file.
    const resUpload =
        await new GltfApi(config).uploadGltf(sessionId, data as File, QueryGltfConversion.SCENE)
    expect(resUpload.gltf.sceneId).toBeDefined();

    const sceneId = resUpload.gltf.sceneId!;

    // Get metadata of an existing AR scene.
    await new ArSceneApi(config).getArSceneMetadata(sceneId);

    // Or use the helper function to check if the AR scene exists.
    expect(await exists(() => new ArSceneApi(config).getArSceneMetadata(sceneId))).toBeTruthy();

    // Download the created AR scene as glTF.
    const resGltf = await (
        await new ArSceneApi(config).downloadArSceneGltf(sceneId)
    ).arrayBuffer();
    expect(resGltf.byteLength).toBeGreaterThan(0);

    // Download the created AR scene as USDZ.
    const resUsdz = await (
        await new ArSceneApi(config).downloadArSceneUsdz(sceneId)
    ).arrayBuffer();
    expect(resUsdz.byteLength).toBeGreaterThan(0);

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
    const resSession = (await new SessionApi(config).createSessionByTicket(ticket));
    const sessionId = resSession.sessionId;

    const data = readFile('__tests__/data/Box.glb', 'model/gltf-binary');

    // Create AR scene from glTF file.
    const resUpload =
        await new GltfApi(config).uploadGltf(sessionId, data as File, QueryGltfConversion.SCENE)
    expect(resUpload.gltf.sceneId).toBeDefined();

    // Create minimal Model-State from AR scene.
    const reqModelState: ReqModelState = {
        parameters: {},
        arSceneId: resUpload.gltf.sceneId,
    };
    const resModelState =
        await new ModelStateApi(config).createModelState(sessionId, reqModelState)
    const modelStateId = resModelState.modelState.id;

    // Get metadata of the Model-State's AR scene.
    await new ArSceneApi(config).getArSceneMetadata(modelStateId);

    // Or use the helper function to check if the Model-State's AR scene exists.
    expect(
        await exists(() => new ArSceneApi(config).getArSceneMetadata(modelStateId))
    ).toBeTruthy();

    // Download the created Model-State's AR scene as glTF.
    const resGltf = await (
        await new ArSceneApi(config).downloadArSceneGltf(modelStateId)
    ).arrayBuffer();
    expect(resGltf.byteLength).toBeGreaterThan(0);

    // Download the created Model-State's AR scene as USDZ.
    const resUsdz = await (
        await new ArSceneApi(config).downloadArSceneUsdz(modelStateId)
    ).arrayBuffer();
    expect(resUsdz.byteLength).toBeGreaterThan(0);

    // Delete the Model-State.
    await new ModelStateApi(backendConfig).deleteModelState(modelStateId);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});
