const CartService = require("../services/cart");

const postProduct = async (req, res, next) => {
  try {
    const { email, productID } = req.body;
    await CartService.addCartProduct(email, productID);
    res.json({ result: "success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { email } = req.query;
    const products = await CartService.getCartProducts(email);
    res.json({ result: products });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { email, productID } = req.query;
    await CartService.removeCartProduct(email, productID);
    res.json({ result: "success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const purchaseProduct = async (req, res, next) => {
  try {
    const { email, postID, productID, phone } = req.body;
    await CartService.purchaseCartProduct(email, postID, productID, phone);
    res.json({ msg: "success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { postProduct, getProducts, deleteProduct, purchaseProduct };
