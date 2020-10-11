const ReviewService = require('../services/review');

const getReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewService.getAllReviews();

    res
      .status(200)
      .json({ status: 'ok', message: '후기 조회 성공', reviews: reviews });
  } catch (err) {
    next(err);
  }
};

const postReview = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const { title, body, rating } = req.body;
    const { filename } = req.file;

    await ReviewService.createReview(userID, title, body, rating, filename);

    res.status(200).json({ status: 'ok', message: '후기 생성 완료' });
  } catch (err) {
    next(err);
  }
};

const updateViewCount = async (req, res, next) => {
  try {
    const { id: reviewID } = req.params;

    await ReviewService.updateViewCountOfReview(reviewID);

    res.status(200).json({ status: 'ok', message: '후기 업데이트 완료' });
  } catch (err) {
    next(err);
  }
};

const updateLikeOfComment = async (req, res, next) => {
  try {
    const { id: reviewID } = req.params;

    await ReviewService.updateLikeOfReview(reviewID);

    res.status(200).json({ status: 'ok', message: '후기 좋아요 증가' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getReviews,
  postReview,
  updateViewCount,
  updateLikeOfComment,
};
