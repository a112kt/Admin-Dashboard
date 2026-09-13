import { apiCall } from "@/API/apiClient";

export async function getBrandOrders() {
  const res = await apiCall.get("/Order/brand-orders");
  return res.data;
}

export async function updateOrderStatus(
  orderId: number,
  newStatus: number,
) {
  const res = await apiCall.put(`/Order/${orderId}/status`, { newStatus });
  return res.data;
}

export async function cancelOrder(orderId: number, reason?: string) {
  const res = await apiCall.post(`/Order/${orderId}/cancel`, { reason });
  return res.data;
}
export async function getOrderStatus() {
  const res = await apiCall.get(`/Lookup/order-statuses`);
  return res.data;
}
export async function getPaymentOrderStatus() {
  const res = await apiCall.get(`/Lookup/payment-statuses`);
  return res.data;
}
export async function getPaymentMethods() {
  const res = await apiCall.get(`/Lookup/payment-methods`);
  return res.data;
}