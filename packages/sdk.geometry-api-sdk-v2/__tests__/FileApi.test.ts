import {
    Configuration,
    extractFileInfo,
    FileApi,
    ResParameterType,
    SessionApi,
    UtilsApi,
} from '../src';
import { basePath, jwtModel, createTicket, readFile } from './config';

test('file parameter', async () => {
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });
    const config = new Configuration({ basePath });

    // Initialize a new session.
    const ticket = await createTicket();
    const resSession = (await new SessionApi(modelConfig).createSessionByTicket(ticket)).data;
    const sessionId = resSession.sessionId;
    expect(resSession.parameters).toBeDefined();

    // Search for a file-parameter.
    const fileParams = Object.values(resSession.parameters!).filter(
        (param) => param.type == ResParameterType.FILE
    );
    expect(fileParams.length).toBeGreaterThan(0);

    const filename = 'shapediverLogo.jpg';
    const format = 'image/jpeg';
    const data = readFile('__tests__/data/logo.jpg', format);

    // Request a file upload for a specific file-parameter.
    const resUploadReq = (
        await new FileApi(config).uploadFile(sessionId, {
            [fileParams[0].id]: {
                filename,
                format,
                size: data.size,
            },
        })
    ).data;
    const file = resUploadReq.asset.file[fileParams[0].id];
    expect(file).toBeDefined();

    // Upload the file.
    const resUpload = await new UtilsApi().uploadAsset(
        file.href,
        await data.arrayBuffer(),
        file.headers
    );
    expect(resUpload.status).toBe(200);

    // Download the uploaded file.
    const resData = (
        await new FileApi(modelConfig).downloadFile(sessionId, fileParams[0].id, file.id, {
            responseType: 'arraybuffer',
        })
    ).data as unknown as Buffer;
    expect(resData.byteLength).toBeGreaterThan(0);

    // Get metadata of an existing file.
    const resMetadata = await new FileApi(config).getFileMetadata(
        sessionId,
        fileParams[0].id,
        file.id
    );
    expect(resMetadata.status).toBe(200);
    const fileInfo = extractFileInfo(resMetadata.headers);
    expect(fileInfo.filename).toBe(filename);
    expect(fileInfo.size).toBe(data.size);

    // List all files of a specific file-parameter.
    const resList = (await new FileApi(modelConfig).listFiles(sessionId, fileParams[0].id)).data;
    expect(resList.list.file.length).toBeGreaterThan(0);

    // Delete the uploaded file.
    await new FileApi(modelConfig).deleteFile(sessionId, fileParams[0].id, file.id);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});
