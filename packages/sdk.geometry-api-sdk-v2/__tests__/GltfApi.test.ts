import { Configuration, GltfApi, QueryGltfConversion, SessionApi, UtilsApi } from '../src';
import { basePath, createTicket, readFile } from './config';

test('upload gltf', async () => {
    const config = new Configuration({ basePath });

    // Initialize a new session.
    const ticket = await createTicket();
    const sessionId = (await new SessionApi(config).createSessionByTicket(ticket)).sessionId;

    const data = readFile('__tests__/data/Box.glb', 'model/gltf-binary');

    // Upload a new glTF.
    const resUpload = (await new GltfApi(config).uploadGltf(sessionId, data as File));
    expect(resUpload.gltf.href).toBeDefined();

    // Download the uploaded glTF.
    const resGltf = await (
        await new UtilsApi().download(resUpload.gltf.href)
    ).arrayBuffer();
    expect(resGltf.byteLength).toBe(data.size);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});

test('upload gltf and convert to usdz', async () => {
    const config = new Configuration({ basePath });

    // Initialize a new session.
    const ticket = await createTicket();
    const session = (await new SessionApi(config).createSessionByTicket(ticket)).sessionId;

    const data = readFile('__tests__/data/Box.glb', 'model/gltf-binary');

    // Upload a new glTF and convert to USDZ.
    const resUpload =
        await new GltfApi(config).uploadGltf(session, data as File, QueryGltfConversion.USDZ)
    expect(resUpload.gltf.href).toBeDefined();

    // Download the created USDZ.
    const resUsdz = await (
        await new UtilsApi().download(resUpload.gltf.href)
    ).arrayBuffer();
    expect(resUsdz.byteLength !== data.size).toBeTruthy();

    // Close the session.
    await new SessionApi(config).closeSession(session);
});
