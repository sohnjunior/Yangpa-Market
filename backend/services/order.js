const { User, Order, Post, Product } = require('../models');

const sequelize = require('sequelize');
const Op = sequelize.Op;

const getSaleHistory = async (userID) => {
  // 본인이 판매중인 목록
  const productOnSale = await Post.findAll({
    where: { userId: userID },
    include: {
      model: Product,
      attributes: ['title', 'sold', 'price', 'like'],
    },
  });

  return productOnSale;
};

const getPurchaseHistory = async (userID) => {
  // 본인의 구매 내역 조회
  const orders = await Order.findAll({
    where: { userId: userID },
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

const getPendingHistory = async (userID) => {
  // 현재 유저가 판매중인 상품 조회
  const posts = await Post.findAll({ where: { userId: userID } });

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
  for (const product of products) {
    productInfos[product.dataValues.postId] = product.dataValues.title;
  }

  return [orders, productInfos];
};

const approveOrder = async (postId) => {
  try {
    await Product.update({ sold: true }, { where: { postId } });
    await Order.update({ approve: true }, { where: { postId } });
  } catch (err) {
    throw new Error(err.message);
  }
};

const rejectOrder = async (orderID) => {
  try {
    await Order.destroy({ where: { id: orderID } });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getSaleHistory,
  getPurchaseHistory,
  getPendingHistory,
  approveOrder,
  rejectOrder,
};
