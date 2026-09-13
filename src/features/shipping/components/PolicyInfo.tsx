"use client";
import { Box, Card, CardContent, Typography, CircularProgress, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useShippingPolicy } from "../hooks/useShippingFinance";

const PolicyInfo = () => {
  const { t } = useTranslation();
  const { policy, loading } = useShippingPolicy();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
    );
  }

  if (!policy) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
            {t("Unable to load policy information")}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const fields = [
    { label: t("Payment Schedule"), value: policy.paymentSchedule },
    { label: t("Settlement Rules"), value: policy.settlementRules },
    { label: t("Delivery Requirements"), value: policy.deliveryRequirements },
    { label: t("Payment Processing Time"), value: policy.paymentProcessingTime },
    { label: t("Supported Payment Methods"), value: policy.supportedPaymentMethod },
    { label: t("Support Contact"), value: policy.supportContact },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          {t("Shipping Finance Policy")}
        </Typography>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid size={{ xs: 12, sm: 6 }} key={field.label}>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {field.label}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {field.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PolicyInfo;
