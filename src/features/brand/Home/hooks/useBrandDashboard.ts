"use client";
import { useQuery } from "@tanstack/react-query";
import { getBrandDashboard } from "../services";
import type { BrandDashboardData } from "../types";

export function useBrandDashboard() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["brandDashboard"],
    queryFn: async () => {
      const res = await getBrandDashboard();
      return res.data as BrandDashboardData;
    },
    retry: false,
  });

  return {
    dashboard: data || null,
    loading: isLoading,
    error: error ? (error as any)?.response?.data?.message?.en : null,
    refresh: refetch,
  };
}
