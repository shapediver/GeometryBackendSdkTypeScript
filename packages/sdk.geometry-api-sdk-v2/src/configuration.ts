import {
    Configuration as ClientConfig,
    ConfigurationParameters as ClientConfigParams,
} from './client/configuration';

export interface ConfigurationParameters extends ClientConfigParams {}

export class Configuration extends ClientConfig {
    protected readonly sdkVersion = '1.12.1'; // WARNING: This value is updated automatically!

    constructor(param: ConfigurationParameters = {}) {
        super(param);

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
