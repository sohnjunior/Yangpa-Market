import express from 'express';
import * as OrderController from '../../controllers/order.controller';
import { verifyToken } from '../middlewares';

const router = express.Router();

router.get('/', verifyToken, OrderController.getOrderHistory);
router.post('/', verifyToken, OrderController.createOrder);
router.put('/:id/approve', verifyToken, OrderController.approveOrder);
router.put('/:id/reject', verifyToken, OrderController.rejectOrder);
router.delete(':id', verifyToken, OrderController.deleteOrder);

export default router;
