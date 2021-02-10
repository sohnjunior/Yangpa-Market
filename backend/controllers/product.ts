import { Request, Response, NextFunction } from 'express';
import * as ProductService from '../services/product';
import { HTTP404Error } from '../utils/errors';

async function postProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userID } = req.decoded;
    const { category, title, description, price } = req.body;
    const { filename } = req.file;

    await ProductService.createProduct(
      userID,
      category,
      title,
      description,
      price,
      filename
    );
    res.status(201).json({ status: 'ok', message: '상품이 추가되었습니다' });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { productId, title, price, body } = req.body;

    await ProductService.updateProductInfo(productId, title, price, body);

    res
      .status(200)
      .json({ status: 'ok', message: '상품 정보가 업데이트 되었습니다' });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: orderHash } = req.params;

    await ProductService.deleteProduct(orderHash);

    res.status(200).json({ status: 'ok', message: '상품이 삭제되었습니다' });
  } catch (err) {
    next(err);
  }
}

async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await ProductService.getAllProducts();

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
}

async function getProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: orderHash } = req.params;

    const post = await ProductService.getProduct(orderHash);
    if (!post) next(new HTTP404Error('상품 정보를 찾을 수 없습니다'));

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

async function searchProducts(req: Request, res: Response, next: NextFunction) {
  try {
    let { keyword } = req.query;
    keyword = keyword.trim().replace(/\s\s+/gi, ' '); // 앞뒤 공백문자 제거
    const keywords = keyword.split(' '); // 띄어쓰기 기준으로 한 단어라도 들어있으면 결과 찾아서 반환

    const products = await ProductService.searchProductsWithKeyword(keywords);

    res.status(200).json({
      status: 'ok',
      message: '조회가 성공적으로 이루어졌습니다',
      result: products,
    });
  } catch (err) {
    next(err);
  }
}

async function updateLikeOfProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: orderHash } = req.params;

    await ProductService.increaseLikeOfProduct(orderHash);

    res
      .status(200)
      .json({ status: 'ok', message: '상품 좋아요가 증가했습니다' });
  } catch (err) {
    next(err);
  }
}

export {
  postProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  searchProducts,
  updateLikeOfProduct,
};
