"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBrandWalletSummary,
  getBrandSettlements,
  createWithdrawalRequest,
  getWithdrawalHistory,
  getSettlementStatuses,
  getWithdrawalRequestStatuses,
} from "../services";
import {
  BrandWalletSummaryDto,
  BrandSettlementDto,
  PagedResult,
  WithdrawalRequestDto,
  SettlementFilterDto,
  LookupItem,
} from "../../types";

export function useBrandWalletSummary() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["brandWalletSummary"],
    queryFn: async () => {
      const res = await getBrandWalletSummary();
      return (res?.data ?? res) as BrandWalletSummaryDto;
    },
    retry: false,
  });
  return { summary: data, loading: isLoading, error, refetch };
}

export function useBrandSettlements(filters?: SettlementFilterDto) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["brandSettlements", filters],
    queryFn: async () => {
      const res = await getBrandSettlements(filters);
      return (res?.data ?? res) as PagedResult<BrandSettlementDto>;
    },
    retry: false,
  });
  return {
    settlements: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    pageIndex: data?.pageIndex ?? 1,
    loading: isLoading,
    error,
    refetch,
  };
}

export function useCreateWithdrawal() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (amount: number) => createWithdrawalRequest(amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brandWalletSummary"] });
      queryClient.invalidateQueries({ queryKey: ["brandWithdrawals"] });
      queryClient.invalidateQueries({ queryKey: ["brandSettlements"] });
    },
  });
  return mutation;
}

export function useWithdrawalHistory() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["brandWithdrawals"],
    queryFn: async () => {
      const res = await getWithdrawalHistory();
      return (res?.data ?? res) as WithdrawalRequestDto[];
    },
    retry: false,
  });
  return { withdrawals: data ?? [], loading: isLoading, error, refetch };
}

export function useSettlementStatuses() {
  const { data } = useQuery({
    queryKey: ["settlementStatuses"],
    queryFn: async () => {
      const res = await getSettlementStatuses();
      return (res?.data ?? res) as LookupItem[];
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  return data ?? [];
}

export function useWithdrawalRequestStatuses() {
  const { data } = useQuery({
    queryKey: ["withdrawalRequestStatuses"],
    queryFn: async () => {
      const res = await getWithdrawalRequestStatuses();
      return (res?.data ?? res) as LookupItem[];
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  return data ?? [];
}
