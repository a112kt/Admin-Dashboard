"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDiscountCodes,
  createDiscountCode,
  updateDiscountCode,
  deleteDiscountCode,
} from "../services";
import { DiscountCode, DiscountCodeFormData } from "../types";

export function useDiscountCodes() {
  const queryClient = useQueryClient();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["discountCodes"],
    queryFn: async () => {
      const res = await getDiscountCodes();
      return (res?.data ?? res) as DiscountCode[];
    },
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: (formData: DiscountCodeFormData) => createDiscountCode(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discountCodes"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: DiscountCodeFormData }) =>
      updateDiscountCode(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discountCodes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteDiscountCode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discountCodes"] });
    },
  });

  return {
    codes: data ?? [],
    loading: isLoading,
    error,
    refetch,
    createCode: createMutation,
    updateCode: updateMutation,
    deleteCode: deleteMutation,
  };
}
