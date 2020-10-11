const express = require('express');
const ReviewController = require('../../controllers/review');
const { reviewUpload, verifyToken } = require('../../middlewares');
const { checkBodyNull } = require('../../middlewares/validator');

const router = express.Router();

router.get('/', ReviewController.getReviews); // 전체 상품 후기 목록 조회
router.post(
  '/',
  verifyToken,
  checkBodyNull,
  reviewUpload.single('image'),
  ReviewController.postReview
); // 특정 상품 후기 등록
router.put('/:id/hit', ReviewController.updateViewCount); // 조회수 증가
router.put('/:id/like', verifyToken, ReviewController.updateLikeOfComment); // 리뷰 추천 증가

module.exports = router;
