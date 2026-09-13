import { adminApiCall } from "@/API/adminApiClient";
import { Category, CategoryFormData } from "./types";

export async function getCategories(): Promise<{ data: Category[] }> {
  const res = await adminApiCall.get("/Categories");
  return res.data;
}

export async function getCategory(id: number): Promise<{ data: Category }> {
  const res = await adminApiCall.get(`/Categories/${id}`);
  return res.data;
}

export async function uploadCategoryImage(file: File): Promise<{ data: { url: string; publicId: string } }> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await adminApiCall.post("/Categories/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function createCategory(data: CategoryFormData): Promise<{ data: Category }> {
  const res = await adminApiCall.post("/Categories", {
    name: data.name,
    arName: data.arName,
    imageUrl: data.imageUrl,
    imagePublicId: data.imagePublicId,
  });
  return res.data;
}

export async function updateCategory(id: number, data: CategoryFormData): Promise<{ data: Category }> {
  const res = await adminApiCall.put(`/Categories/${id}`, {
    name: data.name,
    arName: data.arName,
    imageUrl: data.imageUrl,
    imagePublicId: data.imagePublicId,
  });
  return res.data;
}

export async function deleteCategory(id: number): Promise<{ data: boolean }> {
  const res = await adminApiCall.delete(`/Categories/${id}`);
  return res.data;
}
