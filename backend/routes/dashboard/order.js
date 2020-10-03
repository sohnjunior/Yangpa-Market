const express = require('express');
const OrderController = require('../../controllers/order');
const { verifyToken } = require('../../middlewares');

const router = express.Router();

router.get('/', verifyToken, OrderController.getOrderHistory); // 전체 판매 내역 조회
router.put('/:id/approve', verifyToken, OrderController.approveOrder); // 구매요청 승인
router.delete('/:id/reject', verifyToken, OrderController.rejectOrder); // 구매요청 삭제

module.exports = router;
