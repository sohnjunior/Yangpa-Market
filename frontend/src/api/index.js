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

// 댓글 조회 요청
function retreiveComment(payload) {
  return instance.get(`/comment/retreive/${payload}`);
}

//댓글 등록 요청
function registerComment(payload) {
  return instance.post('/comment/create', payload);
}

// 댓글 수정 요청
function updateComment(payload) {
  return instance.put(`/comment/update`, payload);
}

// 댓글 삭제 요청
function deleteComment(payload) {
  return instance.delete(`/comment/delete`, { params: { id: payload.id } });
}

/**
 * @purpose 상품 추천 API
 */

// 실시간 인기 상품 요청
function realtimePopular() {
  return instance.get('/recommend/popular');
}

// 연관 상품 추천 요청
function relatedProduct(payload) {
  return instance.get(`/recommend/related/${payload}`);
}

/**
 * @purpose 장바구니 API
 */

// 장바구니 상품 조회 요청
function retriveAllCartProducts() {
  return instance.get('/cart/retrieve');
}

// 장바구니 상품 추가 요청
function createNewCartProduct(payload) {
  return instance.post('/cart/new', payload);
}

// 장바구니 상품 구매 요청
function buyFromCart(payload) {
  return instance.post('/cart/buy', payload);
}

// 장바구니 상품 제거 요청
function removeFromCart(payload) {
  return instance.delete('/cart/delete', {
    params: { productID: payload.productID },
  });
}

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
  registerComment,
  retreiveComment,
  deleteComment,
  updateComment,
  createNewProduct,
  fetchAllProducts,
  updateProduct,
  fetchProduct,
  deletePost,
  searchProduct,
  realtimePopular,
  relatedProduct,
  likeProduct,
  createNewCartProduct,
  retriveAllCartProducts,
  removeFromCart,
  buyFromCart,
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
