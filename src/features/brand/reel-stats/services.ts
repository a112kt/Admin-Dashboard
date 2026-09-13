import { apiCall } from "@/API/apiClient";

export async function getBrandReelAnalytics() {
  const res = await apiCall.get("/Dashboard/brand-reel-analytics");
  return res.data;
}
