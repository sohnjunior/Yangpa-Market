import { Request, Response, NextFunction } from 'express';
import * as ProductService from '../services/product.service';
import { HTTP400Error, HTTP404Error } from '../utils/errors';

async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userID } = req.decoded;
    const { category, name, description, price } = req.body;
    let filenames: string[] = [];

    if (Array.isArray(req.files)) {
      filenames = req.files.map((file) => file.filename);
    }

    await ProductService.createProduct(
      userID,
      category,
      name,
      description,
      price,
      filenames
    );

    res.status(201).json({ status: 'ok', message: '상품이 추가되었습니다' });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: productId } = req.params;
    const { name, price, description } = req.body;
    const updateOptions = { name, price, description };

    await ProductService.updateProduct(+productId, updateOptions);

    res
      .status(200)
      .json({ status: 'ok', message: '상품 정보가 업데이트 되었습니다' });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: productId } = req.params;

    await ProductService.deleteProduct(+productId);

    res.status(200).json({ status: 'ok', message: '상품이 삭제되었습니다' });
  } catch (err) {
    next(err);
  }
}

async function getAllProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const { category, page, take } = req.query;
    if (
      typeof category !== 'string' ||
      typeof page !== 'string' ||
      typeof take !== 'string'
    ) {
      return next(new HTTP400Error('잘못된 인자입니다.'));
    }

    const findQueryOffset = (+page - 1) * +take;
    if (findQueryOffset < 0) {
      return next(new HTTP400Error('잘못된 인자입니다.'));
    }

    const [products, totalCount] = await ProductService.getAllProducts(
      category,
      findQueryOffset,
      +take
    );

    res.status(200).json({
      status: 'ok',
      message: '모든 상품 정보 조회에 성공했습니다.',
      totalCount,
      products,
    });
  } catch (err) {
    next(err);
  }
}

async function getProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: productId } = req.params;
    const product = await ProductService.getProduct(+productId);

    if (!product) return next(new HTTP404Error('상품 정보를 찾을 수 없습니다'));

    res
      .status(200)
      .json({ status: 'ok', message: '상품조회에 성공했습니다.', product });
  } catch (err) {
    next(err);
  }
}

async function searchProducts(req: Request, res: Response, next: NextFunction) {
  try {
    let { keyword } = req.query;

    if (!keyword) return next(new HTTP400Error('잘못된 입력입니다'));

    keyword = (keyword as string).trim().replace(/\s\s+/gi, ' '); // 앞뒤 공백문자 제거

    const keywords = keyword.split(' '); // 띄어쓰기 기준으로 한 단어라도 들어있으면 결과 찾아서 반환
    const products = await ProductService.searchProductsWithKeyword(keywords);

    res.status(200).json({
      status: 'ok',
      message: '조회가 성공적으로 이루어졌습니다',
      products,
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
    const { id: productId } = req.params;

    await ProductService.increaseLikeOfProduct(+productId);
    res
      .status(200)
      .json({ status: 'ok', message: '상품 좋아요가 증가했습니다' });
  } catch (err) {
    next(err);
  }
}

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  searchProducts,
  updateLikeOfProduct,
};
