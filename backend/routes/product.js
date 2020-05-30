var express = require('express');
var router = express.Router();

// 새로운 상품 게시글 생성
router.post('/create', (req, res, next) => {
  const createPost = {
    'title': req.body.title,
    'body': req.body.body,
    'image': req.body.image,
    'category': req.body.category,
  }

  res.json(createPost);
});

// 상품 정보 수정
router.put('/update', (req, res, next) => {

});

// 상품 게시글 삭제
router.delete('/delete', (req, res, next) => {

});

// 전체 상품 게시글 조회
router.get('/retreive', (req, res, next) => {

});

// 특정 키워드 기준 검색 결과 
router.get('/search', (req, res, next) => {

});


module.exports = router;
