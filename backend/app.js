var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tokenRouter = require("./routes/token");// Test router about token
const apiRouter = require("./routes/test/api"); // Test router about API for token
const ProductRouter = require('./routes/product');  // 상품 관련 라우터
const RecommandRouter = require('./routes/recommend');  // 상품 추천 관련 라우터
const CartRouter = require('./routes/cart');  // 장바구니 관련 라우터
const ReviewRouter = require('./routes/review');  // 후기 관련 라우터

const { sequelize } = require('./models');
const passportConfig = require('./passport/passport');

const app = express();
sequelize.sync();
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// CORS 허용
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/token", tokenRouter);
app.use("/api", apiRouter);// Test router about API for token
app.use("/product", ProductRouter);
app.use("/recommend", RecommandRouter);
app.use("/cart", CartRouter);
app.use("/review", ReviewRouter); 

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

module.exports = app;
