"use client";
import { useQuery } from "@tanstack/react-query";
import { getShippingWalletSummary, getShippingSettlements, getShippingPolicy } from "../services";
import { ShippingWalletSummaryDto, ShippingSettlementDto, ShippingPolicyDto, SettlementFilterDto } from "../types";

export function useShippingWalletSummary() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["shippingWalletSummary"],
    queryFn: async () => {
      const res = await getShippingWalletSummary();
      return (res?.data ?? res) as ShippingWalletSummaryDto;
    },
    retry: false,
  });

  return { summary: data ?? null, loading: isLoading, error, refetch };
}

export function useShippingSettlements(filter?: SettlementFilterDto) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["shippingSettlements", filter],
    queryFn: async () => {
      const res = await getShippingSettlements(filter);
      return (res?.data ?? res) as ShippingSettlementDto[];
    },
    retry: false,
  });

  return { settlements: data ?? [], loading: isLoading, error, refetch };
}

export function useShippingPolicy() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["shippingPolicy"],
    queryFn: async () => {
      const res = await getShippingPolicy();
      return (res?.data ?? res) as ShippingPolicyDto;
    },
    retry: false,
    staleTime: 10 * 60 * 1000,
  });

  return { policy: data ?? null, loading: isLoading, error, refetch };
}
