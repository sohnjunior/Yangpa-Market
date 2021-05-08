import { instance } from './common';

/**
 * @purpose 주문 API
 */

function fetchSalesOrder() {
  return instance.get('/orders?status=sale');
}

function fetchPurchasedOrder() {
  return instance.get('/orders?status=purchased');
}

function fetchPendingOrder() {
  return instance.get('/orders?status=pending');
}

function createOrder(payload: { requestIds: number[]; buyerEmail: string }) {
  return instance.post('/orders', payload);
}

function approveOrder(orderId: number) {
  return instance.put(`/orders/${orderId}/approve`);
}

function rejectOrder(orderId: number) {
  return instance.put(`/orders/${orderId}/reject`);
}

function deleteOrder(orderId: number) {
  return instance.delete(`/orders/${orderId}`);
}

export default {
  fetchSalesOrder,
  fetchPurchasedOrder,
  fetchPendingOrder,
  createOrder,
  approveOrder,
  rejectOrder,
  deleteOrder,
};
