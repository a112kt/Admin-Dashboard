"use client";
import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRefundRequests, processRefund, getPaymentMethods, getPaymentStatuses } from "../services";
import { RefundRequestDto, MappedRefundRequestDto, LookupItem } from "../types";

export function useRefundRequests() {
  const queryClient = useQueryClient();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["refundRequests"],
    queryFn: async () => {
      const res = await getRefundRequests();
      return (res?.data ?? res) as RefundRequestDto[];
    },
    retry: false,
  });

  const paymentMethodsQuery = useQuery({
    queryKey: ["adminPaymentMethods"],
    queryFn: async () => {
      const res = await getPaymentMethods();
      return (res?.data ?? res) as LookupItem[];
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const paymentStatusesQuery = useQuery({
    queryKey: ["adminPaymentStatuses"],
    queryFn: async () => {
      const res = await getPaymentStatuses();
      return (res?.data ?? res) as LookupItem[];
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const requests: MappedRefundRequestDto[] = useMemo(
    () =>
      (data ?? []).map((req) => ({
        ...req,
        paymentMethod:
          (paymentMethodsQuery.data ?? []).find((m) => m.id === req.paymentMethod)?.name ?? "Unknown",
        paymentStatus:
          (paymentStatusesQuery.data ?? []).find((s) => s.id === req.paymentStatus)?.name ?? "Unknown",
      })),
    [data, paymentMethodsQuery.data, paymentStatusesQuery.data],
  );

  const processRefundMutation = useMutation({
    mutationFn: (orderId: number) => processRefund(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refundRequests"] });
    },
  });

  return {
    requests,
    loading: isLoading || paymentMethodsQuery.isLoading || paymentStatusesQuery.isLoading,
    error,
    refetch,
    processRefund: processRefundMutation,
  };
}
