const express = require('express');

const router = express.Router();

const { User, Comment } = require('../models');
const comment = require('../models/comment');
/*
    TODO: 사용자 댓글 관련 라우터 목록 
*/

// 댓글 생성
router.post('/create', async (req, res, next) => {
    try {
        const { comment, secret } = req.body;

        const post = await Comment.create({
            comment : comment,
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
