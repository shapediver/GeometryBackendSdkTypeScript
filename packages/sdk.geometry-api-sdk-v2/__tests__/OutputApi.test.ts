import { Configuration, OutputApi, SessionApi, ReqCustomization, UtilsApi } from '../src';
import { basePath, jwtModel, modelId, createTicket, now } from './config';

test('outputs', async () => {
    const modelConfig = new Configuration({
        basePath,
        accessToken: jwtModel,
    });
    const config = new Configuration({ basePath });

    // Initialize a new session.
    const ticket = await createTicket();
    const resSession = (await new SessionApi(config).createSessionByTicket(ticket)).data;
    const sessionId = resSession.sessionId;
    expect(resSession.outputs).toBeDefined();
    expect(resSession.parameters).toBeDefined();
    expect(Object.keys(resSession.outputs!).length).toBeGreaterThan(0);

    // Get first output.
    const output = Object.values(resSession.outputs!)[0];
    expect(output).toBeDefined();

    // Compute a new output version and wait until the computation has been finished. For the sake
    // of simplicity, we use the default values of all parameters that the output depends on.
    const reqComp: ReqCustomization = {};
    for (const paramId of output.dependency) {
        const defval = resSession.parameters![paramId].defval;
        if (defval) reqComp[paramId] = defval;
    }
    let resComp = await new UtilsApi(config).submitAndWaitForOutput(sessionId, reqComp, -1);
    expect(resComp.outputs).toBeDefined();
    expect(resComp.outputs![output.id]).toBeDefined();

    // Alternatively, we can trigger the output computation without waiting for the result.
    resComp = (await new OutputApi(config).computeOutputs(sessionId, reqComp)).data;
    expect(resComp.outputs).toBeDefined();
    expect(resComp.outputs![output.id]).toBeDefined();

    const outputComp = resComp.outputs![output.id];
    expect(typeof outputComp.version).toBe('string');

    // Get the already computed output from cache.
    const resCached = (
        await new OutputApi(config).getCachedOutputs(sessionId, {
            [output.id]: outputComp.version!,
        })
    ).data;
    expect(resCached.outputs).toBeDefined();
    expect(resCached.outputs![output.id]).toBeDefined();

    // Update the output definition.
    await new OutputApi(modelConfig).updateOutputDefinitions(modelId, {
        [output.id]: { tooltip: `Updated via TypeScript SDK, ${now()}` },
    });

    // List versions of an output.
    const resList = (await new OutputApi(modelConfig).listOutputVersions(sessionId, output.id))
        .data;
    expect(resList.list.output.length).toBeGreaterThan(0);

    // Close the session.
    await new SessionApi(config).closeSession(sessionId);
});
