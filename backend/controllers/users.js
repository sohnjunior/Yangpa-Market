const UserService = require('../services/users');

const getUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUserExceptAdmin();
    res.json({ user: users });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await UserService.getUserInfo(email);
    res.json({ result: user });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createUser = async (req, res, next) => {
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

  if (isValid) {
    res.json({ msg: 'account created successfully' });
  } else {
    res.status(401).json({ msg: 'Email already Exist' });
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

    res.json({ user, msg: 'account created successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.query;
    await UserService.deleteUser(email);
    res.json({ msg: 'account deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const [isValid, token] = await UserService.signIn(email, password);

  if (isValid) {
    res.json({ msg: 'ok', token, email });
  } else {
    res.status(401).json({ msg: 'Password is incorrect' });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const { email } = req.query;
    const isAdmin = await UserService.checkAdminPerm(email);
    res.json({ isAdmin });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  signin,
  checkAdmin,
};
