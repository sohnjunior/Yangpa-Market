import { instance } from './common';

/**
 * @purpose 리뷰 API
 */
const fetchAllReviews = () => instance.get('/reviews');
const createReview = (payload) =>
  instance.post('/reviews', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
const increaseReviewHit = (reviewID) => instance.put(`reviews/${reviewID}/hit`);
const increaseReviewLike = (reviewID) =>
  instance.put(`reviews/${reviewID}/like`);

export default {
  fetchAllReviews,
  createReview,
  increaseReviewHit,
  increaseReviewLike,
};
