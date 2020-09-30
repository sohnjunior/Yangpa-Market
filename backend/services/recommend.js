const { Product, Post, Category } = require('../models');
const fs = require('fs');

const getPopularProducts = async () => {
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
    const imagePath = product.dataValues.image;
    const data = fs.readFileSync('public/images/product/' + imagePath);
    let base64 = Buffer.from(data).toString('base64');
    base64 = `data:image/png;base64,${base64}`;
    product.dataValues.image = base64;
  });

  return result;
};

const getRelatedProducts = async (orderHash) => {
  // id 값으로 상품 찾기
  const post = await Post.findOne({ where: { title: orderHash } });
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
    const imagePath = product.dataValues.image;
    const data = fs.readFileSync('public/images/product/' + imagePath);
    let base64 = Buffer.from(data).toString('base64');
    base64 = `data:image/png;base64,${base64}`;
    product.dataValues.image = base64;
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
};

module.exports = { getPopularProducts, getRelatedProducts };
