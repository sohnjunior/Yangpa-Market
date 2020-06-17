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
            secret: secret,
        });

    } catch (err) {
        console.error(err);
        next(err);
    }

    res.json({ 'response': 'success' });
});

// 댓글 삭제
router.delete('/delete', async (req, res, next) => {
    const { id } = req.query;
    try {
        await Comment.destroy({ where: { id: id } });
        res.json({ msg: "Comment deleted successfully" });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 댓글 수정
router.put('/update', async (req, res, next) => {
    const { comment,id } = req.body;

    await Comment.update({ comment },{ where : { id : id } })
    
    res.json({ msg: "Comment updated successfully" })
    
});

// 특정 상품 게시글 댓글 목록 조회
router.get('/retreive/:id', async (req, res, next) => {
    try {
        let comment = await Comment.findOne({
            where: { title: req.params.id },
        });

        res.json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});