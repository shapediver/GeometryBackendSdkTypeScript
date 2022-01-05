export class ShapeDiverError extends Error {

    constructor (message: string) {
        super(message)
    }

}

export class ShapeDiverRequestError extends ShapeDiverError {

    constructor (
        public readonly desc: string,
        message: string,
    ) {
        super(message)
    }

}

export class ShapeDiverResponseError extends ShapeDiverError {

    constructor (
        public readonly status: number,
        public readonly error: string,
        public readonly desc: string,
        message: string,
        public readonly headers: { [key: string]: any },
    ) {
        super(message)
    }

}
