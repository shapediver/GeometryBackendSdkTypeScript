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
    const resSession = (await new SessionApi(modelConfig).createSessionByTicket(ticket));
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
    const resUploadReq =
        await new FileApi(config).uploadFile(sessionId, {
            [fileParams[0].id]: {
                filename,
                format,
                size: data.size,
            },
        })
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
    const resData = await (
        await new FileApi(modelConfig).downloadFile(sessionId, fileParams[0].id, file.id)
    ).arrayBuffer();
    expect(resData.byteLength).toBeGreaterThan(0);

    // Get metadata of an existing file.
    const resMetadata = await new FileApi(config).getFileMetadataRaw({
        sessionId,
        paramId: fileParams[0].id,
        fileId: file.id,
    });
    expect(resMetadata.raw.status).toBe(200);
    const fileInfo = extractFileInfo({
        'Content-Length': resMetadata.raw.headers.get('Content-Length'),
        'Content-Disposition': resMetadata.raw.headers.get('Content-Disposition'),
    });
    expect(fileInfo.filename).toBe(filename);
    expect(fileInfo.size).toBe(data.size);

    // List all files of a specific file-parameter.
    const resList = (await new FileApi(modelConfig).listFiles(sessionId, fileParams[0].id));
    expect(resList.list.file.length).toBeGreaterThan(0);

    // Delete the uploaded file.
    await new FileApi(modelConfig).deleteFile(sessionId, fileParams[0].id, file.id);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});
