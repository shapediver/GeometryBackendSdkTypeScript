import { basePath, jwtBackend, jwtModel, modelId, now } from './config';
import {
    Configuration,
    ModelApi,
    QueryComputationStatisticsStatus,
    QueryModelStatus,
    ReqConfigure,
    ReqCustomization,
    ReqModel,
    ReqParameterDefinitions,
    SessionApi,
} from '../src';

test('model config', async () => {
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });

    // Fetch the model configuration.
    const resConfig = (await new ModelApi(modelConfig).getModelConfig(modelId)).data;
    expect(Object.keys(resConfig.viewer.config).length).toBeGreaterThan(0);

    // Update the model configuration. However, for the sake of simplicity, we will re-use the
    // already existing configuration object.
    const reqConfig: ReqConfigure = resConfig.viewer.config;
    await new ModelApi(modelConfig).updateModelConfig(modelId, reqConfig);
});

test('model', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });

    // Fetch a model.
    const resGet = (await new ModelApi(modelConfig).getModel(modelId)).data;
    expect(resGet.model.id).toBe(modelId);

    // Download the model's Grasshopper file.
    const resGh = (
        await new ModelApi(modelConfig).downloadModelFile(modelId, { responseType: 'arraybuffer' })
    ).data as unknown as Buffer;
    expect(resGh.byteLength).toBeGreaterThan(0);

    // Get the model's computation statistics by status.
    const resComp = (
        await new ModelApi(modelConfig).getModelComputations(
            modelId,
            undefined,
            '20240614155603054',
            '20240627072220908',
            QueryComputationStatisticsStatus.SUCCESS
        )
    ).data;
    expect(resComp.computations.length).toBeGreaterThanOrEqual(0);

    // Update a model.
    const reqUpdate: ReqModel = { pub: true, backendaccess: true, use_cdn: true };
    const resUpdate = (await new ModelApi(backendConfig).updateModel(modelId, reqUpdate)).data;
    expect(resUpdate.model.id).toBe(modelId);

    // List all models with a specific status.
    const resList = (await new ModelApi(backendConfig).listModels(QueryModelStatus.DENIED)).data;
    expect(resList.list.model.length).toBeGreaterThan(0);
});

test('cleanup', async () => {
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });

    // Trigger an export cleanup.
    await new ModelApi(modelConfig).cleanupExports(modelId, '2024');

    // Trigger an output cleanup.
    await new ModelApi(modelConfig).cleanupOutputs(modelId, '2024');

    // Trigger an texture cleanup.
    await new ModelApi(modelConfig).cleanupTextures(modelId, '2024');

    // Get the cleanup status.
    const resCleanup = (await new ModelApi(modelConfig).getCleanupStatus(modelId)).data;
    expect(resCleanup.cleanup.length).toBeGreaterThan(0);
});

test('parameters', async () => {
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });

    // Fetch a model.
    const resModel = (await new ModelApi(modelConfig).getModel(modelId)).data;
    expect(resModel.parameters).toBeDefined();
    expect(Object.keys(resModel.parameters!).length).toBeGreaterThan(0);

    // Update the model's parameter default values. However, for the sake of simplicity, we are
    // going to reuse the currently set default values.
    const reqDefval: ReqCustomization = {};
    for (const [id, param] of Object.entries(resModel.parameters!)) reqDefval[id] = param.defval!;
    await new ModelApi(modelConfig).updateParameterDefaultValues(modelId, reqDefval);

    // Update the model's parameter definitions.
    const tooltip = `Updated via TypeScript SDK, ${now()}`;
    const reqParam: ReqParameterDefinitions = {};
    for (const id of Object.keys(resModel.parameters!)) reqParam[id] = { tooltip: tooltip };
    await new ModelApi(modelConfig).updateParameterDefinitions(modelId, reqParam);
});

test('model blocking', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });

    // Fetch a model.
    let resModel = (await new ModelApi(backendConfig).getModel(modelId)).data;
    expect(resModel.setting.model?.blockingReasons?.owner).toBeFalsy();
    expect(resModel.setting.model?.blockingReasons?.creditLimit).toBeFalsy();
    expect(resModel.setting.model?.blockingReasons?.pluginPermission).toBeFalsy();

    // Block the model.
    let reqModel: ReqModel = { blockingReasons: { owner: true } };
    new ModelApi(backendConfig).updateModel(modelId, reqModel);

    // Fetch a model.
    resModel = (await new ModelApi(backendConfig).getModel(modelId)).data;
    expect(resModel.setting.model?.blockingReasons?.owner).toBeTruthy();
    expect(resModel.setting.model?.blockingReasons?.creditLimit).toBeFalsy();
    expect(resModel.setting.model?.blockingReasons?.pluginPermission).toBeFalsy();

    // Init session should not work anymore.
    expect(new SessionApi(modelConfig).createSessionByModel(modelId)).rejects.toThrow();

    // Unblock the model.
    reqModel = { blockingReasons: { owner: false } };
    await new ModelApi(backendConfig).updateModel(modelId, reqModel);

    // Session init should work again.
    const sessionId = (await new SessionApi(modelConfig).createSessionByModel(modelId)).data
        .sessionId;
    await new SessionApi(modelConfig).closeSession(sessionId);
});

test('soft delete and restore', async () => {
    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });

    // Soft-delete a model.
    await new ModelApi(backendConfig).deleteModel(modelId);

    // Fetch the model should not work anymore.
    expect(new ModelApi(modelConfig).getModel(modelId)).rejects.toThrow();

    // Restore the model.
    await new ModelApi(backendConfig).restoreModel(modelId);

    // Fetching the model should work again.
    await new ModelApi(modelConfig).getModel(modelId);
});
