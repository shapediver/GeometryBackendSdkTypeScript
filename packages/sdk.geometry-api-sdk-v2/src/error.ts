import { ResErrorType } from './client';

/**
 * Represents a generic ShapeDiver error.
 *
 * Something happened in setting up the request that triggered an Error.
 * @export
 * @class SdGeometryError
 * @extends {Error}
 */
export class SdGeometryError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'SdGeometryError';
    }
}

/**
 * This error builds on top of an Axios request error.
 *
 * The request was made but no response was received.
 * @export
 * @class RequestError
 * @extends {SdGeometryError}
 */
export class RequestError extends SdGeometryError {
    constructor(message: string) {
        super(message);
        this.name = 'RequestError';
    }
}

/**
 * This error builds on top of an Axios response error.
 *
 * The request was made and the server responded with a status code that falls out of the range of
 * 2xx.
 * @export
 * @class ResponseError
 * @extends {SdGeometryError}
 */
export class ResponseError extends SdGeometryError {
    /** The HTTP status code from the server response. */
    public readonly status: number;

    /** The type of the error. */
    public readonly type: ResErrorType;

    /** General description of the error type. */
    public readonly description: string;

    constructor(status: number, message: string, desc: string, type?: string) {
        super(message);
        this.name = 'ResponseError';
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
 * @extends {SdGeometryError}
 */
export class IllegalArgumentError extends SdGeometryError {
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
 * @extends {SdGeometryError}
 */
export class TimeoutError extends SdGeometryError {
    constructor(
        public field: string,
        msg?: string
    ) {
        super(msg);
        this.name = 'TimeoutError';
    }
}
