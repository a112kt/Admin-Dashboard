"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminFinanceDashboard,
  getAdminBrandsFinance,
  getAdminBrandFinanceDetail,
  payBrandSettlements,
  getAdminShippingFinance,
  getAdminShippingFinanceDetail,
  payShippingSettlements,
} from "../services";
import {
  AdminDashboardDto,
  AdminBrandFinanceSummaryDto,
  AdminBrandFinanceDetailDto,
  PayBrandSettlementsReqDto,
  AdminShippingFinanceSummaryDto,
  AdminShippingFinanceDetailDto,
  PayShippingSettlementsReqDto,
} from "../../types";

export function useAdminFinanceDashboard() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["adminFinanceDashboard"],
    queryFn: async () => {
      const res = await getAdminFinanceDashboard();
      return (res?.data ?? res) as AdminDashboardDto;
    },
    retry: false,
  });
  return { dashboard: data, loading: isLoading, error, refetch };
}

export function useAdminBrandsFinance() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["adminBrandsFinance"],
    queryFn: async () => {
      const res = await getAdminBrandsFinance();
      return (res?.data ?? res) as AdminBrandFinanceSummaryDto[];
    },
    retry: false,
  });
  return { brands: data ?? [], loading: isLoading, error, refetch };
}

export function useAdminBrandFinanceDetail(brandId: number | null) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["adminBrandFinanceDetail", brandId],
    queryFn: async () => {
      const res = await getAdminBrandFinanceDetail(brandId!);
      return (res?.data ?? res) as AdminBrandFinanceDetailDto;
    },
    retry: false,
    enabled: brandId !== null,
  });
  return { detail: data, loading: isLoading, error, refetch };
}

export function usePayBrandSettlements() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: PayBrandSettlementsReqDto) => payBrandSettlements(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminFinanceDashboard"] });
      queryClient.invalidateQueries({ queryKey: ["adminBrandsFinance"] });
      queryClient.invalidateQueries({ queryKey: ["adminBrandFinanceDetail"] });
    },
  });
  return mutation;
}

export function useAdminShippingFinance() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["adminShippingFinance"],
    queryFn: async () => {
      const res = await getAdminShippingFinance();
      return (res?.data ?? res) as AdminShippingFinanceSummaryDto[];
    },
    retry: false,
  });
  return { companies: data ?? [], loading: isLoading, error, refetch };
}

export function useAdminShippingFinanceDetail(companyId: number | null) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["adminShippingFinanceDetail", companyId],
    queryFn: async () => {
      const res = await getAdminShippingFinanceDetail(companyId!);
      return (res?.data ?? res) as AdminShippingFinanceDetailDto;
    },
    retry: false,
    enabled: companyId !== null,
  });
  return { detail: data, loading: isLoading, error, refetch };
}

export function usePayShippingSettlements() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: PayShippingSettlementsReqDto) => payShippingSettlements(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminFinanceDashboard"] });
      queryClient.invalidateQueries({ queryKey: ["adminShippingFinance"] });
      queryClient.invalidateQueries({ queryKey: ["adminShippingFinanceDetail"] });
    },
  });
  return mutation;
}
