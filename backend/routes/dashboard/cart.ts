import express from 'express';
import * as CartController from '../../controllers/cart.controller';
import { verifyToken } from '../middlewares';
import { checkBodyNull } from '../middlewares/validator';

const router = express.Router();

router.get('/self/products', verifyToken, CartController.getAllCartProducts);
router.post(
  '/self/products',
  verifyToken,
  checkBodyNull,
  CartController.createCartProduct
);
// router.post(
//   '/self/products/purchase',
//   verifyToken,
//   checkBodyNull,
//   CartController.purchaseProduct
// );
router.delete(
  '/self/products/:id',
  verifyToken,
  CartController.deleteCartProduct
);

export default router;
