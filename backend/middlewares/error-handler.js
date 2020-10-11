const { BaseError } = require('../utils/errors');

const handleErrors = (err, req, res, next) => {
  if (err instanceof BaseError) {
    const httpCode = err.getStatusCode();
    return res.status(httpCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // general error 를 제외한 나머지 에러는 서버 터미널에만 자세한 내용을 출력해줍니다
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

module.exports = handleErrors;
