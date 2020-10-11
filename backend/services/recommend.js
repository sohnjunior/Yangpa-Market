const { Product, Post, Category } = require('../models');
const { readImageToBase64 } = require('./common');

const getPopularProducts = async () => {
  try {
    // 날짜와 조회, like 를 기준으로 정렬한 결과를 반환
    const result = await Product.findAll({
      include: [
        {
          model: Post,
          attributes: ['title', 'body', 'hit'],
        },
        {
          model: Category,
          attributes: ['title'],
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [Post, 'hit', 'DESC'],
        ['like', 'DESC'],
      ],
    });

    // 이미지 파일 바이너리로 읽어오기
    result.forEach((product) => {
      const filename = product.dataValues.image;
      const base64Encode = readImageToBase64('product', filename);
      product.dataValues.image = base64Encode;
    });

    return result;
  } catch (err) {
    throw err;
  }
};

const getRelatedProducts = async (postID) => {
  try {
    // id 값으로 상품 찾기
    const post = await Post.findOne({ where: { title: postID } });
    const product = await Product.findOne({
      where: { postId: post.id },
      include: {
        model: Category,
        attributes: ['title'],
      },
    });

    // 같은 카테고리 내 상품 찾기
    const targetCategory = product.categoryId;
    const candidates = await Product.findAll({
      where: { categoryId: targetCategory },
      include: {
        model: Post,
        attributes: ['title', 'body', 'hit'],
      },
    });

    // 이미지 파일 바이너리로 읽어오기
    candidates.forEach((product) => {
      const filename = product.dataValues.image;
      const base64Encode = readImageToBase64('product', filename);
      product.dataValues.image = base64Encode;
    });

    // 조회 및 like 를 기준으로 점수 계산
    const temp = [];
    candidates.forEach((e) => {
      let score = 0.6 * e.dataValues.like + 0.4 * e.dataValues.post.hit;
      score = Math.round(score * 1e2) / 1e2;
      temp.push([score, e]);
    });

    // 점수 높은 순으로 정렬 후 상위 5개 반환
    temp
      .sort((a, b) => {
        return b[0] - a[0];
      })
      .splice(4);

    return temp;
  } catch (err) {
    throw err;
  }
};

module.exports = { getPopularProducts, getRelatedProducts };
