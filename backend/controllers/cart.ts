import { Request, Response, NextFunction } from 'express';
import * as CartService from '../services/cart';

async function postProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userID } = req.decoded;
    const { productID } = req.body;

    await CartService.addCartProduct(userID, productID);

    res.status(200).json({ status: 'ok', message: '장바구니 추가 성공' });
  } catch (err) {
    next(err);
  }
}

async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userID } = req.decoded;

    const products = await CartService.getCartProducts(userID);

    res.status(200).json({
      status: 'ok',
      message: '장바구니 상품 조회 성공',
      result: products,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userID } = req.decoded;
    const { id: productID } = req.params;

    await CartService.removeCartProduct(userID, productID);

    res.status(200).json({ status: 'ok', message: '장바구니 상품 삭제 성공' });
  } catch (err) {
    next(err);
  }
}

async function purchaseProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userID } = req.decoded;
    const { postID, productID, phone } = req.body;

    await CartService.purchaseCartProduct(userID, postID, productID, phone);

    res.status(200).json({ status: 'ok', message: '장바구니 상품 구매 완료' });
  } catch (err) {
    next(err);
  }
}

export { postProduct, getProducts, deleteProduct, purchaseProduct };
