"use client"
import AllRecords from "@/features/brand/reel-stats/AllRecords";
import Carousel from "@/features/brand/reel-stats/Carousel";
import AudienceSegmentation from "@/features/brand/reel-stats/AudienceSegmentation";
import MostViewedProducts from "@/features/brand/reel-stats/MostViewedProducts";
import MonthlyEngagement from "@/features/brand/reel-stats/MonthlyEngagement";
import ReelsPerformanceOverTime from "@/features/brand/reel-stats/ReelsPerformanceOverTime";
import TopReels from "@/features/brand/reel-stats/TopReels";
import ReelsGrowth from "@/features/brand/reel-stats/ReelsGrowth";
import ContentReachAnalysis from "@/features/brand/reel-stats/TotalAssets";
import TotalViews from "@/features/brand/reel-stats/TotalViews";
import UserInteraction from "@/features/brand/reel-stats/UserInteraction";
import Welcome from "@/components/layout/shared/welcome/Welcome";
import PageContainer from "@/components/ui/container/PageContainer";
import { useBrandReelAnalytics } from "@/features/brand/reel-stats/hooks/useBrandReelAnalytics";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';



export default function ReelStats() {
  const { t } = useTranslation();
    const { analytics, loading } = useBrandReelAnalytics();

    if (loading) {
        return (
            <PageContainer title={t('Reels Analytics')} description='Overview of your content performance'>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                </Box>
            </PageContainer>
        );
    }

    return (
         <PageContainer title={t('Reels Analytics')} description='Overview of your content performance'>
      <Box mt={3}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid
            size={{
              xs: 12,
              lg: 5,

            }}>
            <TotalViews
              totalViews={analytics?.totalViews}
              viewsGrowthPercentage={analytics?.viewsGrowthPercentage}
              monthlyViews={analytics?.monthlyViews}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}>
            <MonthlyEngagement
              totalLikes={analytics?.totalLikes}
              likesGrowthPercentage={analytics?.likesGrowthPercentage}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3,
            }}>
            <ReelsGrowth viewsGrowthPercentage={analytics?.viewsGrowthPercentage} />
          </Grid>
          <Grid
            size={{
              xs: 12,
            }}>
            <AllRecords
              reelCounts={analytics?.reelCounts}
              productViewsCount={analytics?.productViewsCount}
              engagementRate={analytics?.engagementRate}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 3,
            }}>
            <AudienceSegmentation audienceStats={analytics?.audienceStats} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 6,
            }}>
            <ReelsPerformanceOverTime
              monthlyViews={analytics?.monthlyViews}
              monthlyLikes={analytics?.monthlyLikes}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 3,
            }}>
            <UserInteraction dailyEngagement={analytics?.dailyEngagement} />
          </Grid>
          <Grid size={12}>
            <TopReels topViewedReels={analytics?.topViewedReels} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 6,
            }}>
            <MostViewedProducts mostViewedProducts={analytics?.mostViewedProducts} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 6,
            }}>
            <ContentReachAnalysis />
          </Grid>

        </Grid>
        <Welcome />
      </Box>
    </PageContainer>
    );
}

ReelStats.layout = "Blank";