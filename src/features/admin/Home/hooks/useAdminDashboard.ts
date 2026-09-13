"use client";
import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard } from "../services";
import type { AdminDashboardData } from "../types";

export function useAdminDashboard(year?: number) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["adminDashboard", year],
    queryFn: async () => {
      const res = await getAdminDashboard(year);
      return res.data as AdminDashboardData;
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
