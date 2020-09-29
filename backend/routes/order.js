const express = require('express');
const OrderController = require('../controllers/order');
const { verifyToken } = require('../middlewares');

const router = express.Router();

router.get('/retrieve', verifyToken, OrderController.getSalesHistory); // 전체 판매 내역 조회
router.get('/retrieve/buying', verifyToken, OrderController.getPurchases); // 특정 유저 구매 내역 조회
router.get('/request', verifyToken, OrderController.getPurchaseRequests); // 특정 판매자 미승인(미확인) 주문 요청 내역 조회
router.put('/approve', verifyToken, OrderController.approvePurchase); // 구매요청 승인
router.delete('/denied/:id', verifyToken, OrderController.rejectPurchase); // 구매요청 삭제  // TODO: api denied -> reject 로 변경하기

module.exports = router;
