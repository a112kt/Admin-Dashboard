"use client"
import { Box, CircularProgress, Grid } from "@mui/material"
import { motion } from "framer-motion"
import { useState } from "react";
import PageContainer from "@/components/ui/container/PageContainer"
import AllRecords from "@/features/admin/Home/components/AllRecords";
import Totalsales from "@/features/admin/Home/components/Totalsales";
import OverViewTab from "@/features/admin/Home/components/OverViewTab";
import Update from "@/features/admin/Home/components/Update";
import TotalSale from "@/features/admin/Home/components/TotalSale";
import TotalProfit from "@/features/admin/Home/components/TotalProfit";
import Advertising from "@/features/admin/Home/components/Advertising";
import TopProjects from "@/features/admin/Home/components/TopProjects";
import PlatformDistribution from "@/features/admin/Home/components/PlatformDistribution";
import { useAdminDashboard } from "@/features/admin/Home/hooks/useAdminDashboard";
import { exportDashboardCSV } from "@/features/admin/Home/services";
import { useTranslation } from 'react-i18next';

export default function AdminPage() {
  const { t } = useTranslation();
  const [year, setYear] = useState(new Date().getFullYear());
  const { dashboard, loading, refresh } = useAdminDashboard(year);

  const availableYears = dashboard?.revenueTrend
    ? [...new Set(dashboard.revenueTrend.map(r => r.year))].sort((a, b) => b - a)
    : [new Date().getFullYear()];

  const handleDownload = () => {
    if (dashboard) {
      exportDashboardCSV(dashboard);
    }
  };

  if (loading) {
    return (
      <PageContainer title={t('Admin Dashboard')} description="Admin Management Dashboard">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t('modern')} description='this is modern'>
      <Box mt={3}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid size={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <OverViewTab
                year={year}
                onYearChange={setYear}
                onRefresh={refresh}
                onDownload={handleDownload}
                availableYears={availableYears}
              />
            </motion.div>
          </Grid>
          <Grid size={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
            >
              <Update ordersGrowthPercentage={dashboard?.ordersGrowthPercentage} revenueGrowthPercentage={dashboard?.revenueGrowthPercentage} />
            </motion.div>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 7,
            }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Totalsales
                totalRevenue={dashboard?.totalRevenue}
                revenueTrend={dashboard?.revenueTrend}
                brandSalesRevenue={dashboard?.brandSalesRevenue}
                deliveryRevenue={dashboard?.deliveryRevenue}
                revenueGrowthPercentage={dashboard?.revenueGrowthPercentage}
              />
            </motion.div>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 5,
            }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AllRecords totalUsers={dashboard?.totalUsers} totalBrands={dashboard?.totalBrands} pendingRequests={dashboard?.pendingRequests} totalOrders={dashboard?.totalOrders} totalReels={dashboard?.totalReels} />
            </motion.div>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TotalSale
                totalOrders={dashboard?.totalOrders}
                monthlyOrdersTrend={dashboard?.monthlyOrdersTrend}
                ordersGrowthPercentage={dashboard?.ordersGrowthPercentage}
              />
            </motion.div>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <TotalProfit totalReelViews={dashboard?.totalReelViews} totalReels={dashboard?.totalReels} />
            </motion.div>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Advertising engagementRate={dashboard?.engagementRate} monthlyEngagementTrend={dashboard?.monthlyEngagementTrend} />
            </motion.div>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 7,
            }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <TopProjects topBrands={dashboard?.topBrands} />
            </motion.div>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 5,
            }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <PlatformDistribution
                totalRevenue={dashboard?.totalRevenue}
                brandSalesRevenue={dashboard?.brandSalesRevenue}
                deliveryRevenue={dashboard?.deliveryRevenue}
                revenueGrowthPercentage={dashboard?.revenueGrowthPercentage}
                activeBrands={dashboard?.activeBrands}
                activeUsers={dashboard?.activeUsers}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}
