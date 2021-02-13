import { Request, Response, NextFunction } from 'express';
import * as CartService from '../services/cart.service';

async function createCartProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.decoded;
    const { productID } = req.body;

    await CartService.addProductToCart(userId, productID);

    res.status(200).json({ status: 'ok', message: '장바구니 추가 성공' });
  } catch (err) {
    next(err);
  }
}

async function getAllCartProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.decoded;
    const products = await CartService.getCartProducts(userId);

    res.status(200).json({
      status: 'ok',
      message: '장바구니 상품 조회 성공',
      products,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteCartProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.decoded;
    const { id: productID } = req.params;

    await CartService.deleteCartProduct(userId, +productID);

    res.status(200).json({ status: 'ok', message: '장바구니 상품 삭제 성공' });
  } catch (err) {
    next(err);
  }
}

export { createCartProduct, getAllCartProducts, deleteCartProduct };
