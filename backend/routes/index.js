const express = require('express');

const usersRouter = require('./user/users');
const ProductRouter = require('./board/product'); // 상품 관련 라우터
const RecommandRouter = require('./board/recommend'); // 상품 추천 관련 라우터
const CartRouter = require('./dashboard/cart'); // 장바구니 관련 라우터
const OrderRouter = require('./dashboard/order'); // 구매내역 관련 라우터
const ReviewRouter = require('./board/review'); // 후기 관련 라우터
const CommentRouter = require('./board/comment'); // 댓글 관련 라우터

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/products', ProductRouter);
apiRouter.use('/recommendation', RecommandRouter);
apiRouter.use('/carts', CartRouter);
apiRouter.use('/orders', OrderRouter);
apiRouter.use('/reviews', ReviewRouter);
apiRouter.use('/comments', CommentRouter);

module.exports = apiRouter;
