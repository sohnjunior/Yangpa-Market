const express = require('express');
const UserController = require('../../controllers/users');
const { verifyToken, tokenLimiter } = require('../../middlewares');
require('dotenv').config();

const router = express.Router();

router.get('/', UserController.getUsers); // 관리자를 제외한 모든 유저 조회
router.get('/self', verifyToken, UserController.getUser); // 유저 정보 조회
router.get('/admin/check', verifyToken, UserController.checkAdmin); // 관리자 여부 조회
router.post('/signin', tokenLimiter, UserController.signin); // 로그인
router.post('/', UserController.createUser); // 회원 생성
router.put('/self', verifyToken, UserController.updateUser); // 회원 정보 수정
router.delete('/self', verifyToken, UserController.deleteUser); // 회원 정보 삭제

module.exports = router;
