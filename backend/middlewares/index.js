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

const verifyToken = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.decoded = user;
      next();
    } else {
      if (err.name === 'TokenExpiredError') {
        next(new HTTP419Error('토큰이 만료되었습니다'));
      }

      next(new HTTP401Error('유효하지 않은 토큰입니다'));
    }
  })(req, res, next);
};

module.exports = {
  imageUpload,
  verifyToken,
};
