import express from 'express';
import * as OrderController from '../../controllers/order.controller';
import { verifyToken } from '../middlewares';

const router = express.Router();

router.get('/', verifyToken, OrderController.getOrderHistory);
router.put('/:id/approve', verifyToken, OrderController.approveOrder);
router.delete('/:id/reject', verifyToken, OrderController.rejectOrder);

export default router;
