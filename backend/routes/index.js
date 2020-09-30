const express = require('express');

const usersRouter = require('./auth/users');
const ProductRouter = require('./board/product'); // 상품 관련 라우터
const RecommandRouter = require('./board/recommend'); // 상품 추천 관련 라우터
const CartRouter = require('./dashboard/cart'); // 장바구니 관련 라우터
const OrderRouter = require('./dashboard/order'); // 구매내역 관련 라우터
const ReviewRouter = require('./board/review'); // 후기 관련 라우터
const CommentRouter = require('./board/comment'); // 댓글 관련 라우터

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/product', ProductRouter);
apiRouter.use('/recommend', RecommandRouter);
apiRouter.use('/cart', CartRouter);
apiRouter.use('/order', OrderRouter);
apiRouter.use('/review', ReviewRouter);
apiRouter.use('/comment', CommentRouter);

module.exports = apiRouter;
