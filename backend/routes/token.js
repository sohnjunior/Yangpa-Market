const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { verifyToken, tokenLimiter } = require("./middlewares");

const router = express.Router();

router.post("/", tokenLimiter, async (req, res) => {
  try {
    const id = "testid"; //test data

    const token = jwt.sign(
      {
        id,
      },
      process.env.JWT_SECRET
    );

    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
});

router.get("/test", verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;
