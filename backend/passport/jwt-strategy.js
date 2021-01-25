const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { User } = require('../models');
require('dotenv').config();

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

module.exports = (passport) => {
  passport.use(
    'jwt',
    new JWTStrategy(options, async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ where: { id: jwtPayload.id } });
        if (user) return done(null, user);
        done(null, false);
      } catch (err) {
        done(err);
      }
    })
  );
};
