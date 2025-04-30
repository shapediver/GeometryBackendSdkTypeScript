import { basePath, jwtBackend, createTicket, now, readFile } from './config';
import {
    Configuration,
    exists,
    ModelStateApi,
    ReqModelState,
    ResParameterType,
    SessionApi,
    UtilsApi,
} from '../src';

test('basic model state', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });
    const config = new Configuration({ basePath });

    // Initialize a new session.
    const ticket = await createTicket();
    const resSession = (await new SessionApi(config).createSessionByTicket(ticket)).data;
    expect(resSession.parameters).toBeDefined();
    const sessionId = resSession.sessionId;

    // The value of the first string parameter will be overwritten by the Model-State.
    const strParams = Object.values(resSession.parameters!).filter(
        (param) => param.type == ResParameterType.STRING
    );
    expect(strParams.length).toBeGreaterThan(0);

    const customParamId = strParams[0].id;
    const customParamValue = now();
    const customData = { foo: 'bar' };

    // Create a new Model-State.
    const reqModelState: ReqModelState = {
        parameters: { [customParamId]: customParamValue },
        data: customData,
    };
    const resModelState = (
        await new ModelStateApi(config).createModelState(sessionId, reqModelState)
    ).data;
    const modelStateId = resModelState.modelState.id;

    // Check if the Model-State was created successfully.
    const resMetadata = await new ModelStateApi(config).getModelStateMetadata(modelStateId);
    expect(resMetadata.status).toBe(200);

    // Or use the helper function to check if the Model-State was created successfully.
    expect(
        await exists(() => new ModelStateApi(config).getModelStateMetadata(modelStateId))
    ).toBeTruthy();

    // Fetch all available information of the Model-State.
    const resModelStateInfo = (await new ModelStateApi(config).getModelState(modelStateId)).data;
    let parameter = resModelStateInfo.modelState.parameters[customParamId];
    expect(parameter).toStrictEqual(customParamValue);
    expect(resModelStateInfo.modelState.data).toStrictEqual(customData);
    expect(resModelStateInfo.modelState.imageUrl).toBeUndefined();

    // Fetch only parameters and data of the Model-State.
    const resModelStateData = (await new ModelStateApi(config).getModelStateData(modelStateId))
        .data;
    parameter = resModelStateData.modelState.parameters[customParamId];
    expect(parameter).toStrictEqual(customParamValue);
    expect(resModelStateData.modelState.data).toStrictEqual(customData);

    // Check if the Model-State has an image.
    expect(
        await exists(() => new ModelStateApi(config).getModelStateImageMetadata(modelStateId))
    ).toBeFalsy();

    // Fetch all Model-States of a model.
    const resList = (
        await new ModelStateApi(backendConfig).listModelStates(resModelState.modelState.modelId)
    ).data;
    expect(resList.list.modelState.length).toBeGreaterThan(0);

    // Delete the Model-State.
    await new ModelStateApi(backendConfig).deleteModelState(modelStateId);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});

test('model state with image', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });
    const config = new Configuration({ basePath });

    // Initialize a new session.
    const ticket = await createTicket();
    const resSession = (await new SessionApi(config).createSessionByTicket(ticket)).data;
    const sessionId = resSession.sessionId;

    const filename = 'shapediverLogo.jpg';
    const format = 'image/jpeg';
    const data = readFile('__tests__/data/logo.jpg', format);

    // Create a new Model-State and request an image upload.
    const reqModelState: ReqModelState = {
        parameters: {},
        image: { filename, format, size: data.size },
    };
    const resModelState = (
        await new ModelStateApi(config).createModelState(sessionId, reqModelState)
    ).data;
    expect(resModelState.asset).toBeDefined();
    expect(resModelState.asset!.modelState).toBeDefined();
    const modelStateId = resModelState.modelState.id;
    const image = resModelState.asset!.modelState;

    // Upload the image.
    const resUpload = await new UtilsApi().uploadAsset(
        image.href,
        await data.arrayBuffer(),
        image.headers
    );
    expect(resUpload.status).toBe(200);

    // Check if the Model-State has an image.
    const resImageMetadata = await new ModelStateApi(config).getModelStateImageMetadata(
        modelStateId
    );
    expect(resImageMetadata.status).toBe(200);

    // Or use the helper function to check if the Model-State has an image.
    expect(
        await exists(() => new ModelStateApi(config).getModelStateImageMetadata(modelStateId))
    ).toBeTruthy();

    // Download the uploaded image.
    const resImage = (
        await new ModelStateApi(config).downloadModelStateImage(modelStateId, {
            responseType: 'arraybuffer',
        })
    ).data as unknown as Buffer;
    expect(resImage.byteLength).toBeGreaterThan(0);

    // Fetch all available information of the Model-State.
    const resModelStateInfo = (await new ModelStateApi(config).getModelState(modelStateId)).data;
    expect(resModelStateInfo.modelState.parameters).toBeDefined();
    expect(resModelStateInfo.modelState.data).toBeUndefined();
    expect(resModelStateInfo.modelState.imageUrl).toBeDefined();

    // Delete the Model-State.
    await new ModelStateApi(backendConfig).deleteModelState(modelStateId);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});
