import { apiCall } from "@/API/apiClient";
import { SettlementFilterDto } from "../types";

export async function getBrandWalletSummary() {
  const res = await apiCall.get("/brand/finance/summary");
  return res.data;
}

export async function getBrandSettlements(filters?: SettlementFilterDto) {
  const params: Record<string, any> = {};
  if (filters?.status) params.status = filters.status;
  if (filters?.dateFrom) params.dateFrom = filters.dateFrom;
  if (filters?.dateTo) params.dateTo = filters.dateTo;
  if (filters?.pageIndex) params.pageIndex = filters.pageIndex;
  if (filters?.pageSize) params.pageSize = filters.pageSize;
  const res = await apiCall.get("/brand/finance/settlements", { params });
  return res.data;
}

export async function createWithdrawalRequest(amount: number) {
  const res = await apiCall.post("/brand/finance/withdraw", { amount });
  return res.data;
}

export async function getWithdrawalHistory() {
  const res = await apiCall.get("/brand/finance/withdrawals");
  return res.data;
}

export async function getBrandFinancePolicy() {
  const res = await apiCall.get("/brand/finance/policy");
  return res.data;
}

export async function getSettlementStatuses() {
  const res = await apiCall.get("/Lookup/settlement-statuses");
  return res.data;
}

export async function getWithdrawalRequestStatuses() {
  const res = await apiCall.get("/Lookup/withdrawal-request-statuses");
  return res.data;
}
