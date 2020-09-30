const { User, Order, Post, Product } = require('../models');

const sequelize = require('sequelize');
const Op = sequelize.Op;

const getSaleProducts = async (email) => {
  // 이메일로 유저 찾기
  const user = await User.findOne({ where: { email: email } });

  // 본인이 판매중인 목록
  const productOnSale = await Post.findAll({
    where: { userId: user.id },
    include: {
      model: Product,
      attributes: ['title', 'sold', 'price', 'like'],
    },
  });

  return productOnSale;
};

const getPurchaseHistory = async (email) => {
  // 이메일로 유저 찾기
  const user = await User.findOne({ where: { email: email } });

  // 본인의 구매 내역 조회
  const orders = await Order.findAll({
    where: { userId: user.id },
  });

  const productInfo = [];
  for (let order of orders) {
    const info = await Product.findOne({
      where: { postId: order.dataValues.postId },
      include: {
        model: Post,
        attributes: ['userId'],
        include: {
          model: User,
          attributes: ['nickname', 'phone'],
        },
      },
    });
    productInfo.push([info, order.approve]);
  }

  return productInfo;
};

const getPendingPurchases = async (email) => {
  // 이메일로 유저 찾기
  const user = await User.findOne({ where: { email: email } });

  // 현재 유저가 판매중인 상품 조회
  const posts = await Post.findAll({ where: { userId: user.id } });

  const ids = [];
  for (let post of posts) {
    ids.push(post.dataValues.id);
  }

  // 미승인된 주문 조회 & 상품명 조회 (병렬처리)
  const productPromise = Product.findAll({
    where: { postId: { [Op.in]: ids } },
  });
  const orders = await Order.findAll({
    where: {
      approve: false,
      postId: { [Op.in]: ids },
    },
    include: {
      model: User,
      attributes: ['nickname'],
    },
  });

  const products = await productPromise;
  const productInfos = {};
  for (let product of products) {
    productInfos[product.dataValues.postId] = product.dataValues.title;
  }

  return [orders, productInfos];
};

const approvePurchase = async (postId) => {
  try {
    await Product.update({ sold: true }, { where: { postId } });
    await Order.update({ approve: true }, { where: { postId } });
  } catch (err) {
    throw new Error(err.message);
  }
};

const rejectPurchase = async (id) => {
  try {
    await Order.destroy({ where: { id: req.params.id } });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getSaleProducts,
  getPurchaseHistory,
  getPendingPurchases,
  approvePurchase,
  rejectPurchase,
};