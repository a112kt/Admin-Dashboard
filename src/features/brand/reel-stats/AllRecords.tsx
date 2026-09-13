"use client";
import { Grid, useTheme } from "@mui/material";
import BlankCard from "@/components/shared/BlankCard";
import TotalReels from "./AllRecords/TotalReels";
import PublishedReels from "./AllRecords/PublishedReels";
import ProductClicks from "./AllRecords/ProductClicks";
import EngagementRate from "./AllRecords/EngagementRate";

interface AllRecordsProps {
  reelCounts?: {
    all: number;
    published: number;
    draft: number;
  };
  productViewsCount?: number | null;
  engagementRate?: number | null;
}

const AllRecords = ({ reelCounts, productViewsCount, engagementRate }: AllRecordsProps) => {
  const theme = useTheme();

  return (
    <BlankCard>
      <Grid container size={12}>
        <Grid
          size={{ xs: 12, sm: 6, lg: 3 }}
          borderRight={1}
          borderColor={theme.palette.divider}
        >
          <TotalReels count={reelCounts?.all} />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6, lg: 3 }}
          borderRight={1}
          borderColor={theme.palette.divider}
        >
          <PublishedReels count={reelCounts?.published} />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6, lg: 3 }}
          borderRight={1}
          borderColor={theme.palette.divider}
        >
          <ProductClicks productViewsCount={productViewsCount} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <EngagementRate engagementRate={engagementRate} />
        </Grid>
      </Grid>
    </BlankCard>
  );
};

export default AllRecords;
