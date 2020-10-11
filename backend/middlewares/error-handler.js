const { BaseError } = require('../utils/errors');

const handleErrors = (err, req, res, next) => {
  if (err instanceof BaseError) {
    const httpCode = err.getStatusCode();
    return res.status(httpCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

module.exports = handleErrors;
