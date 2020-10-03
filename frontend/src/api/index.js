import axios from 'axios';
import { setInterceptors } from './interceptors';

/*
    axios 요청을 보내기 전 필요한 헤더를 추가해줍니다.
    - authorization에 JWT 토큰 값을 추가함
*/
function createInstance() {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
  });

  return setInterceptors(instance);
}

const instance = createInstance();

/**
 * @purpose 회원 API
 */
const fetchAllUser = (payload) => instance.get('/users', payload);
const fetchUser = () => instance.get('/users/self');
const registerUser = (payload) => instance.post('/users', payload);
const signinUser = (payload) => instance.post('/users/signin', payload);
const updateUser = (payload) => instance.put('/users/self', payload);
const deleteUser = () => instance.delete('/users/self');
const isAdminUser = () => instance.get(`/users/admin/check`);

/**
 * @purpose 상품 게시글 API
 */

const createNewProduct = (payload) =>
  instance.post('/products', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
const fetchAllProducts = () => instance.get('/products');
const fetchProduct = (productID) => instance.get(`/products/${productID}`);
const searchProduct = (keyword) =>
  instance.get(`/products/search?keyword=${keyword}`);
const updateProduct = (productID, payload) =>
  instance.put(`/products/${productID}`, payload);
const likeProduct = (productID) => instance.put(`/products/${productID}/like`);
const deletePost = (orderHash) => instance.delete(`/products/${orderHash}`);

/**
 * @purpose 댓글 API
 */

const fetchComment = (postID) => instance.get(`/comments/${postID}`);
const createComment = (payload) => instance.post('/comments', payload);
const updateComment = ({ commentID, payload }) =>
  instance.put(`/comments/${commentID}`, payload);
const deleteComment = ({ commentID }) =>
  instance.delete(`/comments/${commentID}`);

/**
 * @purpose 상품 추천 API
 */

const fetchPopularProducts = () => instance.get('/recommendation');
const fetchRelatedProducts = (productID) =>
  instance.get(`/recommendation/${productID}`);

/**
 * @purpose 장바구니 API
 */

const fetchAllCartProducts = () => instance.get('/carts/self/products');
const createCartProduct = (payload) =>
  instance.post('/carts/self/products', payload);
const purchaseCartProduct = (payload) =>
  instance.post('/carts/self/products/purchase', payload);
const removeCartProduct = ({ productID }) =>
  instance.delete(`/carts/self/products/${productID}`);

/**
 * @purpose 주문 API
 */

// 유저가 판매중인 상품내역 조회 요청
function getOrder() {
  return instance.get('/order/retrieve');
}

// 유저의 구매 상품 내역 조회 요청
function getOrderBuying() {
  return instance.get('/order/retrieve/buying');
}

// 미승인 상품 구매 요청 조회
function getNotApprovedProduct() {
  return instance.get('/order/request');
}

// 상품 구매 승인 요청
function approveProduct(payload) {
  return instance.put('/order/approve', payload);
}

// 상품 구매 거부 처리 요청
function deniedProduct(payload) {
  return instance.delete(`/order/denied/${payload}`);
}

/**
 * @purpose 리뷰 API
 */

// 전체 상품 후기 조회 요청
function retrueveAllReview() {
  return instance.get('/review/retrieve');
}

// 새로운 후기 생성 요청
function createNewReview(payload) {
  return instance.post('/review/create', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

// 리뷰 조회수 증가
function increaseHitReview(payload) {
  return instance.put(`/review/hit/${payload}`);
}

// 리뷰 좋아요 증가
function increaseLikeReview(payload) {
  return instance.put(`/review/like/${payload}`);
}

export {
  registerUser,
  updateUser,
  signinUser,
  fetchAllUser,
  fetchUser,
  deleteUser,
  isAdminUser,
  createComment,
  fetchComment,
  deleteComment,
  updateComment,
  createNewProduct,
  fetchAllProducts,
  updateProduct,
  fetchProduct,
  deletePost,
  searchProduct,
  fetchPopularProducts,
  fetchRelatedProducts,
  likeProduct,
  createCartProduct,
  fetchAllCartProducts,
  removeCartProduct,
  purchaseCartProduct,
  getOrder,
  getOrderBuying,
  getNotApprovedProduct,
  createNewReview,
  retrueveAllReview,
  increaseHitReview,
  increaseLikeReview,
  approveProduct,
  deniedProduct,
};
