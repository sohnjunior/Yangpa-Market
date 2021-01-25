const passport = require('passport');
const UserService = require('../services/users');
const { HTTP400Error, HTTP401Error } = require('../utils/errors');

const getUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUserExceptAdmin();

    res.status(200).json({
      status: 'ok',
      message: '관리자를 제외한 모든 유저 정보 조회',
      user: users,
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;

    const user = await UserService.getUserInfo(userID);

    res
      .status(200)
      .json({ status: 'ok', message: '유저 정보 조회', result: user });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, password, nickname, phone, sex, birthday, admin } = req.body;

    const isValid = await UserService.createUser(
      email,
      password,
      nickname,
      phone,
      sex,
      birthday,
      admin
    );

    if (!isValid) {
      next(new HTTP400Error('이미 존재하는 이메일입니다'));
    }

    res.status(201).json({ status: 'ok', message: '회원가입이 성공했습니다' });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email, password, nickname, phone, sex, birthday } = req.body;

    const user = UserService.updateUserInfo(
      email,
      password,
      nickname,
      phone,
      sex,
      birthday
    );

    res.status(200).json({
      status: 'ok',
      message: '계정이 성공적으로 생성되었습니다',
      user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;

    await UserService.deleteUser(userID);

    res
      .status(200)
      .json({ status: 'ok', message: '계정이 성공적으로 삭제되었습니다' });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  passport.authenticate('signin', async (err, data, info) => {
    if (err) return next(err);
    if (info) {
      return next(new HTTP401Error('이메일 혹은 비밀번호를 확인해주세요'));
    }

    res
      .status(200)
      .json({ status: 'ok', message: '로그인 되었습니다', ...data });
  })(req, res, next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  signin,
};
