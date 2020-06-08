const express = require('express');
const fs = require('fs');
const { Product, Post, Category } = require('../models');

const router = express.Router();

/*
    상품 추천 API
*/

// 전체 카테고리 내 인기 상품 추천
router.get('/popular', async (req, res, next) => {
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
      }
    ],
    order: [
      ['createdAt', 'DESC'],
      [Post, 'hit', 'DESC'],
      ['like', 'DESC'],
    ],
  }); 
  
  // 이미지 파일 바이너리로 읽어오기
  result.forEach(product => {
    const imagePath = product.dataValues.image;
    const data = fs.readFileSync('public/images/product/' + imagePath);
    let base64 = Buffer.from(data).toString('base64');
    base64 = `data:image/png;base64,${base64}`;
    product.dataValues.image = base64;
  });

  res.json({'result': result});
});


// TODO: 연관 상품 추천
router.get('/related/:id', (req, res, next) => {
  // id 값으로 상품 찾기

  // 같은 카테고리 내 상품 찾기

  // 조회 및 like 를 기준으로 점수 계산
  
  // 점수 높은 순으로 반환

});

module.exports = router;