"use client";
import { useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconRefresh } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useWithdrawalHistory, useWithdrawalRequestStatuses } from "../hooks/useBrandFinance";

const statusColorMap: Record<string, "default" | "success" | "warning" | "error" | "info" | "primary"> = {
  Pending: "warning",
  Approved: "info",
  Paid: "success",
  Rejected: "error",
  Failed: "error",
};

export default function WithdrawalHistory() {
  const { t } = useTranslation();
  const { withdrawals, loading, refetch } = useWithdrawalHistory();

  const statuses = useWithdrawalRequestStatuses();
  const statusMap = useMemo(() => {
    const map: Record<number, string> = {};
    statuses.forEach((s) => { map[s.id] = s.name; });
    return map;
  }, [statuses]);

  const columns: GridColDef[] = [
    { field: "id", headerName: t("ID"), width: 70 },
    {
      field: "requestedAmount",
      headerName: t("Amount"),
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontWeight={600}>{Number(params.value).toFixed(2)} EGP</Typography>
      ),
    },
    {
      field: "status",
      headerName: t("Status"),
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const statusName = statusMap[params.value] || String(params.value);
        return <Chip size="small" color={statusColorMap[statusName] || "default"} label={t(statusName)} />;
      },
    },
    {
      field: "createdAt",
      headerName: t("Requested At"),
      width: 130,
      valueFormatter: (v: string) => (v ? new Date(v).toLocaleDateString() : ""),
    },
    {
      field: "approvedAt",
      headerName: t("Approved At"),
      width: 130,
      valueFormatter: (v: string) => (v ? new Date(v).toLocaleDateString() : "-"),
    },
    {
      field: "paidAt",
      headerName: t("Paid At"),
      width: 130,
      valueFormatter: (v: string) => (v ? new Date(v).toLocaleDateString() : "-"),
    },
    {
      field: "paymobTransferId",
      headerName: t("Transfer ID"),
      width: 150,
      valueFormatter: (v: string) => v || "-",
    },
  ];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>{t("Withdrawal History")}</Typography>
          <Button variant="outlined" startIcon={<IconRefresh size={18} />} onClick={() => refetch()}>
            {t("Refresh")}
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
        ) : (
          <DataGrid
            rows={withdrawals}
            columns={columns}
            getRowId={(row) => row.id}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight
            sx={{ border: "none", "& .MuiDataGrid-cell:focus": { outline: "none" } }}
            localeText={{ noRowsLabel: t("No withdrawal requests found") }}
          />
        )}
      </CardContent>
    </Card>
  );
}
