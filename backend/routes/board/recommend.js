const express = require('express');
const RecommendController = require('../../controllers/recommend');

const router = express.Router();

router.get('/', RecommendController.getPopularProducts); // 전체 카테고리 내 인기 상품 추천
router.get('/:id', RecommendController.getRelatedProducts); // 연관 상품 추천

module.exports = router;
