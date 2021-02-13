import 'reflect-metadata';
import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportConfig from './passport';
import apiRouter from './routes';
import handleErrors from './routes/middlewares/error-handler';
import { HTTP404Error } from './utils/errors';
import { createConnection } from 'typeorm';

dotenv.config();

createConnection()
  .then(() => {
    console.log('데이터베이스가 연결되었습니다 😀');
  })
  .catch((err) => {
    console.error('⚠️ 데이터베이스 연결 시 에러가 발생했습니다.', err);
  });

const app: Application = express();

passportConfig(passport);

/** view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/** cors */
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

/** catch 404 and forward to exception handler */
app.use((req, res, next) => {
  next(new HTTP404Error('page not found'));
});

/** exception handler */
app.use(handleErrors);

export default app;
