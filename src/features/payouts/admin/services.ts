import { adminApiCall } from "@/API/adminApiClient";
import { PayBrandSettlementsReqDto, PayShippingSettlementsReqDto } from "../types";

export async function getAdminFinanceDashboard() {
  const res = await adminApiCall.get("/admin/finance/dashboard");
  return res.data;
}

export async function getAdminBrandsFinance() {
  const res = await adminApiCall.get("/admin/finance/brands");
  return res.data;
}

export async function getAdminBrandFinanceDetail(brandId: number) {
  const res = await adminApiCall.get(`/admin/finance/brands/${brandId}`);
  return res.data;
}

export async function payBrandSettlements(data: PayBrandSettlementsReqDto) {
  const res = await adminApiCall.post("/admin/finance/brands/pay", data);
  return res.data;
}

export async function getAdminShippingFinance() {
  const res = await adminApiCall.get("/admin/finance/shipping");
  return res.data;
}

export async function getAdminShippingFinanceDetail(companyId: number) {
  const res = await adminApiCall.get(`/admin/finance/shipping/${companyId}`);
  return res.data;
}

export async function payShippingSettlements(data: PayShippingSettlementsReqDto) {
  const res = await adminApiCall.post("/admin/finance/shipping/pay", data);
  return res.data;
}

export async function getAdminFinancePolicy() {
  const res = await adminApiCall.get("/admin/finance/policy");
  return res.data;
}
