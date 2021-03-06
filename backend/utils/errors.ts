const HTTP_STATUS_CODE = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  REFRESH_TOKEN_EXPIRED: 418,
  ACCESS_TOKEN_EXPIRED: 419,
};

class BaseError extends Error {
  name: string;
  httpCode: number;
  isOperational: boolean;

  constructor(
    name: string,
    httpCode: number,
    isOperational: boolean,
    message: string
  ) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
  }

  public getStatusCode() {
    return this.httpCode;
  }
}

class HTTP400Error extends BaseError {
  constructor(message: string) {
    super('BAD_REQUEST', HTTP_STATUS_CODE.BAD_REQUEST, true, message);
  }
}

class HTTP401Error extends BaseError {
  constructor(message: string) {
    super('UNAUTHORIZED', HTTP_STATUS_CODE.UNAUTHORIZED, true, message);
  }
}

class HTTP404Error extends BaseError {
  constructor(message: string) {
    super('NOT_FOUND', HTTP_STATUS_CODE.NOT_FOUND, true, message);
  }
}

class HTTP418Error extends BaseError {
  constructor(message: string) {
    super(
      'REFRESH_TOKEN_EXPIRED',
      HTTP_STATUS_CODE.REFRESH_TOKEN_EXPIRED,
      true,
      message
    );
  }
}

class HTTP419Error extends BaseError {
  constructor(message: string) {
    super(
      'ACCESS_TOKEN_EXPIRED',
      HTTP_STATUS_CODE.ACCESS_TOKEN_EXPIRED,
      true,
      message
    );
  }
}

export {
  BaseError,
  HTTP400Error,
  HTTP401Error,
  HTTP404Error,
  HTTP418Error,
  HTTP419Error,
};
