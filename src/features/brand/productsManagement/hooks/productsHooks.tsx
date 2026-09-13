"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getColors, getProducts, GetProductsParams, getSizes, getCategories, getStockStatus, getProductById, createOffer, addOfferImages } from "../services";

export const useGetProducts = (params?: GetProductsParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: 5 * 60 * 1000,
  });
};
export const useGetSizes = () => {
  return useQuery({
    queryKey: ["sizes"],
    queryFn: () => getSizes(),
  });
};
export const useGetColors = () => {
  return useQuery({
    queryKey: ["colors"],
    queryFn: () => getColors(),
  });
};
export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};
export const useGetStockStatus = () => {
  return useQuery({
    queryKey: ["stock-statuses"],
    queryFn: () => getStockStatus(),
  });
};

export const useGetProductById = (productId: number) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
  });
};

export const useCreateOffer = () => {
  return useMutation({
    mutationFn: async (data: {
      productIds: string[];
      offerPrice: number;
      description: string;
      discountPercentage: string;
      images: File[];
    }) => {
      const { images, ...offerData } = data;
      const response = await createOffer(offerData);
      if (images && images.length > 0) {
        await addOfferImages(response.data, images);
      }
      return response;
    },
  });
};

