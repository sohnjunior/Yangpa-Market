const localStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const redisClient = require('../redis');

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

        const accessToken = jwt.sign(
          { id: user.id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '1m',
          }
        );
        const refreshToken = jwt.sign(
          { id: user.id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: '20m',
          }
        );

        redisClient.setValue(user.id, refreshToken);

        return done(null, { email, accessToken, refreshToken });
      } catch (err) {
        done(err);
      }
    })
  );
};
