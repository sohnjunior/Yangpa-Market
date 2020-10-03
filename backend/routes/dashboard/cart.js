const express = require('express');
const CartController = require('../../controllers/cart');
const { verifyToken } = require('../../middlewares');

const router = express.Router();

router.get('/self/products', verifyToken, CartController.getProducts); // 장바구니 상품 조회
router.post('/self/products', verifyToken, CartController.postProduct); // 장바구니 상품 추가
router.post(
  '/self/products/purchase',
  verifyToken,
  CartController.purchaseProduct
); // 장바구니 상품 구매 처리
router.delete('/self/products/:id', verifyToken, CartController.deleteProduct); // 장바구니 상품 삭제

module.exports = router;
