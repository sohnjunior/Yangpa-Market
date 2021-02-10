import express from 'express';
import * as CommentController from '../../controllers/comment';
import { verifyToken } from '../../middlewares';
import { checkBodyNull } from '../../middlewares/validator';

const router = express.Router();

router.post('/', verifyToken, CommentController.postComment); // 댓글 생성
router.delete('/:id', verifyToken, CommentController.deleteComment); // 댓글 삭제
router.put('/:id', verifyToken, checkBodyNull, CommentController.updateComment); // 댓글 수정
router.get('/:id', CommentController.getComment); // 특정 상품 게시글 댓글 목록 조회

export default router;
