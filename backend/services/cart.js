const { readImageToBase64 } = require('./common');
const { Cart, Post, Product, Order } = require('../models');

const addCartProduct = async (userID, productID) => {
  try {
    // 유저 ID로 장바구니 찾기
    const cart = await Cart.findOne({ where: { userId: userID } });

    // 상품 ID로 상품 조회하기
    const post = await Post.findOne({ where: { title: productID } });
    const product = await Product.findOne({ where: { postId: post.id } });

    // 장바구니에 상품 추가하기
    cart.addProduct(product);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getCartProducts = async (userID) => {
  try {
    // 유저 ID로 장바구니 찾기
    const cart = await Cart.findOne({ where: { userId: userID } });

    // 장바구니의 상품 목록 조회해서 반환
    const products = await cart.getProducts();

    // 이미지 파일을 읽어 바이너리 형태로 전송해줌
    products.forEach((product) => {
      const filename = product.dataValues.image;
      const base64Encode = readImageToBase64('product', filename);
      product.dataValues.image = base64Encode;
    });

    return products;
  } catch (err) {
    throw err;
  }
};

const removeCartProduct = async (userID, productID) => {
  try {
    // 유저 ID로 장바구니 찾기
    const cart = await Cart.findOne({ where: { userId: userID } });

    // 상품 ID로 상품 조회하기
    const product = await Product.findOne({
      where: { id: productID },
    });

    // n:m association 삭제
    cart.removeProduct(product);
  } catch (err) {
    throw err;
  }
};

const purchaseCartProduct = async (userID, postID, productID, phone) => {
  try {
    const cart = await Cart.findOne({ where: { userId: userID } });
    const post = await Post.findOne({ where: { id: postID } });
    const product = await Product.findOne({
      where: { id: productID },
    });

    // 장바구니에서 삭제 후 구매내역에 추가하기 (sold 상태로 바꾸지는 않음)
    cart.removeProduct(product);

    await Order.create({
      code: String(Date.now()),
      phone: phone,
      userId: userID,
      postId: post.id,
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addCartProduct,
  getCartProducts,
  removeCartProduct,
  purchaseCartProduct,
};
