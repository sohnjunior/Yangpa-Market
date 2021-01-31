const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { User } = require('../models');
const redisClient = require('../redis');

require('dotenv').config();

function createOptions(mode) {
  const isRefreshMode = mode === 'refresh';

  return {
    jwtFromRequest: isRefreshMode
      ? ExtractJWT.fromBodyField('refreshToken')
      : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: isRefreshMode
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET,
  };
}

module.exports = (passport) => {
  passport.use(
    'access-token',
    new JWTStrategy(createOptions('access'), async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ where: { id: jwtPayload.id } });
        if (user) return done(null, user);
        done(null, false);
      } catch (err) {
        done(err);
      }
    })
  );

  passport.use(
    'refresh-token',
    new JWTStrategy(createOptions('refresh'), async (jwtPayload, done) => {
      const { id: userID } = jwtPayload;
      const refreshToken = await redisClient.getValue(userID);

      if (refreshToken) return done(null, userID);
      return done(null, -1);
    })
  );
};
