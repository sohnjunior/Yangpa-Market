import { Request, Response, NextFunction } from 'express';
import * as RecommendationService from '../services/recommendation.service';

async function getPopularProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const popularProducts = await RecommendationService.getPopularProducts();

    res.status(200).json({
      status: 'ok',
      message: '실시간 인기 상품 조회 성공',
      products: popularProducts,
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
    const { id: productId } = req.params;
    const relatedProducts = await RecommendationService.getRelatedProducts(
      +productId
    );

    res.status(200).json({
      status: 'ok',
      message: '연관 상품 조회 성공',
      products: relatedProducts,
    });
  } catch (err) {
    next(err);
  }
}

export { getPopularProducts, getRelatedProducts };
