const express = require('express');
const ReviewController = require('../controllers/review');

const { reviewUpload, verifyToken } = require('../middlewares');

const router = express.Router();

/*
    상품 리뷰 API
*/

// 전체 상품 후기 목록 조회
router.get('/retrieve', ReviewController.getReviews);

// 특정 상품 후기 등록
router.post(
  '/create',
  verifyToken,
  reviewUpload.single('image'),
  ReviewController.postReview
);

// 조회수 증가
router.put('/hit/:id', ReviewController.updateViewCount);

// 리뷰 추천 증가
router.put('/like/:id', verifyToken, ReviewController.updateLikeOfComment);

module.exports = router;
