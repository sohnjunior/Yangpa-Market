import { instance } from './common';

/**
 * @purpose 상품 게시글 API
 */

function registerProduct(payload) {
  return instance.post('/products', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

function fetchAllProducts() {
  return instance.get('/products');
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

function deletePost(orderHash: string) {
  return instance.delete(`/products/${orderHash}`);
}

export default {
  registerProduct,
  fetchAllProducts,
  fetchProduct,
  searchProduct,
  editProduct,
  likeProduct,
  deletePost,
};
