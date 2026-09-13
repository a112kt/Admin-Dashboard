"use client";
import * as React from "react";
import { Box, Typography, Container, Tabs, Tab, Alert } from "@mui/material";
import PageContainer from "@/components/ui/container/PageContainer";
import ShippingOrdersTable from "@/features/shipping/components/ShippingOrdersTable";
import FinanceSummaryCards from "@/features/shipping/components/FinanceSummaryCards";
import SettlementsTable from "@/features/shipping/components/SettlementsTable";
import PolicyInfo from "@/features/shipping/components/PolicyInfo";
import { useTranslation } from "react-i18next";

export default function ShippingPage() {
  const { t } = useTranslation();
  const [tab, setTab] = React.useState(0);
  const [hasBrandToken, setHasBrandToken] = React.useState(false);

  React.useEffect(() => {
    setHasBrandToken(!!localStorage.getItem("BrandToken"));
  }, []);

  return (
    <PageContainer title={t("Shipping Dashboard")} description={t("Manage shipping operations")}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box mb={4}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {t("Shipping Dashboard")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("Manage and track order shipments")}
          </Typography>
        </Box>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label={t("Orders")} />
          <Tab label={t("Finance")} />
        </Tabs>

        {tab === 0 && <ShippingOrdersTable />}

        {tab === 1 && (
          <Box display="flex" flexDirection="column" gap={3}>
              <FinanceSummaryCards />
              <SettlementsTable />
              <PolicyInfo />
            </Box>
        )}
      </Container>
    </PageContainer>
  );
}
