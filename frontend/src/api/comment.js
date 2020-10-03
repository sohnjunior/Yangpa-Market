import { instance } from './common';

/**
 * @purpose 댓글 API
 */
const fetchComment = (postID) => instance.get(`/comments/${postID}`);
const createComment = (payload) => instance.post('/comments', payload);
const updateComment = ({ commentID, payload }) =>
  instance.put(`/comments/${commentID}`, payload);
const deleteComment = ({ commentID }) =>
  instance.delete(`/comments/${commentID}`);

export default { fetchComment, createComment, updateComment, deleteComment };
