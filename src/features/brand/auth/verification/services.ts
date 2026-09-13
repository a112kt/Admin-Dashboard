import { apiCall } from "@/API/apiClient";
import { verigicationData } from "../types/auth";
//Verify Account function
export async function verification(data: verigicationData) {
  console.log("all my friends &&&");
  console.log(data);
  const res = await apiCall.post("/Otp/VerifyOtp", data);
  console.log(res.data);
  return res.data;
}
// Resend OTP function
export async function resendOtp(email: string) {
  const res = await apiCall.post(`/Otp/ResendOtp?email=${email}`);
  return res.data;
}
// forget password
