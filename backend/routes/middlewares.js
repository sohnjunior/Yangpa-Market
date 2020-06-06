const jwt = require("jsonwebtoken");
const Ratelimit = require("express-rate-limit");

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

exports.destroyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    
    req.headers.authorization = undefined;//Destroy token

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        massage: "토큰 만료",
      });
    }
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
      message: "1분당 1번 요청 가능",
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
