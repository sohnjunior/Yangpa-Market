const express = require('express');
const { verifyToken } = require("./middlewares");
const router = express.Router();

const { User, Comment, Post } = require('../models');
/*
    TODO: 사용자 댓글 관련 라우터 목록 
*/

// 댓글 생성
router.post('/create', verifyToken, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        const post = await Post.findOne({ where: { postId: req.body.id } });
        const { comment, secret } = req.body;

        const commentpost = await Comment.create({
            comment : comment,
            userId: user.id,
            postId: post.id,
        });

    } catch (err) {
        console.error(err);
        next(err);
    }

    res.json({ 'response': 'success' });
});

// 댓글 삭제
router.delete('/delete/:id', async (req, res, next) => {
    
});

// 댓글 수정
router.put('/update/:id', async (req, res, next) => {
    
});

// 특정 상품 게시글 댓글 목록 조회
router.get('/retreive/:id', async (req, res, next) => {
    try {
        let post = await Post.findALl({
            where: { title: req.params.id },
            include: [
                {
                    model: Comment,
                    attributes: ['comment'],
                }
            ],
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});