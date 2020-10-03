const express = require('express');
const RecommendController = require('../../controllers/recommend');

const router = express.Router();

/*
    상품 추천 API
*/

// 전체 카테고리 내 인기 상품 추천
router.get('/', RecommendController.getPopularProducts);

// 연관 상품 추천
router.get('/:id', RecommendController.getRelatedProducts);

module.exports = router;
