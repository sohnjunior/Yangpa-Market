const CommentService = require('../services/comment');

const postComment = async (req, res, next) => {
  try {
    const { email, postId, comment, secret } = req.body;
    await CommentService.createComment(email, postId, comment, secret);

    res.json({ response: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.query;
    await CommentService.removeComment(id);

    res.json({ msg: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { comment, id } = req.body;
    await CommentService.updateComment(id, comment);

    res.json({ msg: 'Comment updated successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comments = await CommentService.getCommentsOfPost(id);

    res.json({ comments: comments });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { postComment, deleteComment, updateComment, getComment };
