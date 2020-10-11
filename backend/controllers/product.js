const ProductService = require('../services/product');
const { HTTP404Error } = require('../utils/errors');

const postProduct = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const { category, title, body, price } = req.body;
    const { filename } = req.file;

    await ProductService.createProduct(
      userID,
      category,
      title,
      body,
      price,
      filename
    );
    res.status(201).json({ status: 'ok', message: '상품이 추가되었습니다' });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { productId, title, price, body } = req.body;

    await ProductService.updateProductInfo(productId, title, price, body);

    res
      .status(200)
      .json({ status: 'ok', message: '상품 정보가 업데이트 되었습니다' });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id: orderHash } = req.params;

    await ProductService.deleteProduct(orderHash);

    res.status(200).json({ status: 'ok', message: '상품이 삭제되었습니다' });
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const posts = await ProductService.getAllProducts();

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id: orderHash } = req.params;

    const post = await ProductService.getProduct(orderHash);
    if (!post) next(new HTTP404Error('상품 정보를 찾을 수 없습니다'));

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const searchProducts = async (req, res, next) => {
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
};

const updateLikeOfProduct = async (req, res, next) => {
  try {
    const { id: orderHash } = req.params;

    await ProductService.increaseLikeOfProduct(orderHash);

    res
      .status(200)
      .json({ status: 'ok', message: '상품 좋아요가 증가했습니다' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  searchProducts,
  updateLikeOfProduct,
};
