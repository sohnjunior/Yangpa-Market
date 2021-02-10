import { Request, Response, NextFunction } from 'express';
import * as RecommendService from '../services/recommend';

async function getPopularProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const popularProducts = await RecommendService.getPopularProducts();

    res.status(200).json({
      status: 'ok',
      message: '실시간 인기 상품 조회 성공',
      result: popularProducts,
    });
  } catch (err) {
    next(err);
  }
}

async function getRelatedProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: productID } = req.params;

    const relatedProducts = await RecommendService.getRelatedProducts(
      productID
    );

    res.status(200).json({
      status: 'ok',
      message: '연관 상품 조회 성공',
      result: relatedProducts,
    });
  } catch (err) {
    next(err);
  }
}

export { getPopularProducts, getRelatedProducts };
