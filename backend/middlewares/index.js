const multer = require('multer');
const path = require('path');
const { HTTP401Error, HTTP419Error } = require('../utils/errors');
const passport = require('passport');

const imageUpload = (dirname) =>
  multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, `public/images/${dirname}/`);
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(
          null,
          path.basename(file.originalname, ext) + '-' + Date.now() + ext
        );
      },
    }),
  });

// 토큰오류 확인방법 : https://github.com/mikenicholson/passport-jwt/issues/75
const verifyToken = (req, res, next) => {
  passport.authenticate(
    'access-token',
    { session: false },
    (err, user, info) => {
      if (user) {
        req.decoded = user;
        return next();
      }

      if (info.name === 'TokenExpiredError') {
        return next(new HTTP419Error('토큰이 만료되었습니다'));
      }

      next(new HTTP401Error('유효하지 않은 토큰입니다'));
    }
  )(req, res, next);
};

module.exports = {
  imageUpload,
  verifyToken,
};
