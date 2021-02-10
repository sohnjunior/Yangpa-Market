import { Request, Response, NextFunction } from 'express';
import * as CommentService from '../services/comment';

async function postComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userID } = req.decoded;
    const { postId, comment, secret } = req.body;

    await CommentService.createComment(userID, postId, comment, secret);

    res.status(201).json({ status: 'ok', message: '댓글 생성 완료' });
  } catch (err) {
    next(err);
  }
}

async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: commentID } = req.params;

    await CommentService.removeComment(commentID);

    res.status(200).json({ status: 'ok', message: '댓글 삭제 완료' });
  } catch (err) {
    next(err);
  }
}

async function updateComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: commentID } = req.params;
    const { comment: commentText } = req.body;

    await CommentService.updateComment(commentID, commentText);

    res.status(200).json({ status: 'ok', message: '댓글 수정 완료' });
  } catch (err) {
    next(err);
  }
}

async function getComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: postID } = req.params;

    const comments = await CommentService.getCommentsOfPost(postID);

    res
      .status(200)
      .json({ status: 'ok', message: '댓글 조회 성공', comments: comments });
  } catch (err) {
    next(err);
  }
}

export { postComment, deleteComment, updateComment, getComment };
