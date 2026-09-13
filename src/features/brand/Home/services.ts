import { apiCall } from "@/API/apiClient";

export async function getBrandDashboard() {
  const res = await apiCall.get("/Dashboard/brand-stats");
  return res.data;
}

export async function getMyBrand() {
  const res = await apiCall.get("/Brand/my");
  return res.data;
}

export async function getOrdersByRegion() {
  const res = await apiCall.get("/Dashboard/orders-by-region");
  return res.data;
}
