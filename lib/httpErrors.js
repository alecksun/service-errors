'use strict';

const assert = require('assert');
const ServiceError = require('./serviceError');

const HTTP_ERRORS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    ENTITY_TOO_LARGE: 413,
    UNSUPPORTED_MEDIA_TYPE: 415,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    TOO_MANY_REQUESTS: 429,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,

    INTERNAL_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEDOUT: 504
};


class HttpError extends ServiceError {
    constructor (catagory, code, message, innerError) {
        super(catagory, code, message, innerError);

        this._httpCode = HTTP_ERRORS[catagory];
        assert(this._httpCode, `Unknown error catagory: ${catagory || 'NULL'}`);
    }

    get httpCode() {
        return this._httpCode;
    }

    get recoverable() {
        return this.httpCode >= 500 || this.httpCode === 429;
    }
}

class BadRequestError extends HttpError {
    constructor (code, message, innerError) {
        super('BAD_REQUEST', code, message, innerError);
    }    
}

class UnauthorizedError extends HttpError {
    constructor (code, message, innerError) {
        super('UNAUTHORIZED', code, message, innerError);
    }    
}

class ForbiddenError extends HttpError {
    constructor (code, message, innerError) {
        super('FORBIDDEN', code, message, innerError);
    }    
}

class NotFoundError extends HttpError {
    constructor (code, message, innerError) {
        super('NOT_FOUND', code, message, innerError);
    }    
}

class MethodNotAllowedError extends HttpError {
    constructor (code, message, innerError) {
        super('METHOD_NOT_ALLOWED', code, message, innerError);
    }    
}

class ConflictError extends HttpError {
    constructor (code, message, innerError) {
        super('CONFLICT', code, message, innerError);
    }    
}

class EntityTooLargeError extends HttpError {
    constructor (code, message, innerError) {
        super('ENTITY_TOO_LARGE', code, message, innerError);
    }    
}

class UnsupprtedMediaTypeError extends HttpError {
    constructor (code, message, innerError) {
        super('UNSUPPORTED_MEDIA_TYPE', code, message, innerError);
    }    
}

class UnprocessableEntityError extends HttpError {
    constructor (code, message, innerError) {
        super('UNPROCESSABLE_ENTITY', code, message, innerError);
    }    
}

class LockedError extends HttpError {
    constructor (code, message, innerError) {
        super('LOCKED', code, message, innerError);
    }    
}

class TooManyRequestsError extends HttpError {
    constructor (code, message, retryAfter, innerError) {
        super('TOO_MANY_REQUESTS', code, message, innerError);
        this._retryAfter = retryAfter || 60;
    }    

    get headers() {
        return {
            ...super.headers,
            'retry-after': this._retryAfter
        };
    }
}

class UnavailableForLeagalError extends HttpError {
    constructor (code, message, innerError) {
        super('UNAVAILABLE_FOR_LEGAL_REASONS', code, message, innerError);
    }    
}

class InternalError extends HttpError {
    constructor (code, message, innerError) {
        super('INTERNAL_ERROR', code, message, innerError);
    }    
}

class NotImplementedError extends HttpError {
    constructor (code, message, innerError) {
        super('NOT_IMPLEMENTED', code, message, innerError);
    }    
}

class ServiceUnavalableError extends HttpError {
    constructor (code, message, retryAfter, innerError) {
        super('SERVICE_UNAVAILABLE', code, message, innerError);
        this._retryAfter = retryAfter || 60;
    }    

    get headers() {
        return {
            ...super.headers,
            'retry-after': this._retryAfter
        };
    }
}

class GatewayTimedoutError extends HttpError {
    constructor (code, message, innerError) {
        super('GATEWAY_TIMEDOUT', code, message, innerError);
    }    
}

module.exports = {
    HttpError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    MethodNotAllowedError,
    ConflictError,
    EntityTooLargeError,
    UnsupprtedMediaTypeError,
    UnprocessableEntityError,
    LockedError,
    TooManyRequestsError,
    UnavailableForLeagalError,

    InternalError,
    NotImplementedError,
    ServiceUnavalableError,
    GatewayTimedoutError
};
