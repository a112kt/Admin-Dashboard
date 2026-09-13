"use client";
import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "../services";
import { AuditLogFilterDto, PagedAuditLogResult } from "@/features/payouts/types";

export function useAuditLogs(filters: AuditLogFilterDto) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["adminAuditLogs", filters],
    queryFn: async () => {
      const res = await getAuditLogs(filters);
      return (res?.data ?? res) as PagedAuditLogResult;
    },
    retry: false,
  });
  return { result: data, loading: isLoading, error, refetch };
}
