"use client";
import * as React from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  TableHead,
  Chip,
  Box,
  Grid,
  Stack,
  Paper,
  Divider,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Icon } from "@iconify/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useBrandOrders } from "../hooks/useBrandOrders";
import { MappedBrandOrderDto, OrderStatus } from "../types";
import { useTranslation } from "react-i18next";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

const columnHelper = createColumnHelper<MappedBrandOrderDto>();

const getStatusColors = (status: string) => {
  switch (status) {
    case "Delivered": return { bg: "success.light", color: "success.main" };
    case "Processing": return { bg: "warning.light", color: "warning.main" };
    case "Preparing": return { bg: "info.light", color: "info.main" };
    case "Packed": return { bg: "primary.light", color: "primary.main" };
    case "Shipped": return { bg: "secondary.light", color: "secondary.main" };
    case "Cancelled": return { bg: "error.light", color: "error.main" };
    case "PendingCancellation": return { bg: "error.light", color: "error.main" };
    default: return { bg: "grey.100", color: "grey.700" };
  }
};

const getPaymentColors = (status: string) => {
  switch (status) {
    case "Paid": return { bg: "success.light", color: "success.main" };
    case "Failed": return { bg: "error.light", color: "error.main" };
    case "Refunded": return { bg: "warning.light", color: "warning.main" };
    case "PayOnDelivery": return { bg: "info.light", color: "info.main" };
    default: return { bg: "grey.100", color: "grey.700" };
  }
};

const nextStatus = (status: OrderStatus): OrderStatus | null => {
  switch (status) {
    case "Pending": return "Processing";
    case "Processing": return "Preparing";
    case "Preparing": return "Packed";
    default: return null;
  }
};

const canCancel = (status: OrderStatus): boolean => {
  return ["Pending", "Processing", "Preparing", "Packed"].includes(status) && status !== "PendingCancellation";
};

const BrandOrdersTable = () => {
  const { t } = useTranslation();
  const { orders, loading, updateStatus, cancelOrder } = useBrandOrders();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = React.useState<MappedBrandOrderDto | null>(null);
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
  const snackbarAnchor = useSnackbarAnchor("top");
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false);
  const [cancelReason, setCancelReason] = React.useState("");
  const [cancelLoading, setCancelLoading] = React.useState(false);

  const handleStatusUpdate = async (orderId: number, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId, newStatus: status });
      setSnackbar({ open: true, message: t("Status updated successfully"), severity: "success" });
    } catch (err: any) {
      const msg = err?.response?.data?.message?.en || t("Failed to update status");
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
    setAnchorEl(null);
  };

  const handleCancel = async (orderId: number, reason?: string) => {
    setCancelLoading(true);
    try {
      await cancelOrder.mutateAsync({ orderId, reason });
      const isPaid = selectedOrder?.paymentStatus === "Paid";
      setSnackbar({ open: true, message: isPaid ? t("Cancellation request sent to admin") : t("Order cancelled successfully"), severity: "success" });
    } catch (err: any) {
      const msg = err?.response?.data?.message?.en || t("Failed to cancel order");
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
    setAnchorEl(null);
    setCancelDialogOpen(false);
    setCancelReason("");
    setCancelLoading(false);
  };

  const columns = React.useMemo(
    () => [
      columnHelper.display({
        id: "expand",
        header: () => null,
        cell: ({ row }) => (
          <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => row.toggleExpanded()}>
            {row.getIsExpanded() ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </Box>
        ),
      }),
      columnHelper.accessor("orderId", {
        header: () => t("Order ID"),
        cell: (info) => <Typography variant="subtitle2" fontWeight={600}>#{info.getValue()}</Typography>,
      }),
      columnHelper.accessor("customerName", {
        header: () => t("Customer"),
        cell: (info) => <Typography variant="body2" fontWeight={500}>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor("createdAt", {
        header: () => t("Date"),
        cell: (info) => <Typography variant="body2">{new Date(info.getValue()).toLocaleDateString()}</Typography>,
      }),
      columnHelper.accessor("paymentStatus", {
        header: () => t("Payment"),
        cell: (info) => {
          const row = info.row.original;
          const isCOD = row.paymentMethod === "CashOnDelivery";
          const label = isCOD ? t("Cash on Delivery") : info.getValue();
          const colors = getPaymentColors(info.getValue());
          return <Chip label={label} size="small" sx={{ bgcolor: colors.bg, color: colors.color, borderRadius: "8px", fontWeight: 600 }} />;
        },
      }),
      columnHelper.accessor("status", {
        header: () => t("Status"),
        cell: (info) => {
          const colors = getStatusColors(info.getValue());
          return <Chip label={info.getValue()} size="small" sx={{ bgcolor: colors.bg, color: colors.color, borderRadius: "8px", fontWeight: 600 }} />;
        },
      }),
      columnHelper.accessor("totalAmount", {
        header: () => t("Total"),
        cell: (info) => <Typography variant="subtitle1" fontWeight={700}>EGP {info.getValue().toFixed(2)}</Typography>,
      }),
      columnHelper.display({
        id: "actions",
        header: () => t("Actions"),
        cell: ({ row }) => {
          const status = row.original.status;
          const actionableStatuses: OrderStatus[] = ["Pending", "Processing", "Preparing", "Packed"];
          if (!actionableStatuses.includes(status)) {
            return <Box />;
          }
          return (
            <IconButton onClick={(e) => { setSelectedOrder(row.original); setAnchorEl(e.currentTarget); }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          );
        },
      }),
    ],
    [t]
  );

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (!orders.length) {
    return (
      <Paper elevation={0} sx={{ p: 4, textAlign: "center", borderRadius: 1 }}>
        <Typography variant="h6" color="text.secondary">{t("No orders found")}</Typography>
      </Paper>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Paper elevation={0} sx={{ borderRadius: 1, overflow: "hidden" }}>
          <TableContainer>
            <Table sx={{ whiteSpace: "nowrap" }}>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id}>
                        <Typography variant="subtitle2" fontWeight={700}>
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow hover>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && (
                      <TableRow>
                        <TableCell colSpan={columns.length} sx={{ backgroundColor: "grey.50", py: 4 }}>
                          <Box>
                            <Typography variant="h6" fontWeight={700} mb={3}>{t("Order Details")}</Typography>
                            <Grid container spacing={3}>
                              <Grid size={{ xs: 12, md: 4 }}>
                                <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
                                  <Typography variant="subtitle1" fontWeight={700} mb={2}>{t("Customer Information")}</Typography>
                                  <Stack spacing={1.5}>
                                    <Typography variant="body2"><strong>{t("Name")}:</strong> {row.original.customerName}</Typography>
                                    <Typography variant="body2"><strong>{t("Order ID")}:</strong> #{row.original.orderId}</Typography>
                                    <Typography variant="body2"><strong>{t("Status")}:</strong> {row.original.status}</Typography>
                                    <Typography variant="body2"><strong>{t("Payment")}:</strong> {row.original.paymentStatus}</Typography>
                                  </Stack>
                                </Paper>
                              </Grid>
                              <Grid size={{ xs: 12, md: 8 }}>
                                <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                                  <Typography variant="subtitle1" fontWeight={700} mb={2}>{t("Order Items")}</Typography>
                                  <Stack spacing={1.5}>
                                    {row.original.items.map((item, idx) => (
                                      <Box key={idx} display="flex" alignItems="center" gap={2} py={1} sx={{ borderBottom: idx < row.original.items.length - 1 ? "1px solid" : "none", borderColor: "divider" }}>
                                        <Avatar src={item.productImage || undefined} sx={{ width: 48, height: 48, borderRadius: 1 }}>
                                          {item.productName[0]}
                                        </Avatar>
                                        <Box flex={1}>
                                          <Typography variant="body2" fontWeight={600}>{item.productName}</Typography>
                                          <Typography variant="caption" color="text.secondary">
                                            {item.color}{item.size ? ` / ${item.size}` : ""} &times; {item.quantity}
                                          </Typography>
                                        </Box>
                                        <Typography variant="body2" fontWeight={600}>EGP {(item.price * item.quantity).toFixed(2)}</Typography>
                                      </Box>
                                    ))}
                                    <Divider />
                                    <Box display="flex" justifyContent="space-between">
                                      <Typography variant="body2">{t("Total")}</Typography>
                                       <Typography variant="h6" fontWeight={700}>EGP {row.original.totalAmount.toFixed(2)}</Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                      {t("Created")}: {new Date(row.original.createdAt).toLocaleString()}
                                    </Typography>
                                  </Stack>
                                </Paper>
                              </Grid>
                            </Grid>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {selectedOrder && nextStatus(selectedOrder.status) ? (
          <MenuItem onClick={() => handleStatusUpdate(selectedOrder.orderId, nextStatus(selectedOrder.status)!)}>
            <ListItemIcon><Icon icon="solar:arrow-right-line-duotone" fontSize={20} /></ListItemIcon>
            <ListItemText>{t("Move to")} {nextStatus(selectedOrder.status)}</ListItemText>
          </MenuItem>
        ) : null}
        {selectedOrder && canCancel(selectedOrder.status) ? (
          <MenuItem onClick={() => { setAnchorEl(null); setCancelDialogOpen(true); }}>
            <ListItemIcon><Icon icon="solar:close-circle-line-duotone" color="red" fontSize={20} /></ListItemIcon>
            <ListItemText>{t("Cancel Order")}</ListItemText>
          </MenuItem>
        ) : null}
      </Menu>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={snackbarAnchor}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>

      {selectedOrder && (() => {
        const isPaid = selectedOrder.paymentStatus === "Paid";
        return (
          <Dialog open={cancelDialogOpen} onClose={cancelLoading ? undefined : () => { setCancelDialogOpen(false); setCancelReason(""); }} maxWidth="sm" fullWidth>
            <DialogTitle>{isPaid ? t("Request Cancellation") : t("Cancel Order")}</DialogTitle>
            <DialogContent>
              <DialogContentText mb={isPaid ? 2 : 0}>
                {isPaid
                  ? t("This order has already been paid. A cancellation request will be sent to the admin for approval. The order will only be cancelled once the admin reviews and accepts the request.")
                  : t("Are you sure you want to cancel this order? It will be cancelled immediately.")}
              </DialogContentText>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder={t("Cancellation reason (optional)")}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                sx={{ mt: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { setCancelDialogOpen(false); setCancelReason(""); }} disabled={cancelLoading} color="inherit">
                {t("Back")}
              </Button>
              <Button
                onClick={() => handleCancel(selectedOrder.orderId, cancelReason || undefined)}
                disabled={cancelLoading}
                color={isPaid ? "warning" : "error"}
                variant="contained"
                startIcon={cancelLoading ? <CircularProgress size={18} color="inherit" /> : undefined}
              >
                {cancelLoading ? t("Processing...") : isPaid ? t("Request Cancellation") : t("Cancel Order")}
              </Button>
            </DialogActions>
          </Dialog>
        );
      })()}
    </Grid>
  );
};

export default BrandOrdersTable;
