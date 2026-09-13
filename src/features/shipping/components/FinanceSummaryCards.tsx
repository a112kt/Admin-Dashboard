"use client";
import { Box, Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useShippingWalletSummary } from "../hooks/useShippingFinance";

const FinanceSummaryCards = () => {
  const { t } = useTranslation();
  const { summary, loading } = useShippingWalletSummary();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
    );
  }

  if (!summary) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
            {t("Unable to load finance summary")}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const cards = [
    { label: t("Pending Balance"), value: summary.pendingBalance, color: "warning.main" },
    { label: t("Available Balance"), value: summary.availableBalance, color: "info.main" },
    { label: t("Paid Balance"), value: summary.paidBalance, color: "success.main" },
    { label: t("Total Earnings"), value: summary.totalLifetimeEarnings, color: "primary.main" },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.label}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {card.label}
              </Typography>
              <Typography variant="h5" fontWeight={700} color={card.color}>
                {card.value.toFixed(2)} EGP
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FinanceSummaryCards;
