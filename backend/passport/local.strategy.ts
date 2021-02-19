import { getRepository } from 'typeorm';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
import redisClient from '../redis';
import { PassportStatic } from 'passport';
import { User } from '../models/user';

const LocalStrategy = passportLocal.Strategy;

const options = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

export default (passport: PassportStatic) => {
  passport.use(
    'signin',
    new LocalStrategy(
      options,
      async (email: string, password: string, done) => {
        try {
          const userRepository = getRepository(User);
          const user = await userRepository.findOne({
            select: ['id', 'email', 'password'],
            where: { email },
          });

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
            process.env.ACCESS_TOKEN_SECRET as string,
            {
              expiresIn: '10m',
            }
          );
          const refreshToken = jwt.sign(
            { id: user.id },
            process.env.REFRESH_TOKEN_SECRET as string,
            {
              expiresIn: '60m',
            }
          );

          redisClient.setValue(user.id.toString(), refreshToken);

          return done(null, { email, accessToken, refreshToken });
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
