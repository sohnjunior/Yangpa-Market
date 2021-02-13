import { instance } from './common';

/**
 * @purpose 주문 API
 */
const fetchSalesOrder = () => instance.get('/orders?status=sale');
const fetchPurchasedOrder = () => instance.get('/orders?status=purchased');
const fetchPendingOrder = () => instance.get('/orders?status=pending');
const createOrder = (payload: { requestIds: number[]; buyerEmail: string }) =>
  instance.post('/orders', payload);
const approveOrder = (orderID) => instance.put(`/orders/${orderID}/approve`);
const rejectOrder = (orderID) => instance.put(`/orders/${orderID}/reject`);
const deleteOrder = (orderID) => instance.delete(`/orders/${orderID}`);

export default {
  fetchSalesOrder,
  fetchPurchasedOrder,
  fetchPendingOrder,
  createOrder,
  approveOrder,
  rejectOrder,
  deleteOrder,
};
