const CartService = require('../services/cart');

const postProduct = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const { productID } = req.body;

    await CartService.addCartProduct(userID, productID);

    res.json({ status: 'ok', message: '장바구니 추가 성공' });
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;

    const products = await CartService.getCartProducts(userID);

    res.json({
      status: 'ok',
      message: '장바구니 상품 조회 성공',
      result: products,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const { id: productID } = req.params;

    await CartService.removeCartProduct(userID, productID);

    res.json({ status: 'ok', message: '장바구니 상품 삭제 성공' });
  } catch (err) {
    next(err);
  }
};

const purchaseProduct = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const { postID, productID, phone } = req.body;

    await CartService.purchaseCartProduct(userID, postID, productID, phone);

    res.json({ status: 'ok', message: '장바구니 상품 구매 완료' });
  } catch (err) {
    next(err);
  }
};

module.exports = { postProduct, getProducts, deleteProduct, purchaseProduct };
