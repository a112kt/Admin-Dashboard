"use client";
import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReadyToShipOrders, updateShippingStatus, updatePaymentToPaid, getOrderStatuses, getPaymentStatuses, getPaymentMethods } from "../services";
import { ReadyToShipOrderDto, LookupItem } from "../types";

export interface MappedOrder extends Omit<ReadyToShipOrderDto, "orderStatus" | "paymentMethod" | "paymentStatus"> {
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
}

export function useReadyToShipOrders() {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ["readyToShipOrders"],
    queryFn: async () => {
      const res = await getReadyToShipOrders();
      return (res?.data ?? res) as ReadyToShipOrderDto[];
    },
    retry: false,
  });

  const orderStatusesQuery = useQuery({
    queryKey: ["orderStatuses"],
    queryFn: async () => {
      const res = await getOrderStatuses();
      return (res?.data ?? res) as LookupItem[];
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const paymentStatusesQuery = useQuery({
    queryKey: ["paymentStatuses"],
    queryFn: async () => {
      const res = await getPaymentStatuses();
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

  const orders: MappedOrder[] = useMemo(() =>
    (ordersQuery.data ?? []).map((order) => {
      const orderStatusName = (orderStatusesQuery.data ?? []).find((s) => s.id === order.orderStatus)?.name ?? "Unknown";
      const paymentMethodName = (paymentMethodsQuery.data ?? []).find((m) => m.id === order.paymentMethod)?.name ?? "Unknown";
      const paymentStatusName = (paymentStatusesQuery.data ?? []).find((s) => s.id === order.paymentStatus)?.name ?? "Unknown";
      return { ...order, orderStatus: orderStatusName, paymentMethod: paymentMethodName, paymentStatus: paymentStatusName };
    }),
    [ordersQuery.data, orderStatusesQuery.data, paymentStatusesQuery.data, paymentMethodsQuery.data]
  );

  const getStatusId = (name: string): number =>
    (orderStatusesQuery.data ?? []).find((s) => s.name === name)?.id ?? 0;

  const shipOrderMutation = useMutation({
    mutationFn: (orderId: number) => updateShippingStatus(orderId, getStatusId("Shipped")),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["readyToShipOrders"] });
    },
  });

  const deliverOrderMutation = useMutation({
    mutationFn: (orderId: number) => updateShippingStatus(orderId, getStatusId("Delivered")),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["readyToShipOrders"] });
    },
  });

  const markPaidMutation = useMutation({
    mutationFn: (orderId: number) => updatePaymentToPaid(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["readyToShipOrders"] });
    },
  });

  return {
    orders,
    loading: ordersQuery.isLoading || orderStatusesQuery.isLoading || paymentStatusesQuery.isLoading || paymentMethodsQuery.isLoading,
    error: ordersQuery.error,
    refetch: ordersQuery.refetch,
    shipOrder: shipOrderMutation,
    deliverOrder: deliverOrderMutation,
    markPaid: markPaidMutation,
  };
}
