"use client";
import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBrandOrders, getOrderStatus, getPaymentOrderStatus, getPaymentMethods, updateOrderStatus, cancelOrder } from "../services";
import { OrderStatus, PaymentStatus, PaymentMethod, BrandOrdersResDto, LookupItem, MappedBrandOrderDto } from "../types";
import { useTranslation } from "react-i18next";

export function useBrandOrders() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const ordersQuery = useQuery({
    queryKey: ["brandOrders"],
    queryFn: async () => {
      const res = await getBrandOrders();
      return (res?.data ?? res) as BrandOrdersResDto;
    },
    retry: false,
  });

  const orderStatusesQuery = useQuery({
    queryKey: ["orderStatuses"],
    queryFn: async () => {
      const res = await getOrderStatus();
      return (res?.data ?? res) as LookupItem[];
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const paymentStatusesQuery = useQuery({
    queryKey: ["paymentStatuses"],
    queryFn: async () => {
      const res = await getPaymentOrderStatus();
      return (res?.data ?? res) as LookupItem[];
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const paymentMethodsQuery = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: async () => {
      const res = await getPaymentMethods();
      return (res?.data ?? res) as LookupItem[];
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const orders: MappedBrandOrderDto[] = useMemo(() =>
    (ordersQuery.data?.orders ?? []).map((order) => {
      const statusName = (orderStatusesQuery.data ?? []).find((s) => s.id === order.status)?.name ?? "Unknown";
      const paymentName = (paymentStatusesQuery.data ?? []).find((s) => s.id === order.paymentStatus)?.name ?? "Unknown";
      const methodName = (paymentMethodsQuery.data ?? []).find((s) => s.id === order.paymentMethod)?.name ?? "Unknown";
      return { ...order, status: statusName as OrderStatus, paymentStatus: paymentName as PaymentStatus, paymentMethod: methodName as PaymentMethod };
    }),
    [ordersQuery.data, orderStatusesQuery.data, paymentStatusesQuery.data, paymentMethodsQuery.data]
  );

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, newStatus }: { orderId: number; newStatus: OrderStatus }) => {
      const statusId = (orderStatusesQuery.data ?? []).find((s) => s.name === newStatus)?.id ?? 0;
      return updateOrderStatus(orderId, statusId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brandOrders"] });
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: ({ orderId, reason }: { orderId: number; reason?: string }) =>
      cancelOrder(orderId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brandOrders"] });
    },
  });

  return {
    orders,
    loading: ordersQuery.isLoading || orderStatusesQuery.isLoading || paymentStatusesQuery.isLoading || paymentMethodsQuery.isLoading,
    error: ordersQuery.error,
    refetch: ordersQuery.refetch,
    updateStatus: updateStatusMutation,
    cancelOrder: cancelOrderMutation,
  };
}
