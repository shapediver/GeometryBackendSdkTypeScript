/**
 * @export
 * @class TimeoutError
 * @extends {Error}
 */
export class TimeoutError extends Error {
    constructor(
        public field: string,
        msg?: string
    ) {
        super(msg);
        this.name = 'TimeoutError';
    }
}
