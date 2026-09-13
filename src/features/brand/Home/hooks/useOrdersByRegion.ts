"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrdersByRegion } from "../services";
import type { OrdersByRegionData } from "../types";

export function useOrdersByRegion() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["ordersByRegion"],
    queryFn: async () => {
      const res = await getOrdersByRegion();
      return res.data as OrdersByRegionData;
    },
    retry: false,
  });

  return {
    ordersByRegion: data || null,
    loading: isLoading,
    error: error ? (error as any)?.response?.data?.message?.en : null,
    refresh: refetch,
  };
}
