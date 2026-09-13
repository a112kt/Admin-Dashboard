import { adminApiCall } from "@/API/adminApiClient";
import { AuditLogFilterDto } from "@/features/payouts/types";

export async function getAuditLogs(filters: AuditLogFilterDto) {
  const params = new URLSearchParams();
  if (filters.actionType) params.append("actionType", filters.actionType);
  if (filters.entityType) params.append("entityType", filters.entityType);
  if (filters.performedBy) params.append("performedBy", filters.performedBy);
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);
  if (filters.pageIndex) params.append("pageIndex", String(filters.pageIndex));
  if (filters.pageSize) params.append("pageSize", String(filters.pageSize));

  const res = await adminApiCall.get(`/admin/finance/audit-logs?${params.toString()}`);
  return res.data;
}
