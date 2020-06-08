const express = require('express');
const { productUpload } = require("./middlewares");
const { Product, Category, User, Post } = require('../models');
const fs = require('fs');
const sequelize = require('sequelize');
const Op = sequelize.Op;

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

//TODO: 상품 정보 수정
router.put('/update/:id', (req, res, next) => {
  
});

// 상품 게시글 삭제
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { title: req.params.id } });
    await Product.destroy({ where: { postId: post.dataValues.id } });
    await Post.destroy({ where: { id: post.dataValues.id } });
  } catch(err) {
    console.error(err);
    next(err);
  }
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
        include: {
          model: Category,
          attributes: ['title'],
        }
      }
    ],
    order: [['createdAt', 'DESC']],
  });

  // 이미지 파일을 읽어 바이너리 형태로 전송해줌
  posts.forEach(post => {
      const imagePath = post.product.dataValues.image;
      const data = fs.readFileSync('public/images/product/' + imagePath);  
      let base64 = Buffer.from(data).toString('base64');
      base64 = `data:image/png;base64,${base64}`;
      post.product.dataValues.image = base64;
    });

  res.json(posts);
});

// 특정 상품 게시글 조회
router.get('/retreive/:id', async (req, res, next) => {
  try {
    let post = await Post.findOne({
        where: { title: req.params.id },
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
          {
            model: Product,
            attributes: ['title', 'image', 'price', 'like'],
          }
        ],
    });

    let currentHit = post.hit;
    
    // 이미지 파일을 읽어 바이너리 형태로 전송해줌
    const imagePath = post.product.dataValues.image;
    const data = fs.readFileSync('public/images/product/' + imagePath);
    let base64 = Buffer.from(data).toString('base64');
    base64 = `data:image/png;base64,${base64}`;
    post.product.dataValues.image = base64;
    post.hit = currentHit + 1;

    // 조회수 증가
    await Post.update({ hit: currentHit + 1 }, { where: { title: post.title } });
    res.json(post);
  } catch(err) {
    console.error(err);
    next(err);
  }
});

// 특정 키워드 기준 상품명 검색 결과
router.get('/search/:keyword', async (req, res, next) => {
  let keyword = req.params.keyword;
  keyword = keyword.trim();  // 앞뒤 공백문자 제거
  keyword = keyword.replace(/\s\s+/gi, ' '); // 두 개의 공백은 하나로 변경
  keywords = keyword.split(" ");  // 띄어쓰기 기준으로 한 단어라도 들어있으면 결과 찾아서 반환
  
  const idLog = [];  // 중복된 상품 검색 방지
  const resultArr = [];
  for(let keyword of keywords) {
    const result = await Product.findAll({
      where: {
        title: {
          [Op.like]: `%${keyword}%`
        }
      },
      include: {
        model: Post,
        attributes: ['title', 'hit'],
      }
    });
    
    for (let product of result) {
      if(! idLog.includes(product.dataValues.id)) {
        idLog.push(product.dataValues.id);
        resultArr.push(product);
      } 
    }
  } 

  // 이미지 파일을 읽어 바이너리 형태로 전송해줌
  resultArr.forEach(result => {
    const imagePath = result.dataValues.image;
    const data = fs.readFileSync('public/images/product/' + imagePath);
    let base64 = Buffer.from(data).toString('base64');
    base64 = `data:image/png;base64,${base64}`;
    result.dataValues.image = base64;
  });

  res.json({'result': resultArr});
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
  //  const posts = await Post.findAll({
  //    include: [
  //      {
  //       model: User,
  //       attributes: ['email', 'nickname'],
  //     },
  //     {
  //       model: Product,
  //       attributes: ['title', 'image', 'price', 'like'],
  //     }
  //   ],
  //    order: [['createdAt', 'DESC']],
  //  });

  //  console.log(posts);
  res.json({'test': 'test_success'});
});

module.exports = router;
