"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  CircularProgress,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";
import { IconRefresh } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";
import {
  useAdminBrandFinanceDetail,
  usePayBrandSettlements,
} from "../hooks/useAdminFinance";

const settlementStatusColors: Record<string, "default" | "success" | "warning" | "error" | "info" | "primary" | "secondary"> = {
  Pending: "warning",
  ReadyForWithdrawal: "success",
  WithdrawalRequested: "info",
  TransferInitiated: "primary",
  Processing: "secondary",
  Paid: "success",
  Failed: "error",
};

const withdrawalStatusColors: Record<string, "default" | "success" | "warning" | "error" | "info" | "primary"> = {
  Pending: "warning",
  Approved: "info",
  Paid: "success",
  Rejected: "error",
  Failed: "error",
};

export default function BrandFinanceDetail() {
  const { t } = useTranslation();
  const params = useParams();
  const brandId = Number(params.brandId);

  const { detail, loading, refetch } = useAdminBrandFinanceDetail(brandId);
  const payMutation = usePayBrandSettlements();
  const snackbarAnchor = useSnackbarAnchor("top");

  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [selectedWithdrawalId, setSelectedWithdrawalId] = useState<number | null>(null);
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false, message: "", severity: "success",
  });

  const handlePay = async () => {
    if (!selectedWithdrawalId) {
      console.warn("[BrandFinanceDetail] handlePay called with no selectedWithdrawalId");
      return;
    }
    try {
      console.log("[BrandFinanceDetail] Initiating payout for withdrawalRequestId:", selectedWithdrawalId);
      await payMutation.mutateAsync({
        settlementIds: [],
        withdrawalRequestId: selectedWithdrawalId,
        reference: reference || undefined,
        notes: notes || undefined,
      });
      console.log("[BrandFinanceDetail] Payout successful");
      setSnackbar({ open: true, message: t("Payment initiated successfully"), severity: "success" });
      setPayDialogOpen(false);
      setSelectedWithdrawalId(null);
      setReference("");
      setNotes("");
    } catch (err: any) {
      console.error("[BrandFinanceDetail] Payout error:", err);
      const msg =
        err?.response?.data?.message?.en ||
        err?.response?.data?.errors?.[0] ||
        err?.message ||
        t("Failed to initiate payment");
      setSnackbar({ open: true, message: msg, severity: "error" });
      // Keep dialog open on error so user can retry
    }
  };

  const settlementColumns: GridColDef[] = [
    { field: "id", headerName: t("ID"), width: 70 },
    { field: "orderId", headerName: t("Order"), width: 80, valueFormatter: (v: number) => `#${v}` },
    {
      field: "grossAmount",
      headerName: t("Gross"),
      flex: 1,
      minWidth: 120,
      valueFormatter: (v: number) => `${v?.toFixed(2)} EGP`,
    },
    {
      field: "platformCommission",
      headerName: t("Commission"),
      flex: 1,
      minWidth: 120,
      valueFormatter: (v: number) => `${v?.toFixed(2)} EGP`,
    },
    {
      field: "netAmount",
      headerName: t("Net"),
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontWeight={600}>{Number(params.value).toFixed(2)} EGP</Typography>
      ),
    },
    {
      field: "statusString",
      headerName: t("Status"),
      flex: 1,
      minWidth: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Chip size="small" color={settlementStatusColors[params.value] || "default"} label={t(params.value)} />
      ),
    },
    {
      field: "createdAt",
      headerName: t("Created"),
      flex: 1,
      minWidth: 110,
      valueFormatter: (v: string) => (v ? new Date(v).toLocaleDateString() : ""),
    },
  ];

  const withdrawalColumns: GridColDef[] = [
    { field: "id", headerName: t("ID"), width: 70 },
    {
      field: "requestedAmount",
      headerName: t("Amount"),
      flex: 1,
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontWeight={600}>{Number(params.value).toFixed(2)} EGP</Typography>
      ),
    },
    {
      field: "statusString",
      headerName: t("Status"),
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip size="small" color={withdrawalStatusColors[params.value] || "default"} label={t(params.value)} />
      ),
    },
    {
      field: "createdAt",
      headerName: t("Requested"),
      flex: 1,
      minWidth: 110,
      valueFormatter: (v: string) => (v ? new Date(v).toLocaleDateString() : ""),
    },
    {
      field: "paidAt",
      headerName: t("Paid At"),
      flex: 1,
      minWidth: 110,
      valueFormatter: (v: string) => (v ? new Date(v).toLocaleDateString() : "-"),
    },
    {
      field: "actions",
      headerName: "",
      width: 80,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const payableStatuses = ["Pending", "Approved"];
        if (payableStatuses.includes(params.row.statusString)) {
          return (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setSelectedWithdrawalId(params.row.id);
                setPayDialogOpen(true);
              }}
            >
              {t("Pay")}
            </Button>
          );
        }
        return null;
      },
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>
    );
  }

  const s = detail?.summary;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          {t("Brand Finance")} - {s?.brandName ?? `#${brandId}`}
        </Typography>
        <Button variant="outlined" startIcon={<IconRefresh size={18} />} onClick={() => refetch()}>
          {t("Refresh")}
        </Button>
      </Box>

      <Grid container spacing={3} mb={3}>
        {[
          { label: t("Pending"), value: s?.pendingBalance ?? 0, icon: "solar:clock-circle-line-duotone", color: "#ed6c02", bg: "#fff3e0" },
          { label: t("Available"), value: s?.availableBalance ?? 0, icon: "solar:wallet-money-line-duotone", color: "#2e7d32", bg: "#e8f5e9" },
          { label: t("Requested"), value: s?.requestedBalance ?? 0, icon: "solar:document-text-line-duotone", color: "#0288d1", bg: "#e1f5fe" },
          { label: t("Paid"), value: s?.paidBalance ?? 0, icon: "solar:check-circle-line-duotone", color: "#9c27b0", bg: "#f3e5f5" },
        ].map((c) => (
          <Grid key={c.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 1.5, bgcolor: c.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon icon={c.icon} width={22} color={c.color} />
                  </Box>
                  <Typography variant="body2" color="text.secondary">{c.label}</Typography>
                </Box>
                <Typography variant="h6" fontWeight={700}>{c.value.toFixed(2)} EGP</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>{t("Settlements")}</Typography>
          <DataGrid
            rows={detail?.settlements ?? []}
            columns={settlementColumns}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            autoHeight
            sx={{ border: "none", "& .MuiDataGrid-cell:focus": { outline: "none" } }}
            localeText={{ noRowsLabel: t("No settlements found") }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>{t("Withdrawal History")}</Typography>
          <DataGrid
            rows={detail?.withdrawalHistory ?? []}
            columns={withdrawalColumns}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            autoHeight
            sx={{ border: "none", "& .MuiDataGrid-cell:focus": { outline: "none" } }}
            localeText={{ noRowsLabel: t("No withdrawal requests found") }}
          />
        </CardContent>
      </Card>

      <Dialog open={payDialogOpen} onClose={() => setPayDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t("Initiate Payout")}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={1}>
            <TextField
              label={t("Payment Reference")}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              fullWidth
            />
            <TextField
              label={t("Notes")}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPayDialogOpen(false)}>{t("Cancel")}</Button>
          <Button variant="contained" onClick={handlePay} disabled={payMutation.isPending}>
            {payMutation.isPending ? <CircularProgress size={24} /> : t("Confirm Payment")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={snackbarAnchor}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
