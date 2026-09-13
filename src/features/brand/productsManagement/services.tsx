import { apiCall } from "@/API/apiClient";
import { AddBrandProductReq, EditProductReq, GetBrandProductsRes, ApiResponse, PaginationResponse, ProducctDetailRes } from "./types";

export interface GetProductsParams {
  categoryId?: number;
  status?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  pageIndex?: number;
  pageSize?: number;
}

export const getProducts = async (params?: GetProductsParams) => {
  const res = await apiCall.get<ApiResponse<PaginationResponse<GetBrandProductsRes>>>("/BrandProduct/products", { params });
  return res.data;
};

export const addProduct = async (data: AddBrandProductReq) => {
  const res = await apiCall.post<ApiResponse<number>>("/BrandProduct/products", data);
  return res.data;
};

export const editProduct = async (data: EditProductReq) => {
  const res = await apiCall.patch<ApiResponse<boolean>>("/BrandProduct/products", data);
  return res.data;
};

export const deleteProduct = async (productId: number) => {
  const res = await apiCall.delete<ApiResponse<boolean>>(`/BrandProduct/products/${productId}`);
  return res.data;
};

export const uploadProductImages = async (productId: number, images: File[]) => {
  const formData = new FormData();
  images.forEach((img) => formData.append("images", img));
  const res = await apiCall.post<ApiResponse<boolean>>(`/BrandProduct/products/${productId}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteProductImage = async (productId: number, imageId: number) => {
  const res = await apiCall.delete<ApiResponse<boolean>>(`/BrandProduct/${productId}/images/${imageId}`);
  return res.data;
};
export const getProductById = async (productId: number) => {
  const res = await apiCall.get<ApiResponse<ProducctDetailRes>>(`/Product/${productId}`);
  return res.data;
};

export const getProductCategories = async () => {
  const res = await apiCall.get("/Product/categories");
  return res.data;
};
/// look ups 
export const getSizes = async () => {
  const res = await apiCall.get("/Lookup/sizes");
  return res.data;
};
export const getColors = async () => {
  const res = await apiCall.get("/Lookup/colors");
  return res.data;
};
export const getCategories = async () => {
  const res = await apiCall.get("/Product/categories");
  return res.data;
};
export const getStockStatus = async () => {
  const res = await apiCall.get("/Lookup/stock-statuses");
  return res.data;
};
export const createOffer = async (data: { productIds: string[], offerPrice: number, description: string, discountPercentage: string }) => {
  const res = await apiCall.post<ApiResponse<number>>("/TodayOffer/offer", data);
  return res.data;
};
export const addOfferImages = async (offerId: number, images: File[]) => {
  const formData = new FormData();
  images.forEach((img) => formData.append("file", img));
  const res = await apiCall.post<ApiResponse<boolean>>(`/TodayOffer/offer/${offerId}/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};  
