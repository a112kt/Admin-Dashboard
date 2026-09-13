import { adminApiCall } from "@/API/adminApiClient";

export async function getRefundRequests() {
  const res = await adminApiCall.get("/admin/orders/refund-requests");
  return res.data;
}

export async function processRefund(orderId: number) {
  const res = await adminApiCall.post(`/admin/orders/${orderId}/refund`);
  return res.data;
}

export async function getPaymentMethods() {
  const res = await adminApiCall.get("/Lookup/payment-methods");
  return res.data;
}

export async function getPaymentStatuses() {
  const res = await adminApiCall.get("/Lookup/payment-statuses");
  return res.data;
}
