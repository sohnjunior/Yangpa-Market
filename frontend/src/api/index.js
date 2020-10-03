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
const fetchSalesOrder = () => instance.get('/orders?status=sale');
const fetchPurchasedOrder = () => instance.get('/orders?status=purchased');
const fetchPendingOrder = () => instance.get('/orders?status=pending');
const approveOrder = ({ postID }) => instance.put(`/orders/${postID}/approve`);
const rejectOrder = (orderID) => instance.delete(`/orders/${orderID}/reject`);

/**
 * @purpose 리뷰 API
 */
const fetchAllReviews = () => instance.get('/reviews');
const createReview = (payload) =>
  instance.post('/reviews', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
const increaseReviewHit = (reviewID) => instance.put(`reviews/${reviewID}/hit`);
const increaseReviewLike = (reviewID) =>
  instance.put(`reviews/${reviewID}/like`);

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
  fetchSalesOrder,
  fetchPurchasedOrder,
  fetchPendingOrder,
  createReview,
  fetchAllReviews,
  increaseReviewHit,
  increaseReviewLike,
  approveOrder,
  rejectOrder,
};
