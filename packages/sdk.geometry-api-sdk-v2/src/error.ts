import { ResErrorType } from './client';

/**
 * Represents a generic (non-request and non-response) error.
 *
 * Something happened in setting up the request that triggered an Error.
 * @export
 * @class SdError
 * @extends {Error}
 */
export class SdError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SdError';
    }
}

/**
 * This error builds on top of an Axios request error.
 *
 * The request was made but no response was received.
 * @export
 * @class SdRequestError
 * @extends {Error}
 */
export class SdRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SdRequestError';
    }
}

/**
 * This error builds on top of an Axios response error.
 *
 * The request was made and the server responded with a status code that falls out of the range of
 * 2xx.
 * @export
 * @class SdResponseError
 * @extends {Error}
 */
export class SdResponseError extends Error {
    /** The HTTP status code from the server response. */
    public readonly status: number;

    /** The type of the error. */
    public readonly type: ResErrorType;

    /** General description of the error type. */
    public readonly description: string;

    constructor(status: number, message: string, desc: string, type?: string) {
        super(message);
        this.name = 'SdResponseError';
        this.status = status;
        this.description = desc;
        this.type =
            type && Object.values(ResErrorType).includes(type as ResErrorType)
                ? (type as ResErrorType)
                : ResErrorType.UNKNOWN;
    }
}

/**
 * @export
 * @class IllegalArgumentError
 * @extends {Error}
 */
export class IllegalArgumentError extends Error {
    constructor(
        public field: string,
        msg?: string
    ) {
        super(msg);
        this.name = 'IllegalArgumentError';
    }
}

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
