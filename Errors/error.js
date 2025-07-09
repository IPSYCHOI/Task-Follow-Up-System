export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends CustomError {
    constructor(message = "Recourse Not Found") {
        super(message, 404);
    }
}

export class BadRequestError extends CustomError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}
export class InternalServerError extends CustomError {
    constructor(message = "server error") {
        super(message, 500);
    }
}
export class UnAuthorizedError extends CustomError {
    constructor(message = "Un Authorized") {
        super(message, 401);
    }
}