import { Configuration, ReqSdtfType, SdtfApi, SessionApi, UtilsApi } from '../src';
import { basePath, jwtModel, createTicket, readFile } from './config';

test('sdtf', async () => {
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });
    const config = new Configuration({ basePath });
    const namespace = 'pub';

    // Initialize a new session.
    const ticket = await createTicket();
    const sessionId = (await new SessionApi(config).createSessionByTicket(ticket)).sessionId;

    const data = readFile('__tests__/data/test.sdtf', 'model/vnd.sdtf');

    // Request a sdTF upload for a specific namespace.
    const resUpload =
        await new SdtfApi(config).uploadSdtf(sessionId, [
            {
                content_length: data.size,
                content_type: ReqSdtfType.MODEL_SDTF,
                namespace: namespace,
            },
        ])
    const sdtf = resUpload.asset.sdtf[0];
    expect(sdtf).toBeDefined();

    // Upload the sdTF.
    const upload = await new UtilsApi().uploadAsset(
        sdtf.href,
        await data.arrayBuffer(),
        sdtf.headers
    );
    expect(upload.status).toBe(200);

    // Download the uploaded sdTF.
    const resData = await (
        await new SdtfApi(modelConfig).downloadSdtf(sessionId, namespace, sdtf.id)
    ).arrayBuffer();
    expect(resData.byteLength).toBeGreaterThan(0);

    // List all sdTFs of a specific namespace.
    const resListNew = (await new SdtfApi(modelConfig).listSdtfs(sessionId, namespace));
    expect(resListNew.list.sdtf.length).toBeGreaterThan(0);

    const listedSdtf = resListNew.list.sdtf.find((item) => item.id === sdtf.id.split('/').pop());
    expect(listedSdtf?.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(Number.isNaN(Date.parse(listedSdtf!.lastModified!))).toBe(false);

    // Delete the uploaded sdTF.
    await new SdtfApi(modelConfig).deleteSdtf(sessionId, namespace, sdtf.id);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});
