import { instance } from './common';

/**
 * @purpose 장바구니 API
 */
const fetchAllCartProducts = () => instance.get('/carts/self/products');
const createCartProduct = (payload) => instance.post('/carts/self/products', payload);
const removeCartProduct = ({ productID }) => instance.delete(`/carts/self/products/${productID}`);

export default {
  fetchAllCartProducts,
  createCartProduct,
  removeCartProduct,
};
