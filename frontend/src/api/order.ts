import { instance } from './common';

/**
 * @purpose 주문 API
 */
const fetchSalesOrder = () => instance.get('/orders?status=sale');
const fetchPurchasedOrder = () => instance.get('/orders?status=purchased');
const fetchPendingOrder = () => instance.get('/orders?status=pending');
const approveOrder = ({ postID }) => instance.put(`/orders/${postID}/approve`);
const rejectOrder = (orderID) => instance.delete(`/orders/${orderID}/reject`);

export default {
  fetchSalesOrder,
  fetchPurchasedOrder,
  fetchPendingOrder,
  approveOrder,
  rejectOrder,
};
