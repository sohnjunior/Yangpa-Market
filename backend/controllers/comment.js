const CommentService = require('../services/comment');

const postComment = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const { postId, comment, secret } = req.body;
    await CommentService.createComment(userID, postId, comment, secret);

    res.json({ response: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id: commentID } = req.params;
    await CommentService.removeComment(commentID);

    res.json({ msg: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id: commentID } = req.params;
    const { comment: commentText } = req.body;
    await CommentService.updateComment(commentID, commentText);

    res.json({ msg: 'Comment updated successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getComment = async (req, res, next) => {
  try {
    const { id: postID } = req.params;
    const comments = await CommentService.getCommentsOfPost(postID);

    res.json({ comments: comments });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { postComment, deleteComment, updateComment, getComment };
