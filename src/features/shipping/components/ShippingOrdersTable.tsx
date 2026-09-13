"use client";
import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useReadyToShipOrders } from "../hooks/useReadyToShipOrders";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

const ShippingOrdersTable = () => {
  const { t } = useTranslation();
  const { orders, loading, shipOrder, deliverOrder, markPaid } = useReadyToShipOrders();
  const snackbarAnchor = useSnackbarAnchor("top");
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  const handleAction = async (action: () => Promise<any>, successMsg: string) => {
    try {
      await action();
      setSnackbar({ open: true, message: t(successMsg), severity: "success" });
    } catch (err: any) {
      const msg = err?.response?.data?.message?.en || t("Action failed");
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
    );
  }

  if (!orders.length) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center" py={4}>
            {t("No orders to display")}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>{t("Orders")}</Typography>
          <Chip label={`${orders.length} ${t("orders")}`} color="primary" size="small" />
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "grey.50" }}>
                <TableCell sx={{ fontWeight: 600 }}>{t("Order ID")}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t("Customer")}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t("Address")}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t("Phone")}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t("Items")}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t("Total")}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t("Status")}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t("Payment")}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t("Actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderId} hover>
                  <TableCell>#{order.orderId}</TableCell>
                  <TableCell>{order.shippingName}</TableCell>
                  <TableCell sx={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis" }}>
                    {order.shippingStreet}, {order.shippingCity}, {order.shippingCountry}
                  </TableCell>
                  <TableCell>{order.shippingPhoneNumber}</TableCell>
                  <TableCell>{order.items.length} {t("items")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>EGP {order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={t(order.orderStatus)}
                      size="small"
                      color={order.orderStatus === "Packed" ? "info" : order.orderStatus === "Shipped" ? "warning" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.paymentStatus === "Paid" ? t("Paid") : order.paymentMethod === "CashOnDelivery" ? t("COD") : t(order.paymentStatus)}
                      size="small"
                      color={order.paymentStatus === "Paid" ? "success" : "warning"}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      {order.orderStatus === "Packed" && (
                        <Button
                          size="small"
                          variant="contained"
                          color="info"
                          onClick={() => handleAction(
                            () => shipOrder.mutateAsync(order.orderId),
                            "Order shipped successfully"
                          )}
                          disabled={shipOrder.isPending}
                        >
                          {t("Ship")}
                        </Button>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleAction(
                            () => deliverOrder.mutateAsync(order.orderId),
                            "Order delivered successfully"
                          )}
                          disabled={deliverOrder.isPending}
                        >
                          {t("Deliver")}
                        </Button>
                      )}
                      {order.paymentMethod === "CashOnDelivery" && order.paymentStatus !== "Paid" && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="warning"
                          onClick={() => handleAction(
                            () => markPaid.mutateAsync(order.orderId),
                            "Payment marked as paid"
                          )}
                          disabled={markPaid.isPending}
                        >
                          {t("Mark Paid")}
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 2 }} />

        {orders.filter(o => o.paymentMethod === "CashOnDelivery" && o.paymentStatus !== "Paid").length > 0 && (
          <Typography variant="body2" color="text.secondary">
            {t("Note")}: {t("COD orders require marking payment as paid after delivery")}
          </Typography>
        )}
      </CardContent>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={snackbarAnchor}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Card>
  );
};

export default ShippingOrdersTable;
