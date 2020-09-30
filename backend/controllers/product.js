const ProductService = require('../services/product');

const postProduct = async (req, res, next) => {
  try {
    const { email, category, title, body, price } = req.body;
    const { filename } = req.file;

    await ProductService.createProduct(
      email,
      category,
      title,
      body,
      price,
      filename
    );
  } catch (err) {
    console.error(err);
    next(err);
  }

  res.json({ response: 'success' });
};

const updateProduct = async (req, res, next) => {
  try {
    const { productId, title, price, body } = req.body;
    await ProductService.updateProductInfo(productId, title, price, body);
  } catch (err) {
    console.error(err);
    next(err);
  }

  res.json({ response: 'success' });
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id: productID } = req.params;
    await ProductService.deleteProduct(productID);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  const posts = await ProductService.getAllProducts();
  res.json(posts);
};

const getProduct = async (req, res, next) => {
  try {
    const { id: orderHash } = req.params;
    const post = await ProductService.getProduct(orderHash);
    res.json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const searchProducts = async (req, res, next) => {
  let keyword = req.params.keyword;
  keyword = keyword.trim(); // 앞뒤 공백문자 제거
  keyword = keyword.replace(/\s\s+/gi, ' '); // 두 개 이상의 공백은 하나로 변경
  const keywords = keyword.split(' '); // 띄어쓰기 기준으로 한 단어라도 들어있으면 결과 찾아서 반환

  const products = await ProductService.searchProductsWithKeyword(keywords);

  res.json({ result: products });
};

const updateLikeOfProduct = async (req, res, next) => {
  try {
    const { id: orderHash } = req.params;
    await ProductService.increaseLikeOfProduct(orderHash);

    res.json({ result: 'success' });
  } catch (err) {
    console.error(err);
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
