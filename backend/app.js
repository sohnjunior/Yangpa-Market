const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tokenRouter = require("./routes/token");// Test router about token
const apiRouter = require("./routes/test/api"); // Test router about API for token

const { sequelize } = require('./models');

const app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// CORS 허용
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/token", tokenRouter);
app.use("/api", apiRouter);// Test router about API for token

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//To Avoid CORS
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader("Access-Control-Allow-Methods", 'GET,POST');
  res.setHeader("Access-Control-Allow-Headers", 'X-Requested-With, content-type, Authorization');
  next();
})
module.exports = app;
