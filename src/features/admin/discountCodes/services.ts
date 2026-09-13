import { adminApiCall } from "@/API/adminApiClient";
import { DiscountCode, DiscountCodeFormData } from "./types";

export async function getDiscountCodes(): Promise<{ data: DiscountCode[] }> {
  const res = await adminApiCall.get("/DiscountCodes");
  return res.data;
}

export async function getDiscountCode(id: number): Promise<{ data: DiscountCode }> {
  const res = await adminApiCall.get(`/DiscountCodes/${id}`);
  return res.data;
}

export async function createDiscountCode(data: DiscountCodeFormData): Promise<{ data: DiscountCode }> {
  const res = await adminApiCall.post("/DiscountCodes", data);
  return res.data;
}

export async function updateDiscountCode(id: number, data: DiscountCodeFormData): Promise<{ data: DiscountCode }> {
  const res = await adminApiCall.put(`/DiscountCodes/${id}`, data);
  return res.data;
}

export async function deleteDiscountCode(id: number): Promise<{ data: boolean }> {
  const res = await adminApiCall.delete(`/DiscountCodes/${id}`);
  return res.data;
}
