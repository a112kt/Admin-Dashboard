import axios from "axios";
import { apiCall } from "@/API/apiClient";
import { SettlementFilterDto } from "./types";

const shippingApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL + '/api',
  timeout: 500000,
  headers: { "Content-Type": "application/json", Accept: "text/plain" },
});

export async function getReadyToShipOrders() {
  const res = await shippingApi.get("/shipping/ready-to-ship");
  return res.data;
}

export async function updateShippingStatus(orderId: number, status: number) {
  const res = await shippingApi.put("/shipping/update-status", { orderId, status });
  return res.data;
}

export async function getOrderStatuses() {
  const res = await shippingApi.get("/Lookup/order-statuses");
  return res.data;
}

export async function getPaymentStatuses() {
  const res = await shippingApi.get("/Lookup/payment-statuses");
  return res.data;
}

export async function getPaymentMethods() {
  const res = await shippingApi.get("/Lookup/payment-methods");
  return res.data;
}

export async function updatePaymentToPaid(orderId: number) {
  const res = await shippingApi.put("/shipping/update-payment-to-paid", { orderId });
  return res.data;
}

export async function getShippingWalletSummary() {
  const res = await apiCall.get("/shipping/finance/summary");
  return res.data;
}

export async function getShippingSettlements(filter?: SettlementFilterDto) {
  const params: Record<string, any> = {};
  if (filter?.status) params.status = filter.status;
  if (filter?.dateFrom) params.dateFrom = filter.dateFrom;
  if (filter?.dateTo) params.dateTo = filter.dateTo;
  if (filter?.pageIndex) params.pageIndex = filter.pageIndex;
  if (filter?.pageSize) params.pageSize = filter.pageSize;
  const res = await apiCall.get("/shipping/finance/settlements", { params });
  return res.data;
}

export async function getShippingPolicy() {
  const res = await apiCall.get("/shipping/finance/policy");
  return res.data;
}
