const express = require("express");
const CartController = require("../controllers/cart");
const { verifyToken } = require("../middlewares");

const router = express.Router();

router.post("/new", verifyToken, CartController.postProduct); // 장바구니 상품 추가
router.get("/retrieve", verifyToken, CartController.getProducts); // 장바구니 상품 조회
router.delete("/delete", verifyToken, CartController.deleteProduct); // 장바구니 상품 삭제
router.post("/buy", verifyToken, CartController.purchaseProduct); // 장바구니 상품 구매 처리

module.exports = router;
