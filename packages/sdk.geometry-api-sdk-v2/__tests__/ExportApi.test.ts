import {
    Configuration,
    ExportApi,
    ReqCustomization,
    ReqExport,
    SessionApi,
    UtilsApi,
} from '../src';
import { basePath, jwtModel, modelId, createTicket, now } from './config';

test('exports', async () => {
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });
    const config = new Configuration({ basePath });

    // Initialize a new session.
    const ticket = await createTicket();
    const resSession = (await new SessionApi(config).createSessionByTicket(ticket)).data;
    const sessionId = resSession.sessionId;
    expect(resSession.exports).toBeDefined();
    expect(resSession.parameters).toBeDefined();
    expect(Object.keys(resSession.exports!).length).toBeGreaterThan(0);

    // Get first export.
    const export_ = Object.values(resSession.exports!)[0];
    expect(export_).toBeDefined();

    // Compute a new export version and wait until the computation has been finished. For the sake
    // of simplicity, we use the default values of all parameters that the export depends on.
    const parameters: ReqCustomization = {};
    for (const paramId of export_.dependency) {
        const defval = resSession.parameters![paramId].defval;
        if (defval) parameters[paramId] = defval;
    }
    const reqComp: ReqExport = { exports: [export_.id], parameters };
    let resComp = await new UtilsApi(config).submitAndWaitForExport(sessionId, reqComp, -1);
    expect(resComp.exports).toBeDefined();
    expect(resComp.exports![export_.id]).toBeDefined();

    // Alternatively, we can trigger the export computation without waiting for the result.
    resComp = (await new ExportApi(config).computeExports(sessionId, reqComp)).data;
    expect(resComp.exports).toBeDefined();
    expect(resComp.exports![export_.id]).toBeDefined();

    const exportComp = resComp.exports![export_.id];
    expect(typeof exportComp.version).toBe('string');

    // Get the already computed export from cache.
    const resCached = (
        await new ExportApi(config).getCachedExports(sessionId, {
            [export_.id]: exportComp.version as string,
        })
    ).data;
    expect(resCached.exports).toBeDefined();
    expect(resCached.exports![export_.id]).toBeDefined();

    // Update the export definition.
    await new ExportApi(modelConfig).updateExportDefinitions(modelId, {
        [export_.id]: { tooltip: `Updated via TypeScript SDK, ${now()}` },
    });

    // List versions of an export.
    const resList = (await new ExportApi(modelConfig).listExportVersions(sessionId, export_.id))
        .data;
    expect(resList.list.export.length).toBeGreaterThan(0);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});
