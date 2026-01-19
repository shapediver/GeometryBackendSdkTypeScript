import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder/TextDecoder for jsdom environment
global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

// Polyfill Blob.text() and Blob.arrayBuffer() for jsdom environment
if (typeof Blob !== 'undefined') {
    if (!Blob.prototype.arrayBuffer) {
        Blob.prototype.arrayBuffer = async function (): Promise<ArrayBuffer> {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as ArrayBuffer);
                reader.onerror = () => reject(reader.error);
                reader.readAsArrayBuffer(this);
            });
        };
    }

    if (!Blob.prototype.text) {
        Blob.prototype.text = async function (): Promise<string> {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = () => reject(reader.error);
                reader.readAsText(this);
            });
        };
    }
}
