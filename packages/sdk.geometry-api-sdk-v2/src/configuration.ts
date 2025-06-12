import { RawAxiosRequestConfig } from 'axios';
import {
    Configuration as ClientConfig,
    ConfigurationParameters as ClientConfigParams,
} from './client/configuration';

export interface ConfigurationParameters
    extends Pick<ClientConfigParams, 'accessToken' | 'basePath'> {
    /**
     * Base options for Axios calls.
     *
     * @type {RawAxiosRequestConfig}
     * @memberof ConfigurationParameters
     */
    baseOptions?: RawAxiosRequestConfig;

    /**
     * Enables the use of a custom Axios instance for all API requests by default, instead of the
     * global Axios instance. This custom instance includes additional functionality to
     * automatically retry requests on `429` and `502` status codes.
     *
     * Default: `true`.
     */
    useCustomAxios?: boolean;

    /**
     * Specifies the maximum number of automatic HTTP retries for failed requests.
     *
     * **Note:** This setting is only applicable when using a custom Axios instance.
     *
     * Default: `5`
     */
    maxRetries?: number;
}

export class Configuration extends ClientConfig {
    protected readonly sdkVersion = '2.6.0'; // WARNING: This value is updated automatically!

    public readonly useCustomAxios: boolean;
    public readonly maxRetries: number;

    constructor(param: ConfigurationParameters = {}) {
        super(param);
        this.useCustomAxios = param.useCustomAxios ?? true;
        this.maxRetries = param.maxRetries ?? 5;

        this.baseOptions = this.baseOptions ?? {};
        this.baseOptions.headers = this.baseOptions.headers ?? {};

        const userAgent = `sd-sdk/typescript/${this.sdkVersion}`;

        if (typeof process === 'object' && !this.baseOptions.headers['User-Agent']) {
            // Overwrite User-Agent on Node.js applications.
            this.baseOptions.headers['User-Agent'] = userAgent;
        } else if (!this.baseOptions.headers['x-shapediver-useragent']) {
            // Set a custom User-Agent header on Browser applications.
            this.baseOptions.headers['x-shapediver-useragent'] = userAgent;
        }
    }
}
