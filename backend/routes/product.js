const express = require('express');
const { productUpload } = require("./middlewares");
const { Product, Category, User, Post } = require('../models');

const router = express.Router();


// 새로운 상품 게시글 생성
router.post('/create', productUpload.single('image'), async (req, res, next) => {
  try {
    // user, category 찾기 TODO: 현재는 직접 유저 찾지만 로그인 미들웨어 완성되면 req.user.id 로 바꾸기
    const user = await User.findOne({ where: { email: 'test@test.com' } });
    const category = await Category.findOne({ where: { title: req.body.category } });

    // post 생성 (주문번호를 현재 시간을 통해 생성한다)
    const post = await Post.create({
      title: String(Date.now()),
      body: req.body.body,
      userId: user.id,
    });
  
    // product 생성
    const product = await Product.create({
      title: req.body.title,
      price: Number(req.body.price),
      sold: false,
      image: req.file.filename,
      categoryId: category.id,
      postId: post.id,
    });    

  } catch(err) {
    console.error(err);
    next(err);
  }

  res.json({'response': 'success'});
});

// 상품 정보 수정
router.put('/update', (req, res, next) => {

});

// 상품 게시글 삭제
router.delete('/delete', (req, res, next) => {

});

// 전체 상품 게시글 조회
router.get('/retreive', async (req, res, next) => {
  const posts = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['email', 'nickname'],
      },
      {
        model: Product,
        attributes: ['title', 'image', 'price', 'like'],
      }
    ],
    order: [['createdAt', 'DESC']],
  });

  res.json(posts);
});

// 특정 키워드 기준 상품명 검색 결과
router.get('/search', (req, res, next) => {

});

// product 관련 테스트용 라우터
router.get('/test', async (req, res, next) => {
  /* 
      테스트 1 : 유저 id를 통한 게시글 조회 
  */
  // 유저 id = 1 가 작성한 모든 조회
  // const rets = await Post.findAll({
  //   where: {
  //     userId: 1,
  //   },
  //   include: {
  //     model: User,
  //     attributes: ['email', 'nickname'],
  //   },
  //   order: [['createdAt', 'DESC']],
  // });
  
  // for(let ret of rets) {
  //   console.log(ret.dataValues.user);
  // }
  
  /*
      테스트 2 : 전체 게시글 조회 (user, product join 연산)
  */
 const posts = await Post.findAll({
   include: [
     {
      model: User,
      attributes: ['email', 'nickname'],
    },
    {
      model: Product,
      attributes: ['title', 'image', 'price', 'like'],
    }
  ],
   order: [['createdAt', 'DESC']],
 });

 console.log(posts);

});

module.exports = router;
