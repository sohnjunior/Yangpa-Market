import { getRepository } from 'typeorm';
import { Comment } from '../models/comment';

const createComment = async (
  authorId: number,
  productId: number,
  content: string,
  isSecret: boolean
) => {
  try {
    const commentRepository = getRepository(Comment);

    const comment = commentRepository.create({
      content,
      isSecret,
      productId,
      authorId,
    });

    await commentRepository.save(comment);
  } catch (err) {
    throw err;
  }
};

const getAllCommentsOfProduct = async (productId: number) => {
  try {
    const commentRepository = getRepository(Comment);
    const comments = await commentRepository.find({
      where: { productId },
      relations: ['author'],
      order: {
        createdAt: 'DESC',
      },
    });

    return comments;
  } catch (err) {
    throw err;
  }
};

const updateComment = async (commentId: number, content: string) => {
  try {
    const commentRepository = getRepository(Comment);

    await commentRepository.update(commentId, { content });
  } catch (err) {
    throw err;
  }
};

const deleteComment = async (commentId: number) => {
  try {
    const commentRepository = getRepository(Comment);

    commentRepository.softDelete(commentId);
  } catch (err) {
    throw err;
  }
};

export { createComment, getAllCommentsOfProduct, updateComment, deleteComment };
