const express = require('express');
const { verifyToken } = require("./middlewares");
const { Product, User, Order } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const router = express.Router();

// 전체 판매내역 조회
router.get('/retrieve', verifyToken, async (req, res, next) => {
    try {
        // 이메일로 유저 찾기
        const user = await User.findOne({ where: { email: req.query.email } });
        
        //본인이 등록한 물품 중 안 팔린것
        const TosellProducts = await Product.findAll({ where: { userId: user.id }, where: { sold: 0 } });
        
        //본인이 등록한 물품 중 팔린것
        const soldProducts = await Product.findAll({ where: { userId: user.id }, where: { sold: 1 } });

        //본인이 구매한 목록
        //const TofindOrder = await Order.findAll({ where: { userId: user.id }});

        //const orderProducts = await Product.findAll({where:{ postId: TofindOrder.postId}});

        var JSONarray = new Array();
        JSONarray.push({ 'ToSell': TosellProducts });
        JSONarray.push({ 'Sold': soldProducts });
        //JSONarray.push({ 'Order': orderProducts });
        
        res.json(JSONarray);

    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
