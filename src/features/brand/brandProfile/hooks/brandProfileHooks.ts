"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBrandDetails, updateBrandDetails, getTopEngagedUsers, uploadBrandLogo, uploadBrandCover, deleteBrandLogo, deleteBrandCover } from "../services";
import { UpdateBrandDetailsReq } from "../types";

export const useGetBrandDetails = (brandId: number) => {
  return useQuery({
    queryKey: ["brandDetails", brandId],
    queryFn: () => getBrandDetails(brandId),
    enabled: !!brandId,
  });
};

export const useUpdateBrandDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ brandId, data }: { brandId: number; data: UpdateBrandDetailsReq }) =>
      updateBrandDetails(brandId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["brandDetails", variables.brandId] });
    },
  });
};

export const useGetTopEngagedUsers = (brandId: number, count: number = 10) => {
  return useQuery({
    queryKey: ["topEngagedUsers", brandId, count],
    queryFn: () => getTopEngagedUsers(brandId, count),
    enabled: !!brandId,
  });
};

export const useUploadBrandLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ brandId, file }: { brandId: number; file: File }) =>
      uploadBrandLogo(brandId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["brandDetails", variables.brandId] });
    },
  });
};

export const useUploadBrandCover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ brandId, file }: { brandId: number; file: File }) =>
      uploadBrandCover(brandId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["brandDetails", variables.brandId] });
    },
  });
};

export const useDeleteBrandLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (brandId: number) =>
      deleteBrandLogo(brandId),
    onSuccess: (_, brandId) => {
      queryClient.invalidateQueries({ queryKey: ["brandDetails", brandId] });
    },
  });
};

export const useDeleteBrandCover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (brandId: number) =>
      deleteBrandCover(brandId),
    onSuccess: (_, brandId) => {
      queryClient.invalidateQueries({ queryKey: ["brandDetails", brandId] });
    },
  });
};
