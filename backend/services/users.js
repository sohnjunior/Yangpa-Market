const { User, Cart } = require('../models');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const getAllUserExceptAdmin = async () => {
  const users = await User.findAll({ where: { admin: 0 } });
  return users;
};

const getUserInfo = async (userID) => {
  const user = await User.findOne({ where: { id: userID } });
  return user;
};

const createUser = async (
  email,
  password,
  nickname,
  phone,
  sex,
  birthday,
  admin
) => {
  const exUser = await User.findOne({ where: { email: email } });
  if (exUser) return false;

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

  return true;
};

const updateUserInfo = async (
  email,
  password,
  nickname,
  phone,
  sex,
  birthday
) => {
  const user = await User.update(
    { password, nickname, phone, sex, birthday },
    { where: { email: email } }
  );
  return user;
};

const deleteUser = async (userID) => {
  await User.destroy({ where: { id: userID } });
};

const signIn = async (email, password) => {
  // If request's email and password is exist...
  const user = await User.findOne({ where: { email: email } }); // Get User by email
  if (!user) return [false, null];

  if (user.password === password) {
    // If request's email and password is correct...
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return [true, token];
  }

  return [false, null];
};

const checkAdminPerm = async (userID) => {
  const user = await User.findOne({ where: { id: userID } });
  const isAdmin = user.admin;

  return isAdmin;
};

module.exports = {
  getAllUserExceptAdmin,
  getUserInfo,
  createUser,
  updateUserInfo,
  deleteUser,
  signIn,
  checkAdminPerm,
};
