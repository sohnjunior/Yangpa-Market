import { instance } from './common';

/**
 * @purpose 상품 게시글 API
 */

function registerProduct(payload: FormData) {
  return instance.post('/products', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

function fetchProductsWithCategory(category: string, page: number, take: number) {
  return instance.get(`/products?category=${category}&page=${page}&take=${take}`);
}

function fetchProduct(productID) {
  return instance.get(`/products/${productID}`);
}

function searchProduct(keyword: string) {
  return instance.get(`/products/search?keyword=${keyword}`);
}

function editProduct(productID: string, payload) {
  return instance.put(`/products/${productID}`, payload);
}

function likeProduct(productID: string) {
  return instance.put(`/products/${productID}/like`);
}

function deletePost(productID: string) {
  return instance.delete(`/products/${productID}`);
}

export default {
  registerProduct,
  fetchProductsWithCategory,
  fetchProduct,
  searchProduct,
  editProduct,
  likeProduct,
  deletePost,
};
