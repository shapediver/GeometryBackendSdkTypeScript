import { Configuration, ReqTicketType, SessionApi } from '../src';
import fs from 'fs';

export const basePath = 'https://sddev2.eu-central-1.shapediver.com';
export const jwtBackend = '';
export const jwtModel = '';
export const modelId = '1393fc7c-7e9c-488a-99a9-6df70dad17c8';

/** Create a ticket for the backend. */
export async function createTicket(): Promise<string> {
    const reqTicket = {
        pub: true,
        author: true,
        type: ReqTicketType.BACKEND,
        until: now(120),
    };

    const backendConfig = new Configuration({
        basePath,
        accessToken: jwtBackend,
    });
    const sessionApi = new SessionApi(backendConfig);

    return (await sessionApi.createTicket(modelId, reqTicket)).data.ticket;
}

/**
 * Return the date time in numeric ISO-8601 format.
 * @param diff - The time difference in seconds, added to the current time.
 * @returns Numeric timestamp in format "YYYYMMDDhhmmss"
 */
export function now(diff?: number): string {
    const currentTime = new Date();

    if (diff) currentTime.setTime(currentTime.getTime() + diff * 1000);

    return currentTime.toISOString().replace(/[-:T]/g, '').slice(0, 14);
}

/**
 * Reads a file from disk and returns it as a Blob, which can be used to fake a Browser File object
 * in Node.js v20 and later.
 */
export function readFile(filePath: string, mimeType?: string): Blob {
    const buffer = fs.readFileSync(filePath);
    const arrayBuffer = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
    );

    const options = mimeType ? { type: mimeType } : undefined;
    return new Blob([arrayBuffer], options);
}
