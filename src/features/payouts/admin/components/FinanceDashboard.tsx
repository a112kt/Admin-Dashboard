"use client";
import { Box, Card, CardContent, Grid, Typography, CircularProgress, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useAdminFinanceDashboard } from "../hooks/useAdminFinance";

export default function FinanceDashboard() {
  const { t } = useTranslation();
  const { dashboard, loading, refetch } = useAdminFinanceDashboard();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  const cards = [
    {
      title: t("Pending Brand Balance"),
      value: dashboard?.totalPendingBrandBalance ?? 0,
      icon: "solar:clock-circle-line-duotone",
      color: "#ed6c02",
      bg: "#fff3e0",
    },
    {
      title: t("Available Brand Balance"),
      value: dashboard?.totalAvailableBrandBalance ?? 0,
      icon: "solar:wallet-money-line-duotone",
      color: "#2e7d32",
      bg: "#e8f5e9",
    },
    {
      title: t("Paid Brand Balance"),
      value: dashboard?.totalPaidBrandBalance ?? 0,
      icon: "solar:check-circle-line-duotone",
      color: "#9c27b0",
      bg: "#f3e5f5",
    },
    {
      title: t("Pending Shipping Balance"),
      value: dashboard?.totalPendingShippingBalance ?? 0,
      icon: "solar:delivery-line-duotone",
      color: "#0288d1",
      bg: "#e1f5fe",
    },
    {
      title: t("Paid Shipping Balance"),
      value: dashboard?.totalPaidShippingBalance ?? 0,
      icon: "solar:box-minimalistic-line-duotone",
      color: "#6a1b9a",
      bg: "#f3e5f5",
    },
    {
      title: t("Platform Commission"),
      value: dashboard?.platformTotalCommission ?? 0,
      icon: "solar:percent-line-duotone",
      color: "#1565c0",
      bg: "#e3f2fd",
    },
    {
      title: t("Orders Waiting Settlement"),
      value: dashboard?.ordersWaitingSettlement ?? 0,
      icon: "solar:inbox-archive-line-duotone",
      color: "#e65100",
      bg: "#fff3e0",
      isInt: true,
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>{t("Finance Dashboard")}</Typography>
        <Button variant="outlined" startIcon={<Icon icon="solar:refresh-line-duotone" width={18} />} onClick={() => refetch()}>
          {t("Refresh")}
        </Button>
      </Box>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
                  {card.isInt ? card.value : `${card.value.toFixed(2)} EGP`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
