"use client";
import { useQuery } from "@tanstack/react-query";
import { getBrandReelAnalytics } from "../services";
import type { BrandReelAnalytics } from "../types";

export function useBrandReelAnalytics() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["brandReelAnalytics"],
    queryFn: async () => {
      const res = await getBrandReelAnalytics();
      return res.data as BrandReelAnalytics;
    },
    retry: false,
  });

  return {
    analytics: data || null,
    loading: isLoading,
    error: error ? (error as any)?.response?.data?.message?.en : null,
    refresh: refetch,
  };
}
