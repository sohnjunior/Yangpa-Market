const localStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const options = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

module.exports = (passport) => {
  passport.use(
    'signin',
    new localStrategy(options, async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, {
            message: '이메일 혹은 비밀번호를 확인해주세요',
          });
        }

        if (user.password !== password) {
          return done(null, false, {
            message: '이메일 혹은 비밀번호를 확인해주세요',
          });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: '50m',
        });

        return done(null, { token, email });
      } catch (err) {
        done(err);
      }
    })
  );
};
