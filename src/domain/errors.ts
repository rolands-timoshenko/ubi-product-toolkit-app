class DataIntegritiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DataIntegritiError';
    }
}

class HttpError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.name = 'HTTPError';
        this.status = status;
    }
}

class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export { DataIntegritiError, HttpError, NotFoundError };
