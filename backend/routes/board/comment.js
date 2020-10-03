const express = require('express');
const CommentController = require('../../controllers/comment');
const { verifyToken } = require('../../middlewares');

const router = express.Router();

router.post('/', verifyToken, CommentController.postComment); // 댓글 생성
router.delete('/:id', verifyToken, CommentController.deleteComment); // 댓글 삭제
router.put('/:id', verifyToken, CommentController.updateComment); // 댓글 수정
router.get('/:id', verifyToken, CommentController.getComment); // 특정 상품 게시글 댓글 목록 조회

module.exports = router;
