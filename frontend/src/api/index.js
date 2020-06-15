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
function registerUser(payload){
  return instance.post("/users/register",payload);
}

//유저 로그인 요펑
function loginUser(payload) {
  return instance.post("/users/login", payload);
}

function getallUser(){
  return instance.get("/users/users");
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

// 특정 상품 게시글 조회 요청
function retreiveComment(payload) {
  return instance.get(`/comment/retreive/${payload}`);
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

// 실시간 인기 상품 요청
function realtimePopular() {
  return instance.get("/recommend/popular");
}


// 장바구니 상품 추가 요청
function createNewCartProduct(payload) {
  return instance.post("/cart/new", payload);
}

// 장바구니 상품 조회 요청
function retriveAllCartProducts() {
  return instance.get("/cart/retrieve");
}

// TODO: 장바구니 상품 제거 요청


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
  registerUser, loginUser, getallUser, registerComment, retreiveComment,
  createNewProduct, retriveAllProducts, updateProduct, retreiveProduct, deletePost, searchProduct,
  realtimePopular,
  createNewCartProduct, retriveAllCartProducts,
  testJWT, testJWTVerify, testProduct }