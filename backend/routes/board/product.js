const express = require('express');
const ProductController = require('../../controllers/product');
const { productUpload, verifyToken } = require('../../middlewares');
const { checkBodyNull } = require('../../middlewares/validator');

const router = express.Router();

router.get('/', ProductController.getProducts); // 전체 상품 게시글 조회
router.get('/search', ProductController.searchProducts); // 특정 키워드 기준 상품명 검색 결과
router.get('/:id', ProductController.getProduct); // 특정 상품 게시글 조회

router.post(
  '/',
  verifyToken,
  checkBodyNull,
  productUpload.single('image'),
  ProductController.postProduct
); // 새로운 상품 게시글 생성

router.put('/:id/like', verifyToken, ProductController.updateLikeOfProduct); // 상품 좋아요 요청
router.put('/:id', verifyToken, checkBodyNull, ProductController.updateProduct); // 상품 정보 수정
router.delete('/:id', verifyToken, ProductController.deleteProduct); // 상품 게시글 삭제

module.exports = router;
