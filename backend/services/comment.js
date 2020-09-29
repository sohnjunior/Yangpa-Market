const { User, Comment, Post } = require('../models');

const createComment = async (email, postId, comment, secret) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    const post = await Post.findOne({ where: { title: postId } });

    await Comment.create({
      comment: comment,
      userId: user.id,
      postId: post.id,
      secret: secret,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const removeComment = async (id) => {
  try {
    await Comment.destroy({ where: { id: id } });
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateComment = async (id, contentText) => {
  try {
    await Comment.update({ comment: contentText }, { where: { id: id } });
  } catch (err) {
    throw new Error(err.message);
  }
};

const getCommentsOfPost = async (id) => {
  // 상품 찾기
  const post = await Post.findOne({ where: { title: id } });

  // 상품에 연관된 댓글 조회
  const comments = await Comment.findAll({
    where: { postId: post.id },
    include: {
      model: User,
      attributes: ['email', 'nickname'],
    },
  });

  return comments;
};

module.exports = {
  createComment,
  removeComment,
  updateComment,
  getCommentsOfPost,
};
