const { HTTP400Error } = require('../utils/errors');

const checkBodyNull = (req, res, next) => {
  let valid = true;
  for (const field in req.body) {
    if (!!req.body[field]) {
      valid = false;
      break;
    }
  }

  if (!valid) next(new HTTP400Error('요청 인자가 부족합니다'));
  next();
};

module.exports = { checkBodyNull };
