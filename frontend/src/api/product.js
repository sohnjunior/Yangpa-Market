import { instance } from './common';

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

export default {
  createNewProduct,
  fetchAllProducts,
  fetchProduct,
  searchProduct,
  updateProduct,
  likeProduct,
  deletePost,
};
