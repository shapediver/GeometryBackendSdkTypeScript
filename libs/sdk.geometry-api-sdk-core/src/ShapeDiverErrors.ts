export class ShapeDiverError {

    constructor (
        public readonly message: string,
    ) {
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
    ) {
        super(message)
    }

}
