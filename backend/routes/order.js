const express = require('express');
const { verifyToken } = require("./middlewares");
const { User, Order, Post, Product } = require('../models');


const router = express.Router();

// 전체 판매 내역 조회
router.get('/retrieve', verifyToken, async (req, res, next) => {
    try {
        // 이메일로 유저 찾기
        const user = await User.findOne({ where: { email: req.query.email } });
    
        // 본인이 판매중인 목록
        const productOnSale = await Post.findAll({ 
            where: { userId: user.id },
            include: {
                model: Product,
                attributes: ['title', 'sold', 'price', 'like'],
            }
        });
      
        res.json({'products': productOnSale});

    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
