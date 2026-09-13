"use client";
import { useQuery } from "@tanstack/react-query";
import { getMyBrand } from "../services";

export interface MyBrandRes {
  id: number;
  displayName: string;
  description: string;
  logoUrl: string;
  category: string;
  country: string;
  governorate: string;
  district: string;
  numberOfEmployees: number;
  status: string;
  currentStep: string;
  submittedAt?: string;
  lastFailedStep?: number | null;
  rejectionReason?: string | null;
}

export function useMyBrand() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["myBrand"],
    queryFn: async () => {
      const res = await getMyBrand();
      return res.data as MyBrandRes;
    },
    retry: false,
  });

  return {
    brand: data || null,
    loading: isLoading,
    error: error ? (error as any)?.response?.data?.message?.en : null,
  };
}
