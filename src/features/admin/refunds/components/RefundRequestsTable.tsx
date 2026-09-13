"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconRotate, IconRefresh } from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';
import { useRefundRequests } from "../hooks/useRefundRequests";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

export default function RefundRequestsTable() {
  const { t } = useTranslation();
  const { requests, loading, refetch, processRefund } = useRefundRequests();
  const snackbarAnchor = useSnackbarAnchor("top");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  const handleProcessRefund = async () => {
    if (!selectedId) return;
    try {
      await processRefund.mutateAsync(selectedId);
      setSnackbar({ open: true, message: t("Refund processed successfully"), severity: "success" });
    } catch (err: any) {
      const msg = err?.response?.data?.message?.en || t("Failed to process refund");
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
    setConfirmOpen(false);
    setSelectedId(null);
  };

  const columns: GridColDef[] = [
    { field: "orderId", headerName: t("Order ID"), width: 100, valueFormatter: (value: number) => `#${value}` },
    { field: "customerName", headerName: t("Customer"), flex: 1, minWidth: 140 },
    {
      field: "totalAmount",
      headerName: t("Amount"),
      width: 120,
      valueFormatter: (value: number) => `EGP ${value.toFixed(2)}`,
    },
    {
      field: "paymentMethod",
      headerName: t("Payment Method"),
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        const method = params.value as string;
        const colors: Record<string, any> = {
          Card: { color: "info" },
          Wallet: { color: "warning" },
          CashOnDelivery: { color: "success" },
        };
        const chip = colors[method] || { color: "default" };
        return <Chip size="small" color={chip.color} label={method === "CashOnDelivery" ? t("Cash On Delivery") : method} />;
      },
    },
    {
      field: "paymentStatus",
      headerName: t("Payment Status"),
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const status = params.value as string;
        const colors: Record<string, any> = {
          Paid: { color: "success", label: t("Paid") },
          Pending: { color: "warning", label: t("Pending") },
          Failed: { color: "error", label: t("Failed") },
        };
        const chip = colors[status] || { color: "default", label: status };
        return <Chip size="small" color={chip.color} label={chip.label} />;
      },
    },
    {
      field: "createdAt",
      headerName: t("Order Date"),
      width: 110,
      valueFormatter: (value: string) => value ? new Date(value).toLocaleDateString() : "",
    },
    {
      field: "cancellationRequestedAt",
      headerName: t("Requested"),
      width: 110,
      valueFormatter: (value: string) => value ? new Date(value).toLocaleDateString() : "",
    },
    {
      field: "itemCount",
      headerName: t("Items"),
      width: 80,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 160,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={() => {
            setSelectedId(params.row.orderId);
            setConfirmOpen(true);
          }}
        >
          {t("Process Refund")}
        </Button>
      ),
    },
  ];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>{t("Refund Requests")}</Typography>
          <Button variant="outlined" startIcon={<IconRefresh size={18} />} onClick={() => refetch()}>
            {t("Refresh")}
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
        ) : (
          <DataGrid
            rows={requests}
            columns={columns}
            getRowId={(row) => row.orderId}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight
            sx={{ border: "none", "& .MuiDataGrid-cell:focus": { outline: "none" } }}
            localeText={{ noRowsLabel: t("No refund requests found") }}
          />
        )}
      </CardContent>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t("Process Refund")}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {t("Are you sure you want to process this refund? The order will be cancelled and the payment will be refunded.")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>{t("Cancel")}</Button>
          <Button variant="contained" color="warning" onClick={handleProcessRefund} disabled={processRefund.isPending}>
            {t("Confirm Refund")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={snackbarAnchor}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Card>
  );
}
