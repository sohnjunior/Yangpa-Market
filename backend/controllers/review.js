const ReviewService = require('../services/review');

const getReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewService.getAllReviews();

    res.json({ reviews: reviews });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const postReview = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const { title, body, rating } = req.body;
    const { filename } = req.file;

    await ReviewService.createReview(userID, title, body, rating, filename);
    res.json({ result: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateViewCount = async (req, res, next) => {
  try {
    const { id: reviewID } = req.params;
    await ReviewService.updateViewCountOfReview(reviewID);
    res.json({ msg: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateLikeOfComment = async (req, res, next) => {
  try {
    const { id: reviewID } = req.params;
    await ReviewService.updateLikeOfReview(reviewID);
    res.json({ msg: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getReviews,
  postReview,
  updateViewCount,
  updateLikeOfComment,
};
