"use client"

import BrandPerformance from "@/features/brand/Home/components/analytics/TopProducts";
import OrdersByRegion from "@/features/brand/Home/components/analytics/OrdersByRegion";
import Greeting from "@/features/brand/Home/components/analytics/Greeting";
import OrderStatusOverview from "@/features/brand/Home/components/analytics/KeyInsights";
import TotalOrders from "@/features/brand/Home/components/analytics/TotalOrders";
import RecentOrders from "@/features/brand/Home/components/analytics/RecentOrders";
import SalesPerformance from "@/features/brand/Home/components/analytics/SalesPerformance";
import TotalRevenue from "@/features/brand/Home/components/analytics/TotalRevenue";
import CustomersDealedWith from "@/features/brand/Home/components/analytics/CustomersDealedWith";
import ReelViewsCard from "@/features/brand/Home/components/analytics/ReelViewsCard";
import ReelLikesCard from "@/features/brand/Home/components/analytics/ReelLikesCard";
import ReelCountCard from "@/features/brand/Home/components/analytics/ReelCountCard";
import TopViewedReels from "@/features/brand/Home/components/analytics/TopViewedReels";
import TopLikedReels from "@/features/brand/Home/components/analytics/TopLikedReels";
import PageContainer from "@/components/ui/container/PageContainer";
import { useBrandDashboard } from "@/features/brand/Home/hooks/useBrandDashboard";
import { useMyBrand } from "@/features/brand/Home/hooks/useMyBrand";
import { Box, CircularProgress, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import PendingApprovalView from "@/features/brand/pendingApproval/components/PendingApprovalView";
import RejectedView from "@/features/brand/pendingApproval/components/RejectedView";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";

export default function Landingpage() {
  const { t } = useTranslation();
    const { dashboard, loading: dashboardLoading } = useBrandDashboard();
    const { brand, loading: brandLoading } = useMyBrand();
    const { setBrandStatus } = useContext(AuthContext);
    const router = useRouter();

    const loading = dashboardLoading || brandLoading;

    const status = brand?.status;

    useEffect(() => {
        if (status) {
            setBrandStatus(status);
        }
    }, [status, setBrandStatus]);

    if (loading) {
        return (
            <PageContainer title={t('E-commerce Dashboard')} description={t('Brand Management Dashboard')}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                </Box>
            </PageContainer>
        );
    }

    if (status === "PENDING_APPROVAL") {
        return (
            <PageContainer title={t('Pending Approval')} description={t('Brand Registration Status')}>
                <PendingApprovalView submittedAt={brand?.submittedAt} />
            </PageContainer>
        );
    }

    if (status === "REJECTED") {
        return (
            <PageContainer title={t('Registration Rejected')} description={t('Brand Registration Status')}>
                <RejectedView
                    rejectionReason={brand?.rejectionReason}
                    lastFailedStep={brand?.lastFailedStep}
                    onContinueRegistration={() => router.push("/auth?step=resume")}
                />
            </PageContainer>
        );
    }

    return (
        <PageContainer title={t('E-commerce Dashboard')} description={t('Brand Management Dashboard')}>
            <Box mt={3}>
                <Grid container spacing={3} alignItems="stretch">
                    {/* Header Row */}
                    <Grid
                        size={{
                            xs: 12,
                            lg: 8,
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Greeting brandName={brand?.displayName} />
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
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <OrderStatusOverview orderStatusOverview={dashboard?.orderStatusOverview} />
                        </motion.div>
                    </Grid>
                    {/* Main Charts Row */}
                    <Grid
                        size={{
                            xs: 12,
                            lg: 8,
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <SalesPerformance revenueTrend={dashboard?.revenueTrend} salesGrowthPercentage={dashboard?.salesGrowthPercentage} />
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
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <OrdersByRegion />
                        </motion.div>
                    </Grid>

                    {/* Stats Cards Row */}
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 4,
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <TotalRevenue totalRevenue={dashboard?.totalRevenue} revenueGrowthPercentage={dashboard?.revenueGrowthPercentage} />
                        </motion.div>
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 4,
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <TotalOrders totalOrders={dashboard?.totalOrders} ordersGrowthPercentage={dashboard?.ordersGrowthPercentage} />
                        </motion.div>
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 12,
                            lg: 4,
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <CustomersDealedWith activeCustomers={dashboard?.activeCustomers} customersGrowthPercentage={dashboard?.customersGrowthPercentage} />
                        </motion.div>
                    </Grid>

                    {/* Reel Stats Cards Row */}
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 4,
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <ReelViewsCard totalReelViews={dashboard?.totalReelViews} />
                        </motion.div>
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 4,
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <ReelLikesCard totalReelLikes={dashboard?.totalReelLikes} />
                        </motion.div>
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 12,
                            lg: 4,
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        >
                            <ReelCountCard reelCounts={dashboard?.reelCounts} />
                        </motion.div>
                    </Grid>

                    {/* Top Reels Row */}
                    <Grid
                        size={{
                            xs: 12,
                            lg: 6,
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                        >
                            <TopViewedReels reels={dashboard?.topViewedReels} />
                        </motion.div>
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 6,
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.1 }}
                        >
                            <TopLikedReels reels={dashboard?.topLikedReels} />
                        </motion.div>
                    </Grid>

                    {/* Table and Performance Row */}
                    <Grid
                        size={{
                            xs: 12,
                            lg: 8,
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                        >
                            <RecentOrders recentOrders={dashboard?.recentOrders ?? []} />
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
                            transition={{ duration: 0.5, delay: 1.3 }}
                        >
                            <BrandPerformance topProducts={dashboard?.topProducts ?? []} />
                        </motion.div>
                    </Grid>
                </Grid>

            </Box>
        </PageContainer>
    );
};

Landingpage.layout = "Blank";
