import express from 'express';
import * as OrderController from '../../controllers/order';
import { verifyToken } from '../../middlewares';

const router = express.Router();

router.get('/', verifyToken, OrderController.getOrderHistory); // 전체 판매 내역 조회
router.put('/:id/approve', verifyToken, OrderController.approveOrder); // 구매요청 승인
router.delete('/:id/reject', verifyToken, OrderController.rejectOrder); // 구매요청 삭제

export default router;
