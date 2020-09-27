const express = require("express");
const fs = require("fs");
const { reviewUpload, verifyToken } = require("./middlewares");
const { User, Review } = require("../models");

const router = express.Router();

/*
    상품 리뷰 API
*/

// 전체 상품 후기 목록 조회
router.get("/retrieve", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: {
        model: User,
        attributes: ["email", "nickname"],
      },
      order: [["createdAt", "DESC"]],
    });

    // 이미지 파일을 읽어 바이너리 형태로 전송해줌
    reviews.forEach((review) => {
      const imagePath = review.dataValues.image;
      const data = fs.readFileSync("public/images/review/" + imagePath);
      let base64 = Buffer.from(data).toString("base64");
      base64 = `data:image/png;base64,${base64}`;
      review.dataValues.image = base64;
    });

    res.json({ reviews: reviews });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 특정 상품 후기 등록
router.post(
  "/create",
  verifyToken,
  reviewUpload.single("image"),
  async (req, res, next) => {
    try {
      // user 찾기
      const user = await User.findOne({ where: { email: req.body.email } });

      // Review 생성
      await Review.create({
        title: req.body.title,
        body: req.body.body,
        rating: req.body.rating,
        image: req.file.filename,
        userId: user.id,
      });

      res.json({ result: "success" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

// 조회수 증가
router.put("/hit/:id", async (req, res, next) => {
  try {
    const review = await Review.findOne({ where: { id: req.params.id } });
    await Review.update(
      { hit: review.dataValues.hit + 1 },
      { where: { id: review.dataValues.id } }
    );
    res.json({ msg: "success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 리뷰 추천 증가
router.put("/like/:id", verifyToken, async (req, res, next) => {
  try {
    const review = await Review.findOne({ where: { id: req.params.id } });
    await Review.update(
      { like: review.dataValues.like + 1 },
      { where: { id: review.dataValues.id } }
    );
    res.json({ msg: "success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
