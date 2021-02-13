import { Request, Response, NextFunction } from 'express';
import * as OrderService from '../services/order';
import { HTTP400Error } from '../utils/errors';

async function getOrderHistory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { status } = req.query;
    const { id: userID } = req.decoded;

    let resObj = null;
    switch (status) {
      case 'sale': {
        const productsOnSale = await OrderService.getSaleHistory(userID);
        resObj = { products: productsOnSale };
        break;
      }
      case 'purchased': {
        const purchaseHistory = await OrderService.getPurchaseHistory(userID);
        resObj = { infos: purchaseHistory };
        break;
      }
      case 'pending': {
        const [orders, products] = await OrderService.getPendingHistory(userID);
        resObj = { orders: orders, products: products };
        break;
      }
      default:
        next(new HTTP400Error('알 수 없는 쿼리 값입니다'));
    }
    res
      .status(200)
      .json({ status: 'ok', message: '주문 내역 조회', ...resObj });
  } catch (err) {
    next(err);
  }
}

async function approveOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: orderID } = req.params;
    await OrderService.approveOrder(orderID);

    res.status(200).json({ status: 'ok', message: '구매요청 승인 성공' });
  } catch (err) {
    next(err);
  }
}

async function rejectOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: orderID } = req.params;
    await OrderService.rejectOrder(orderID);

    res.status(200).json({ status: 'ok', message: '구매요청 거부 성공' });
  } catch (err) {
    next(err);
  }
}

export { getOrderHistory, approveOrder, rejectOrder };