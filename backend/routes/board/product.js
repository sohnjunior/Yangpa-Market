const express = require('express');
const ProductController = require('../../controllers/product');
const { productUpload, verifyToken } = require('../../middlewares');

const router = express.Router();

router.get('/', ProductController.getProducts); // 전체 상품 게시글 조회

router.get('/:id', ProductController.getProduct); // 특정 상품 게시글 조회

router.get('/search/:keyword', ProductController.searchProducts); // 특정 키워드 기준 상품명 검색 결과

router.post(
  '/create',
  verifyToken,
  productUpload.single('image'),
  ProductController.postProduct
); // 새로운 상품 게시글 생성

router.put('/update/:id', verifyToken, ProductController.updateProduct); // 상품 정보 수정

router.put('/like/:id', verifyToken, ProductController.updateLikeOfProduct); // 상품 좋아요 요청
router.delete('/delete/:id', verifyToken, ProductController.deleteProduct); // 상품 게시글 삭제

module.exports = router;
