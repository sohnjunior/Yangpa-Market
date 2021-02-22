import { getRepository } from 'typeorm';
import { PassportStatic } from 'passport';
import passportJWT from 'passport-jwt';
import redisClient from '../redis';
import { User } from '../models/user';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

function createOptions(mode: 'refresh' | 'access') {
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

export default (passport: PassportStatic) => {
  passport.use(
    'access-token',
    new JWTStrategy(createOptions('access'), async (jwtPayload, done) => {
      try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ id: jwtPayload.id });

        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        done(err, false);
      }
    })
  );

  passport.use(
    'refresh-token',
    new JWTStrategy(createOptions('refresh'), async (jwtPayload, done) => {
      try {
        const { id: userId } = jwtPayload;
        const refreshToken = await redisClient.getValue(userId);

        if (refreshToken) return done(null, userId);
      } catch (err) {
        done(err, false);
      }
    })
  );
};
