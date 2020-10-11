const { User, Comment, Post } = require('../models');

const createComment = async (userID, postId, comment, secret) => {
  try {
    const post = await Post.findOne({ where: { title: postId } });

    await Comment.create({
      comment: comment,
      userId: userID,
      postId: post.id,
      secret: secret,
    });
  } catch (err) {
    throw err;
  }
};

const removeComment = async (id) => {
  try {
    await Comment.destroy({ where: { id: id } });
  } catch (err) {
    throw err;
  }
};

const updateComment = async (commentID, commentText) => {
  try {
    await Comment.update(
      { comment: commentText },
      { where: { id: commentID } }
    );
  } catch (err) {
    throw err;
  }
};

const getCommentsOfPost = async (postID) => {
  try {
    // 상품 찾기
    const post = await Post.findOne({ where: { title: postID } });

    // 상품에 연관된 댓글 조회
    const comments = await Comment.findAll({
      where: { postId: post.id },
      include: {
        model: User,
        attributes: ['email', 'nickname'],
      },
    });

    return comments;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createComment,
  removeComment,
  updateComment,
  getCommentsOfPost,
};
