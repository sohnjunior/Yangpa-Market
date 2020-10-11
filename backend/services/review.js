const { User, Review } = require('../models');
const { readImageToBase64 } = require('./common');

const getAllReviews = async () => {
  try {
    const reviews = await Review.findAll({
      include: {
        model: User,
        attributes: ['email', 'nickname'],
      },
      order: [['createdAt', 'DESC']],
    });

    // 이미지 파일을 읽어 바이너리 형태로 전송해줌
    reviews.forEach((review) => {
      const filename = review.dataValues.image;
      const base64Encode = readImageToBase64('review', filename);
      review.dataValues.image = base64Encode;
    });

    return reviews;
  } catch (err) {
    throw err;
  }
};

const createReview = async (userID, title, body, rating, filename) => {
  try {
    await Review.create({
      title: title,
      body: body,
      rating: rating,
      image: filename,
      userId: userID,
    });
  } catch (err) {
    throw err;
  }
};

const updateViewCountOfReview = async (reviewID) => {
  try {
    const review = await Review.findOne({ where: { id: reviewID } });
    await Review.update(
      { hit: review.dataValues.hit + 1 },
      { where: { id: review.dataValues.id } }
    );
  } catch (err) {
    throw err;
  }
};

const updateLikeOfReview = async (reviewID) => {
  try {
    const review = await Review.findOne({ where: { id: reviewID } });
    await Review.update(
      { like: review.dataValues.like + 1 },
      { where: { id: review.dataValues.id } }
    );
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllReviews,
  createReview,
  updateViewCountOfReview,
  updateLikeOfReview,
};
