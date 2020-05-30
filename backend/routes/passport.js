const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStarategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJWT;

let UserModel = require('../models').User;