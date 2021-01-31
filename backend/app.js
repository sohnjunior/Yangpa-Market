const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport');
const apiRouter = require('./routes');
const handleErrors = require('./middlewares/error-handler');
const { HTTP404Error } = require('./utils/errors');
const { sequelize } = require('./models');

const app = express();

sequelize.sync();
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
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

/** catch 404 and forward to exception handler */
app.use((req, res, next) => {
  next(new HTTP404Error('page not found'));
});

/** exception handler */
app.use(handleErrors);

module.exports = app;
