const express = require('express');
const { verifyToken } = require("./middlewares");
const { Product, Category, User, Post } = require('../models');
const fs = require('fs');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const router = express.Router();

// 전체 상품 게시글 조회
router.get('/retreive', async (req, res, next) => {
    const posts = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['email', 'nickname'],
            },
            {
                model: Product,
                attributes: ['title', 'image', 'price', 'like'],
                include: {
                    model: Category,
                    attributes: ['title'],
                }
            }
        ],
        order: [['createdAt', 'DESC']],
    });

    res.json(posts);
});

// 특정 상품 게시글 조회
router.get('/retreive/:id', async (req, res, next) => {
    try {
        let post = await Post.findOne({
            where: { title: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['nickname'],
                },
                {
                    model: Product,
                    attributes: ['title', 'image', 'price', 'like'],
                }
            ],
        });

        res.json(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
