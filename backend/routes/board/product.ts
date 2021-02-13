import express from 'express';
import * as ProductController from '../../controllers/product.controller';
import { uploadImage, verifyToken } from '../middlewares';
import { checkBodyNull } from '../middlewares/validator';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/search', ProductController.searchProducts);
router.get('/:id', ProductController.getProduct);

router.post(
  '/',
  verifyToken,
  checkBodyNull,
  uploadImage('product').single('image'),
  ProductController.createProduct
);

router.put('/:id/like', verifyToken, ProductController.updateLikeOfProduct);
router.put('/:id', verifyToken, checkBodyNull, ProductController.updateProduct);
router.delete('/:id', verifyToken, ProductController.deleteProduct);

export default router;
