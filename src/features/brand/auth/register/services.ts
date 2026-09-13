import { apiCall } from "@/API/apiClient";
import { registerData, BrandInfoData } from "../types/auth";
export async function getCountriesOptions() {
  const res = await apiCall.get("/Lookup/countries");
  return res.data;
}
export async function getCategoriesOptions() {
  const res = await apiCall.get("/Product/categories");
  return res.data;
}
export async function getCitiesOptions(country: string) {
  const res = await apiCall.get(`/Lookup/cities?country=${country}`);
  return res.data;
}
export async function getInterests() {
  const res = await apiCall.get("/Interest/Interests");
  return res.data;
}
export async function register(data: registerData) {
  console.log("called", data.ProfileImage);
  console.log(data);
  const form = new FormData();
  form.append("FirstName", data.FirstName);
  form.append("LastName", data.LastName);
  form.append("Email", data.Email);
  form.append("PhoneNumber", `+20${data.PhoneNumber}`);
  form.append("Password", data.Password);
  form.append("DateOfBirth", data.DateOfBirth);
  form.append("Gender", data.Gender);
  form.append("ProfileImage", data.ProfileImage);

  const resp = await apiCall.post("/Auth/Register", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp.data;
}
export async function AddInterests(data: string[]) {
  const resp = await apiCall.post("/Interest/UserInterests", {
    interestIds: data,
  });
  return resp.data;
}
export async function AddBrandInfo(data: BrandInfoData) {
  const resp = await apiCall.post("/Brand/BrandInfo", data);
  return resp.data;
}
export async function verifyIdentity(data: any) {
  const form = new FormData();
  form.append("FullName", data.fullName);
  form.append("NationalId", data.nationalId);
  form.append("TaxNumber", data.taxNumber);
  form.append("PhoneNumber", `+20${data.phone}`);
  form.append("IdFrontImage", data.frontId);
  form.append("IdBackImage", data.backId);
  form.append("SelfieImage", data.selfie);
  const resp = await apiCall.post("/BrandVerification/Verify", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp.data;
}
