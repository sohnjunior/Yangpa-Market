import { Request, Response, NextFunction } from 'express';
import * as OrderService from '../services/order.service';
import { HTTP400Error } from '../utils/errors';

async function getOrderHistory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { status } = req.query;
    const { id: userId } = req.decoded;
    let response = null;

    switch (status) {
      case 'sale': {
        const productsOnSale = await OrderService.getSaleHistory(userId);
        response = { infos: productsOnSale };
        break;
      }
      case 'purchased': {
        const purchaseHistory = await OrderService.getPurchaseHistory(userId);
        response = { infos: purchaseHistory };
        break;
      }
      case 'pending': {
        const orderRequestHistory = await OrderService.getOrderRequestHistory(
          userId
        );
        response = { infos: orderRequestHistory };
        break;
      }
      default:
        next(new HTTP400Error('알 수 없는 쿼리 값입니다'));
    }
    res
      .status(200)
      .json({ status: 'ok', message: '주문 내역 조회', ...response });
  } catch (err) {
    next(err);
  }
}

async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { requestIds, buyerEmail } = req.body;

    await OrderService.createOrder(requestIds, buyerEmail);

    res.status(200).json({ status: 'ok', message: '구매요청 생성 성공' });
  } catch (err) {
    next(err);
  }
}

async function approveOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: orderId } = req.params;

    await OrderService.approveOrder(+orderId);

    res.status(200).json({ status: 'ok', message: '구매요청 승인 성공' });
  } catch (err) {
    next(err);
  }
}

async function rejectOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: orderId } = req.params;

    await OrderService.rejectOrder(+orderId);

    res.status(200).json({ status: 'ok', message: '구매요청 거부 성공' });
  } catch (err) {
    next(err);
  }
}

async function deleteOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: orderId } = req.params;

    await OrderService.deleteOrder(+orderId);

    res.status(200).json({ status: 'ok', message: '구매요청 삭제 성공' });
  } catch (err) {
    next(err);
  }
}

export { getOrderHistory, createOrder, approveOrder, rejectOrder, deleteOrder };
