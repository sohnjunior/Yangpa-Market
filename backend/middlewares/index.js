const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const { HTTP401Error, HTTP419Error } = require('../utils/errors');

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
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(new HTTP419Error('토큰이 만료되었습니다'));
    }

    next(new HTTP401Error('유효하지 않은 토큰입니다'));
  }
};

module.exports = {
  imageUpload,
  verifyToken,
};
