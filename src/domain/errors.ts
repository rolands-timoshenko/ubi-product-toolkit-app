class DataIntegrityError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DataIntegrityError';
    }
}

class HttpError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
    }
}

class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export { DataIntegrityError, HttpError, NotFoundError };
