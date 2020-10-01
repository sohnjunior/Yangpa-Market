const express = require('express');
const UserController = require('../../controllers/users');
const { verifyToken, tokenLimiter } = require('../../middlewares');
require('dotenv').config();

const router = express.Router();

// 관리자를 제외한 모든 유저 조회
router.get('/users', UserController.getUsers);

// 유저 정보 조회
router.get('/retrieve', verifyToken, UserController.getUser);

// 관리자 여부 조회
router.get('/admin', verifyToken, UserController.checkAdmin);

// 로그인
router.post('/login', tokenLimiter, UserController.signin);

// 새로운 유저 생성
router.post('/register', UserController.createUser);

// 회원 정보 수정
router.post('/update', verifyToken, UserController.updateUser);

// 회원 정보 삭제
router.delete('/delete', UserController.deleteUser);

module.exports = router;
