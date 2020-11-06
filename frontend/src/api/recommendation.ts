import { instance } from './common';

/**
 * @purpose 상품 추천 API
 */
const fetchPopularProducts = () => instance.get('/recommendation');
const fetchRelatedProducts = (productID) =>
  instance.get(`/recommendation/${productID}`);

export default { fetchPopularProducts, fetchRelatedProducts };
