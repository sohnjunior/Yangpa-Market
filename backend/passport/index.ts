import setupLocalStrategy from './local.strategy';
import setupJWTStrategy from './jwt.strategy';
import { PassportStatic } from 'passport';

function setupPassportConfig(passport: PassportStatic) {
  setupLocalStrategy(passport);
  setupJWTStrategy(passport);
}

export default setupPassportConfig;
