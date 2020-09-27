const express = require("express");
const { verifyToken } = require("./middlewares");
const { User, Order, Post, Product } = require("../models");

const sequelize = require("sequelize");
const Op = sequelize.Op;

const router = express.Router();

// 전체 판매 내역 조회
router.get("/retrieve", verifyToken, async (req, res, next) => {
  try {
    // 이메일로 유저 찾기
    const user = await User.findOne({ where: { email: req.query.email } });

    // 본인이 판매중인 목록
    const productOnSale = await Post.findAll({
      where: { userId: user.id },
      include: {
        model: Product,
        attributes: ["title", "sold", "price", "like"],
      },
    });

    res.json({ products: productOnSale });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 특정 유저 구매 내역 조회
router.get("/retrieve/buying", verifyToken, async (req, res, next) => {
  try {
    // 이메일로 유저 찾기
    const user = await User.findOne({ where: { email: req.query.email } });

    // 본인의 구매 내역 조회
    const orders = await Order.findAll({
      where: { userId: user.id },
    });

    const productInfo = [];
    for (let order of orders) {
      const info = await Product.findOne({
        where: { postId: order.dataValues.postId },
      });
      productInfo.push([info, order.approve]);
    }

    res.json({ infos: productInfo });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 특정 유저(판매자) 미확인 및 미승인 주문 요청 내역 조회
router.get("/request", verifyToken, async (req, res, next) => {
  try {
    // 이메일로 유저 찾기
    const user = await User.findOne({ where: { email: req.query.email } });

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
        attributes: ["nickname"],
      },
    });

    const products = await productPromise;
    const productInfos = {};
    for (let product of products) {
      productInfos[product.dataValues.postId] = product.dataValues.title;
    }

    res.json({ orders: orders, products: productInfos });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 구매요청 승인
router.put("/approve", verifyToken, async (req, res, next) => {
  try {
    const { postId } = req.body;
    await Product.update({ sold: true }, { where: { postId: postId } });
    res.json({ msg: "success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 구매요청 삭제
router.delete("/denied/:id", verifyToken, async (req, res, next) => {
  try {
    await Order.destroy({ where: { id: req.params.id } });
    res.json({ msg: "success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
