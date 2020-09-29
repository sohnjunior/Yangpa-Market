const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Ratelimit = require("express-rate-limit");

/* 
    라우터에 필요한 커스텀 미들웨어를 정의합니다.
*/

// public/images/product 폴더가 없을 경우 생성
fs.readdir("public/images/product", (err) => {
  if (err) {
    console.error("public/images/product 디렉토리가 없어서 생성합니다.");
    fs.mkdirSync("public/images/product");
  }
});

// public/images/review 폴더가 없을 경우 생성
fs.readdir("public/images/review", (err) => {
  if (err) {
    console.error("public/images/review 디렉토리가 없어서 생성합니다.");
    fs.mkdirSync("public/images/review");
  }
});

// 상품 이미지 업로드용 미들웨어
exports.productUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/images/product/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
  }),
});

// 상품 후기 이미지 업로드용 미들웨어
exports.reviewUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/images/review/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
  }),
});

// JWT 토큰 검증 미들웨어
exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        massage: "토큰 만료",
      });
    }

    return res.status(401).json({
      code: 401,
      massage: "유효하지 않은 토큰",
    });
  }
};

//Token Limiter
exports.tokenLimiter = new Ratelimit({
  windowMs: 1000 * 60, //1min : 허용 시간
  max: 10, // 허용 요청 횟수
  delatMs: 0, //호출 간격
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode, //code : 429
      message: "1시간당 1번 요청 가능",
    });
  },
});

//test Api 위한 리미터
exports.apiLimiter = new Ratelimit({
  windowMs: 1000 * 60, //1min
  max: 5,
  delatMs: 0,
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: "1분당 최대 5번 요청 가능",
    });
  },
});
