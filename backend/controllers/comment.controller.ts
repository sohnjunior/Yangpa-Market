import { Request, Response, NextFunction } from 'express';
import * as CommentService from '../services/comment.service';

async function createComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.decoded;
    const { productId, content, isSecret } = req.body;

    await CommentService.createComment(userId, productId, content, isSecret);

    res.status(201).json({ status: 'ok', message: '댓글 생성 완료' });
  } catch (err) {
    next(err);
  }
}

async function getAllCommentsOfProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: productId } = req.params;
    const comments = await CommentService.getAllCommentsOfProduct(+productId);

    res.status(200).json({ status: 'ok', message: '댓글 조회 성공', comments });
  } catch (err) {
    next(err);
  }
}

async function updateComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: commentId } = req.params;
    const { comment: content } = req.body;

    await CommentService.updateComment(+commentId, content);

    res.status(200).json({ status: 'ok', message: '댓글 수정 완료' });
  } catch (err) {
    next(err);
  }
}

async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: commentId } = req.params;

    await CommentService.deleteComment(+commentId);

    res.status(200).json({ status: 'ok', message: '댓글 삭제 완료' });
  } catch (err) {
    next(err);
  }
}

export { createComment, getAllCommentsOfProduct, deleteComment, updateComment };
