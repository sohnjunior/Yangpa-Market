const HTTP_STATUS_CODE = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOKEN_EXPIRED: 419,
};

class BaseError extends Error {
  constructor(name, httpCode, isOperational, message) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
  }

  getStatusCode = () => this.httpCode;
}

class HTTP400Error extends BaseError {
  constructor(message) {
    super('BAD_REQUEST', HTTP_STATUS_CODE.BAD_REQUEST, true, message);
  }
}

class HTTP401Error extends BaseError {
  constructor(message) {
    super('UNAUTHORIZED', HTTP_STATUS_CODE.UNAUTHORIZED, true, message);
  }
}

class HTTP404Error extends BaseError {
  constructor(message) {
    super('NOT_FOUND', HTTP_STATUS_CODE.NOT_FOUND, true, message);
  }
}

class HTTP419Error extends BaseError {
  constructor(message) {
    super('TOKEN_EXPIRED', HTTP_STATUS_CODE.TOKEN_EXPIRED, true, message);
  }
}

module.exports = {
  BaseError,
  HTTP400Error,
  HTTP401Error,
  HTTP404Error,
  HTTP419Error,
};
