const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Ratelimit = require('express-rate-limit');
const { HTTP401Error, HTTP419Error } = require('../utils/errors');

/* 
    라우터에 필요한 커스텀 미들웨어를 정의합니다.
*/

// public/images/product 폴더가 없을 경우 생성
fs.readdir('public/images/product', (err) => {
  if (err) {
    console.error('public/images/product 디렉토리가 없어서 생성합니다.');
    fs.mkdirSync('public/images/product');
  }
});

// public/images/review 폴더가 없을 경우 생성
fs.readdir('public/images/review', (err) => {
  if (err) {
    console.error('public/images/review 디렉토리가 없어서 생성합니다.');
    fs.mkdirSync('public/images/review');
  }
});

// 상품 이미지 업로드용 미들웨어
const productUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/images/product/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + '-' + Date.now() + ext);
    },
  }),
});

// 상품 후기 이미지 업로드용 미들웨어
const reviewUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/images/review/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + '-' + Date.now() + ext);
    },
  }),
});

// JWT 토큰 검증 미들웨어
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
  productUpload,
  reviewUpload,
  verifyToken,
};
