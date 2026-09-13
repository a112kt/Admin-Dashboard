import { apiCall } from "@/API/apiClient";

// 🔹 Logout Function
export async function logoutUser() {
  const res = await apiCall.post("/Auth/SignOut");
  return res.data;
}

// 🔹 Get User Info
export async function getUserInfo() {
  const res = await apiCall.get("/Auth/UserInfo");
  return res.data;
}
// logout 











