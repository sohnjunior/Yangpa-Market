import express from 'express';
import * as CommentController from '../../controllers/comment.controller';
import { verifyToken } from '../middlewares';
import { checkBodyNull } from '../middlewares/validator';

const router = express.Router();

router.post('/', verifyToken, CommentController.createComment);
router.delete('/:id', verifyToken, CommentController.deleteComment);
router.put('/:id', verifyToken, checkBodyNull, CommentController.updateComment);
router.get('/:id', CommentController.getAllCommentsOfProduct);

export default router;
