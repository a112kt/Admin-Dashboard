"use client";
import { Box, Card, CardContent, Grid, Typography, CircularProgress, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { useBrandWalletSummary } from "../hooks/useBrandFinance";
import { useTranslation } from "react-i18next";

export default function WalletSummary() {
  const { t } = useTranslation();
  const { summary, loading, refetch } = useBrandWalletSummary();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  const cards = [
    {
      title: t("Pending Balance"),
      value: summary?.pendingBalance ?? 0,
      icon: "solar:clock-circle-line-duotone",
      color: "#ed6c02",
      bg: "#fff3e0",
    },
    {
      title: t("Available Balance"),
      value: summary?.availableBalance ?? 0,
      icon: "solar:wallet-money-line-duotone",
      color: "#2e7d32",
      bg: "#e8f5e9",
    },
    {
      title: t("Requested Balance"),
      value: summary?.requestedBalance ?? 0,
      icon: "solar:document-text-line-duotone",
      color: "#0288d1",
      bg: "#e1f5fe",
    },
    {
      title: t("Paid Balance"),
      value: summary?.paidBalance ?? 0,
      icon: "solar:check-circle-line-duotone",
      color: "#9c27b0",
      bg: "#f3e5f5",
    },
    {
      title: t("Total Lifetime Earnings"),
      value: summary?.totalLifetimeEarnings ?? 0,
      icon: "solar:chart-line-duotone",
      color: "#1565c0",
      bg: "#e3f2fd",
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>{t("Wallet Summary")}</Typography>
        <Button variant="outlined" startIcon={<Icon icon="solar:refresh-line-duotone" width={18} />} onClick={() => refetch()}>
          {t("Refresh")}
        </Button>
      </Box>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: card.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon icon={card.icon} width={24} color={card.color} />
                  </Box>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {card.value.toFixed(2)} EGP
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
