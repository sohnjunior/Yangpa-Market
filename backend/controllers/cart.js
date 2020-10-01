const CartService = require('../services/cart');

const postProduct = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const { productID } = req.body;
    await CartService.addCartProduct(userID, productID);
    res.json({ result: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const products = await CartService.getCartProducts(userID);
    res.json({ result: products });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const { productID } = req.query;
    await CartService.removeCartProduct(userID, productID);
    res.json({ result: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const purchaseProduct = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const { postID, productID, phone } = req.body;
    await CartService.purchaseCartProduct(userID, postID, productID, phone);
    res.json({ msg: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { postProduct, getProducts, deleteProduct, purchaseProduct };
