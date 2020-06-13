const express = require('express');
const { verifyToken } = require("./middlewares");
const { Product, User, Cart, Post } = require('../models');

const router = express.Router();

/*
    장바구니 API
*/

// 장바구니 상품 추가
router.post('/new', verifyToken, async (req, res, next) => {
    try {
        // 이메일로 유저 찾기
        const user = await User.findOne({ where: { email: req.body.email } });

        // 유저 ID로 장바구니 찾기
        const cart = await Cart.findOne({ where: { userId: user.id } });

        // 상품 ID로 상품 조회하기
        const post = await Post.findOne({ where: { title: req.body.productID } });
        const product = await Product.findOne({ where: { postId: post.id } });

        // 장바구니에 상품 추가하기
        cart.addProduct(product);
        res.json({ 'result': 'success' });

    } catch(err) {
        console.error(err);
        next(err);
    }
});

// 장바구니 상품 조회
router.get('/retrieve', verifyToken, async (req, res, next) => {
    try {
        // 이메일로 유저 찾기
        const user = await User.findOne({ where: { email: req.body.email } });

        // 유저 ID로 장바구니 찾기
        const cart = await Cart.findOne({ where: { userId: user.id } });

        // 장바구니의 상품 목록 조회해서 반환
        const ret = await cart.getProducts();
        res.json({ 'result': ret });

    } catch(err) {
        console.error(err);
        next(err);
    }
});

// TODO: 장바구니 상품 삭제
router.delete('/delete', verifyToken, async (req, res, next) => {
    try {
        // 이메일로 유저 찾기
        const user = await User.findOne({ where: { email: req.body.email } });

        // 유저 ID로 장바구니 찾기
        const cart = await Cart.findOne({ where: { userId: user.id } });

        // 상품 ID로 상품 조회하기
        const post = await Post.findOne({ where: { title: req.body.productID } });
        const product = await Product.findOne({ where: { postId: post.id } });

        // TODO: 검증 필요
        cart.removeProduct(product);
        res.json({'result': 'success'});

    } catch(err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;