var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const passport = require('passport');

const { User, Cart } = require('../models');

require('dotenv').config();

const { verifyToken, tokenLimiter } = require('../middlewares'); //Limiter from middleware.js

//회원정보 수정
const updateUser = async ({
  email,
  password,
  nickname,
  phone,
  sex,
  birthday,
}) => {
  return await User.update(
    { password, nickname, phone, sex, birthday },
    { where: { email: email } }
  );
};

//관리자를 제외한 유저 불러오기
const getAllUser = async () => {
  return await User.findAll({ where: { admin: 0 } });
};

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//Get all user
router.get('/users', function (req, res, next) {
  getAllUser().then((user) => res.json(user));
});

//Get User
router.get('/retrieve', verifyToken, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.query.email } });
    res.json({ result: user });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 관리자 여부 조회
router.get('/admin', verifyToken, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.query.email } });
    const isAdmin = user.admin;
    res.json({ isAdmin });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//Register new User. Create new User by 'createUser'
router.post('/register', async function (req, res, next) {
  const { email, password, nickname, phone, sex, birthday, admin } = req.body;

  let exUser = await User.findOne({ where: { email: email } });
  if (exUser) {
    res.status(401).json({ msg: 'Email already Exist' });
  }

  const user = await User.create({
    email,
    password,
    nickname,
    phone,
    sex,
    birthday,
    admin,
  });
  await Cart.create({ title: email, userId: user.id });

  res.json({ user, msg: 'account created successfully' });
});

//Login
router.post('/login', tokenLimiter, async function (req, res, next) {
  const { email, password } = req.body;
  if (email && password) {
    // If request's email and password is exist...
    let user = await User.findOne({ where: { email: email } }); // Get User by email
    if (!user) {
      res.status(401).json({ msg: 'No User found' });
    }

    if (user.password === password) {
      // If request's email and password is correct...
      let payload = { id: user.id };
      let token = jwt.sign(payload, process.env.JWT_SECRET);

      res.json({ msg: 'ok', token, email });
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
});

router.get('/protected', verifyToken, (req, res) => {
  res.json(req.decoded);
});

//회원 정보 수정
router.post('/update', verifyToken, async function (req, res, next) {
  const { email, password, nickname, phone, sex, birthday } = req.body;

  try {
    const user = await updateUser({
      email,
      password,
      nickname,
      phone,
      sex,
      birthday,
    });

    res.json({ user, msg: 'account created successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 회원 정보 삭제
router.delete('/delete', async (req, res, next) => {
  const { email } = req.query;
  try {
    await User.destroy({ where: { email: email } });
    res.json({ msg: 'account deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
