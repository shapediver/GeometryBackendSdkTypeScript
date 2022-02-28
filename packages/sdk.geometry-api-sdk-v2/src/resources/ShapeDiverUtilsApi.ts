import {
    ShapeDiverRequestCache,
    ShapeDiverRequestCustomization,
    ShapeDiverRequestExport,
    ShapeDiverResponseDto,
    ShapeDiverResponseExport,
    ShapeDiverResponseOutput,
} from "@shapediver/api.geometry-api-dto-v2"
import {
    BaseResourceApi,
    ShapeDiverError,
    ShapeDiverSdkApi,
    ShapeDiverSdkApiResponseType,
} from "@shapediver/sdk.geometry-api-sdk-core"
import { ShapeDiverSdk } from "../ShapeDiverSdk"
import { sendRequest, sleep } from "../utils/utils"

export class ShapeDiverUtilsApi extends BaseResourceApi {

    constructor (api: ShapeDiverSdkApi) {
        super(api)
    }

    /**
     * Upload the given file to the specified URL.
     *
     * @param url
     * @param data
     * @param contentType
     */
    async upload (url: string, data: ArrayBuffer, contentType: string): Promise<any> {
        return await sendRequest(async () => this.api.put<any>(url, data, {
            contentType: contentType,
            responseType: ShapeDiverSdkApiResponseType.JSON,
            disableAuthorization: true,
            disableCustomHeaders: true,
        }))
    }

    /**
     * Download from the given URL.
     *
     * @param url
     * @param responseType
     */
    async download (url: string, responseType: ShapeDiverSdkApiResponseType): Promise<any> {
        return await sendRequest(async () => this.api.get<any>(url, {
            contentType: "application/json",
            responseType: responseType,
            disableAuthorization: true,
            disableCustomHeaders: true,
        }))
    }

    /**
     * Submit a customization request and wait for the result to be finished.
     *
     * @param sdk
     * @param sessionId
     * @param body
     * @param maxWaitMsec - Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @returns
     */
    async submitAndWaitForCustomization (
        sdk: ShapeDiverSdk,
        sessionId: string,
        body: ShapeDiverRequestCustomization,
        maxWaitMsec = -1,
    ): Promise<ShapeDiverResponseDto> {
        const startMsec = Date.now()
        const dto = await sendRequest(async () => sdk.output.customize(sessionId, body))
        const waitMsec = Date.now() - startMsec

        // Reduce the total max waiting time by the amount the customization-request took
        maxWaitMsec = (maxWaitMsec < 0) ? maxWaitMsec : Math.max(0, maxWaitMsec - waitMsec)

        return ShapeDiverUtilsApi.waitForCustomizationResult(sdk, sessionId, dto, maxWaitMsec)
    }

    /**
     * Submit an export request and wait for the result to be finished.
     *
     * @param sdk
     * @param sessionId
     * @param body
     * @param maxWaitMsec - Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @returns
     */
    async submitAndWaitForExport (
        sdk: ShapeDiverSdk,
        sessionId: string,
        body: ShapeDiverRequestExport,
        maxWaitMsec = -1,
    ): Promise<ShapeDiverResponseDto> {
        const startMsec = Date.now()
        const dto = await sendRequest(async () => sdk.export.compute(sessionId, body))
        const waitMsec = Date.now() - startMsec

        // Reduce the total max waiting time by the amount the compute-request took
        maxWaitMsec = (maxWaitMsec < 0) ? maxWaitMsec : Math.max(0, maxWaitMsec - waitMsec)

        return ShapeDiverUtilsApi.waitForExportResult(sdk, sessionId, dto, body.exports.id, maxWaitMsec)
    }

    /**
     * Given a DTO resulting from a customization request, wait for the results to be finished.
     *
     * @param sdk
     * @param sessionId
     * @param dto
     * @param maxWaitMsec - Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @returns
     */
    private static async waitForCustomizationResult (
        sdk: ShapeDiverSdk,
        sessionId: string,
        dto: ShapeDiverResponseDto,
        maxWaitMsec = -1,
    ): Promise<ShapeDiverResponseDto> {
        if (!dto.outputs) throw new ShapeDiverError("The given DTO does not contain any outputs")

        // Build new cache request
        const outputVersions: ShapeDiverRequestCache = {}
        Object
            .keys(dto.outputs)
            .forEach(id => outputVersions[id] = (dto.outputs![id] as ShapeDiverResponseOutput).version)

        let delay = ShapeDiverUtilsApi.getMaxOutputDelay(dto)
        const startMsec = Date.now()

        while (delay > 0) {
            // Check whether maxWaitMsec has been reached
            if (maxWaitMsec >= 0) {
                const waitMsec = Date.now() - startMsec
                if (waitMsec >= maxWaitMsec) {
                    throw new ShapeDiverError(`Maximum wait time of ${ maxWaitMsec } ms reached`)
                }
                if (waitMsec + delay > maxWaitMsec) {
                    delay = maxWaitMsec - waitMsec
                }
            }

            await sleep(delay)

            // Send cache request
            dto = await sendRequest(async () => sdk.output.getCache(sessionId, outputVersions))
            delay = ShapeDiverUtilsApi.getMaxOutputDelay(dto)
        }

        return dto
    }

    /**
     * Given a DTO resulting from an export request, wait for the result to be finished.
     *
     * @param sdk
     * @param sessionId
     * @param dto
     * @param exportId
     * @param maxWaitMsec - Maximum duration to wait for result (in milliseconds), pass value < 0 to disable limit.
     * @returns
     */
    private static async waitForExportResult (
        sdk: ShapeDiverSdk,
        sessionId: string,
        dto: ShapeDiverResponseDto,
        exportId: string,
        maxWaitMsec = -1,
    ): Promise<ShapeDiverResponseDto> {
        if (!dto.exports) throw new ShapeDiverError("The given DTO does not contain any exports")

        // Build new cache request
        const exportVersion: ShapeDiverRequestCache = { [exportId]: (dto.exports![exportId] as ShapeDiverResponseExport).version! }
        if (!dto.exports) throw new ShapeDiverError(`Could not find any export with the id '${ exportId }'`)

        let delay = ShapeDiverUtilsApi.getExportDelay(dto, exportId)
        const startMsec = Date.now()

        while (delay > 0) {
            // Check whether maxWaitMsec has been reached
            if (maxWaitMsec >= 0) {
                const waitMsec = Date.now() - startMsec
                if (waitMsec >= maxWaitMsec) {
                    throw new ShapeDiverError(`Maximum wait time of ${ maxWaitMsec } ms reached`)
                }
                if (waitMsec + delay > maxWaitMsec) {
                    delay = maxWaitMsec - waitMsec
                }
            }

            await sleep(delay)

            // Send cache request
            dto = await sendRequest(async () => sdk.export.getCache(sessionId, exportVersion))
            delay = ShapeDiverUtilsApi.getExportDelay(dto, exportId)
        }

        return dto
    }

    /**
     * Get the maximum delay which was reported for output versions.
     *
     * @param dto
     * @returns maximum delay, -1 in case no delay was reported
     */
    private static getMaxOutputDelay (dto: ShapeDiverResponseDto): number {
        return Math.max(
            ...Object.values(dto.outputs!)
                .map(output => output as ShapeDiverResponseOutput)
                .map(output => output.delay ?? -1),
        )
    }

    /**
     * Get the delay which was reported for the export.
     *
     * @param dto
     * @param exportId
     * @returns delay, -1 in case no delay was reported
     */
    private static getExportDelay (dto: ShapeDiverResponseDto, exportId: string): number {
        return (dto.exports![exportId] as ShapeDiverResponseExport).delay ?? -1
    }

}
