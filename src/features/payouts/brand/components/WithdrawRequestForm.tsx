"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useBrandWalletSummary, useCreateWithdrawal } from "../hooks/useBrandFinance";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

export default function WithdrawRequestForm() {
  const { t } = useTranslation();
  const { summary, loading: summaryLoading } = useBrandWalletSummary();
  const createWithdrawal = useCreateWithdrawal();
  const snackbarAnchor = useSnackbarAnchor("top");
  const [amount, setAmount] = useState("");
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async () => {
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setSnackbar({ open: true, message: t("Please enter a valid amount"), severity: "error" });
      return;
    }
    if (parsed < 100) {
      setSnackbar({ open: true, message: t("Minimum withdrawal amount is 100 EGP"), severity: "error" });
      return;
    }
    if (parsed > (summary?.availableBalance ?? 0)) {
      setSnackbar({ open: true, message: t("Amount exceeds available balance"), severity: "error" });
      return;
    }
    try {
      await createWithdrawal.mutateAsync(parsed);
      setSnackbar({ open: true, message: t("Withdrawal request submitted successfully"), severity: "success" });
      setAmount("");
    } catch (err: any) {
      const msg = err?.response?.data?.message?.en || t("Failed to submit withdrawal request");
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>{t("Request Withdrawal")}</Typography>

        {summaryLoading ? (
          <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
        ) : (
          <Stack spacing={3} maxWidth={480}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "success.light",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Icon icon="solar:wallet-money-line-duotone" width={32} color="#2e7d32" />
              <Box>
                <Typography variant="body2" color="text.secondary">{t("Available Balance")}</Typography>
                <Typography variant="h5" fontWeight={700}>{(summary?.availableBalance ?? 0).toFixed(2)} EGP</Typography>
              </Box>
            </Box>

            <TextField
              label={t("Withdrawal Amount (EGP)")}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputProps={{ min: 100, step: "0.01" }}
              fullWidth
            />

            <Typography variant="caption" color="text.secondary">
              {t("Minimum withdrawal amount: 100 EGP")}
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<Icon icon="solar:arrow-right-up-line-duotone" width={20} />}
              onClick={handleSubmit}
              disabled={createWithdrawal.isPending}
            >
              {createWithdrawal.isPending ? <CircularProgress size={24} /> : t("Submit Withdrawal Request")}
            </Button>
          </Stack>
        )}
      </CardContent>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={snackbarAnchor}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Card>
  );
}
