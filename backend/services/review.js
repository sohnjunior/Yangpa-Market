const { User, Review } = require('../models');
const fs = require('fs');

const getAllReviews = async () => {
  const reviews = await Review.findAll({
    include: {
      model: User,
      attributes: ['email', 'nickname'],
    },
    order: [['createdAt', 'DESC']],
  });

  // 이미지 파일을 읽어 바이너리 형태로 전송해줌
  reviews.forEach((review) => {
    const imagePath = review.dataValues.image;
    const data = fs.readFileSync('public/images/review/' + imagePath);
    let base64 = Buffer.from(data).toString('base64');
    base64 = `data:image/png;base64,${base64}`;
    review.dataValues.image = base64;
  });

  return reviews;
};

const createReview = async (email, title, body, rating, filename) => {
  // user 찾기
  const user = await User.findOne({ where: { email: email } });

  // Review 생성
  await Review.create({
    title: title,
    body: body,
    rating: rating,
    image: filename,
    userId: user.id,
  });
};

const updateViewCountOfReview = async (reviewID) => {
  const review = await Review.findOne({ where: { id: reviewID } });
  await Review.update(
    { hit: review.dataValues.hit + 1 },
    { where: { id: review.dataValues.id } }
  );
};

const updateLikeOfReview = async (reviewID) => {
  const review = await Review.findOne({ where: { id: reviewID } });
  await Review.update(
    { like: review.dataValues.like + 1 },
    { where: { id: review.dataValues.id } }
  );
};

module.exports = {
  getAllReviews,
  createReview,
  updateViewCountOfReview,
  updateLikeOfReview,
};
