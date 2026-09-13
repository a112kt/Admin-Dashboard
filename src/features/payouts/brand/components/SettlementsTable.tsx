"use client";
import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  CircularProgress,
  MenuItem,
  TextField,
  Stack,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconRefresh } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useBrandSettlements, useSettlementStatuses } from "../hooks/useBrandFinance";
import { SettlementStatus } from "../../types";

const statusColorMap: Record<string, "default" | "success" | "warning" | "error" | "info" | "primary" | "secondary"> = {
  Pending: "warning",
  ReadyForWithdrawal: "success",
  WithdrawalRequested: "info",
  TransferInitiated: "primary",
  Processing: "secondary",
  Paid: "success",
  Failed: "error",
};

const allStatuses: SettlementStatus[] = [
  "Pending",
  "ReadyForWithdrawal",
  "WithdrawalRequested",
  "TransferInitiated",
  "Processing",
  "Paid",
  "Failed",
];

export default function SettlementsTable() {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState<SettlementStatus | "">("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const { settlements, totalCount, loading, refetch } = useBrandSettlements({
    status: statusFilter || undefined,
    pageIndex: page + 1,
    pageSize,
  });

  const statuses = useSettlementStatuses();
  const statusMap = useMemo(() => {
    const map: Record<number, string> = {};
    statuses.forEach((s) => { map[s.id] = s.name; });
    return map;
  }, [statuses]);

  const columns: GridColDef[] = [
    { field: "id", headerName: t("ID"), width: 70 },
    { field: "orderId", headerName: t("Order ID"), width: 90, valueFormatter: (v: number) => `#${v}` },
    {
      field: "grossAmount",
      headerName: t("Gross Amount"),
      width: 130,
      valueFormatter: (v: number) => `${v?.toFixed(2)} EGP`,
    },
    {
      field: "platformCommission",
      headerName: t("Commission"),
      width: 120,
      valueFormatter: (v: number) => `${v?.toFixed(2)} EGP`,
    },
    {
      field: "netAmount",
      headerName: t("Net Amount"),
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontWeight={600}>{Number(params.value).toFixed(2)} EGP</Typography>
      ),
    },
    {
      field: "status",
      headerName: t("Status"),
      width: 160,
      renderCell: (params: GridRenderCellParams) => {
        const statusName = statusMap[params.value] || String(params.value);
        return <Chip size="small" color={statusColorMap[statusName] || "default"} label={t(statusName)} />;
      },
    },
    {
      field: "availableAt",
      headerName: t("Available At"),
      width: 120,
      valueFormatter: (v: string) => (v ? new Date(v).toLocaleDateString() : "-"),
    },
    {
      field: "paidAt",
      headerName: t("Paid At"),
      width: 120,
      valueFormatter: (v: string) => (v ? new Date(v).toLocaleDateString() : "-"),
    },
    {
      field: "createdAt",
      headerName: t("Created"),
      width: 120,
      valueFormatter: (v: string) => (v ? new Date(v).toLocaleDateString() : ""),
    },
  ];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <Typography variant="h6" fontWeight={600}>{t("Settlements")}</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              select
              size="small"
              label={t("Filter by Status")}
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as SettlementStatus | ""); setPage(0); }}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">{t("All")}</MenuItem>
              {allStatuses.map((s) => (
                <MenuItem key={s} value={s}>{t(s)}</MenuItem>
              ))}
            </TextField>
            <Button variant="outlined" startIcon={<IconRefresh size={18} />} onClick={() => refetch()}>
              {t("Refresh")}
            </Button>
          </Stack>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
        ) : (
          <DataGrid
            rows={settlements}
            columns={columns}
            rowCount={totalCount}
            paginationMode="server"
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => { setPage(model.page); setPageSize(model.pageSize); }}
            pageSizeOptions={[10, 20, 50]}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight
            sx={{ border: "none", "& .MuiDataGrid-cell:focus": { outline: "none" } }}
            localeText={{ noRowsLabel: t("No settlements found") }}
          />
        )}
      </CardContent>
    </Card>
  );
}
