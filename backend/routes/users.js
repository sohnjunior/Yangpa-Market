const express = require('express');
const UserController = require('../controllers/users');

const router = express.Router();

require('dotenv').config();

const { verifyToken, tokenLimiter } = require('../middlewares');

// 관리자를 제외한 모든 유저 조회
router.get('/users', UserController.getUsers);

// 유저 정보 조회
router.get('/retrieve', verifyToken, UserController.getUser);

// 관리자 여부 조회
router.get('/admin', verifyToken, UserController.checkAdmin);

// 새로운 유저 생성
router.post('/register', UserController.createUser);

// 로그인
router.post('/login', tokenLimiter, UserController.signin);

// 회원 정보 수정
router.post('/update', verifyToken, UserController.updateUser);

// 회원 정보 삭제
router.delete('/delete', UserController.deleteUser);

module.exports = router;
