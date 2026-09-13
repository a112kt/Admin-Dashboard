import { apiCall } from "@/API/apiClient";
import { BrandDetailsResponse, TopEngagedUserDto, UpdateBrandDetailsReq, ApiResponse } from "./types";

export const getBrandDetails = async (brandId: number) => {
  const res = await apiCall.get<ApiResponse<BrandDetailsResponse>>(`/BrandDetails/${brandId}`);
  return res.data;
};

export const updateBrandDetails = async (brandId: number, data: UpdateBrandDetailsReq) => {
  const res = await apiCall.put<ApiResponse<BrandDetailsResponse>>(`/BrandDetails/${brandId}`, data);
  return res.data;
};

export const getTopEngagedUsers = async (brandId: number, count: number = 10) => {
  const res = await apiCall.get<ApiResponse<TopEngagedUserDto[]>>(`/BrandDetails/${brandId}/top-engaged-users`, {
    params: { count },
  });
  return res.data;
};

export const uploadBrandLogo = async (brandId: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await apiCall.post<ApiResponse<string>>(`/BrandDetails/${brandId}/logo`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const uploadBrandCover = async (brandId: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await apiCall.post<ApiResponse<string>>(`/BrandDetails/${brandId}/cover`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteBrandLogo = async (brandId: number) => {
  const res = await apiCall.delete<ApiResponse<boolean>>(`/BrandDetails/${brandId}/logo`);
  return res.data;
};

export const deleteBrandCover = async (brandId: number) => {
  const res = await apiCall.delete<ApiResponse<boolean>>(`/BrandDetails/${brandId}/cover`);
  return res.data;
};
