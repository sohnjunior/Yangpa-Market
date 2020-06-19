import axios from 'axios';
import { setInterceptors } from './interceptors';


/*
    axios 요청을 보내기 전 필요한 헤더를 추가해줍니다.
    - authorization에 JWT 토큰 값을 추가함
*/
function createInstance() {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:3000",
  });
  
  return setInterceptors(instance);
}

const instance = createInstance();

/*
    Node.js 서버에 보낼 axios 요청 함수들 정의
*/

//유저 등록 요청
function updateUser(payload){
  return instance.post("/users/update",payload);
}

//유저 업데이트 요청
function registerUser(payload) {
  return instance.post("/users/update", payload);
}

//유저 로그인 요청
function loginUser(payload) {
  return instance.post("/users/login", payload);
}

//모든 유저 조회 요청
function getallUser(){
  return instance.get("/users/users");
}

//유저 조회 요청
function getUser(payload) {
  return instance.get("/users/retrieve", { params: { email: payload.email } });
}

//유저 삭제 요청
function deleteUser(payload) {
  return instance.delete(`/users/delete`, { params: { email: payload.email } });
}

// 상품 게시글 등록 요청
function createNewProduct(payload) {
  return instance.post("/product/create", payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

//댓글 등록 요청
function registerComment(payload) {
  return instance.post("/comment/create", payload);
}

// 댓글 조회 요청
function retreiveComment(payload) {
  return instance.get(`/comment/retreive/${payload}`);
}

// 댓글 삭제 요청 
function deleteComment(payload) {
  return instance.delete(`/comment/delete`, { params: { id: payload.id } });
}

// 댓글 삭제 요청 
function updateComment(payload) {
  return instance.put(`/comment/update`, { params: { id: payload.id } });
}

// 상품 게시글 삭제 요청 
function deletePost(payload) {
  return instance.delete(`/product/delete/${payload}`);
}

// 특정 상품 게시글 조회 요청
function retreiveProduct(payload) {
  return instance.get(`/product/retreive/${payload}`);
}

// 전체 상품 게시글 조회 요청
function retriveAllProducts() {
  return instance.get("/product/retreive");
}


// 상품 게시글 업데이트 요청
function updateProduct(id, payload) {
  return instance.put(`/product/update/${id}`, payload);
}

// 상품 검색 요청
function searchProduct(payload) {
  return instance.get(`/product/search/${payload}`);
}

// 상품 좋아요 요청
function likeProduct(id) {
  return instance.put(`/product/like/${id}`);
}

// 실시간 인기 상품 요청
function realtimePopular() {
  return instance.get("/recommend/popular");
}

// 연관 상품 추천 요청
function relatedProduct(payload) {
  return instance.get(`/recommend/related/${payload}`);
}

// 장바구니 상품 추가 요청
function createNewCartProduct(payload) {
  return instance.post("/cart/new", payload);
}

// 장바구니 상품 조회 요청
function retriveAllCartProducts(payload) {
  return instance.get("/cart/retrieve", { params: { email: payload.email } });
}

// 장바구니 상품 제거 요청
function removeFromCart(payload) {
  return instance.delete("/cart/delete", { params: { email: payload.email, productID: payload.productID } });
}

/*
    각종 테스트용 axios 요청
*/
function testJWT() {
  return instance.post("/token");
}

function testJWTVerify() {
  return instance.get("/token/test");
}

function testProduct() {
  return instance.get('/product/test');
}

export {
  registerUser, updateUser, loginUser, getallUser, getUser, deleteUser,
  registerComment, retreiveComment, deleteComment, updateComment,
  createNewProduct, retriveAllProducts, updateProduct, retreiveProduct, deletePost, searchProduct,
  realtimePopular, relatedProduct, likeProduct,
  createNewCartProduct, retriveAllCartProducts, removeFromCart,
  testJWT, testJWTVerify, testProduct }