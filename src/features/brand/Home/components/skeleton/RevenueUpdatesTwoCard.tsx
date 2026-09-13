import React from 'react';
import { Box, Grid, Stack, Typography, Skeleton, Chip, Avatar } from '@mui/material';
import BlankCard from '@/components/shared/BlankCard';

const SkeletonRevenueUpdatesTwoCard = () => {
  return (
    <BlankCard>
      <Box p={3}>
        {/* Header Row */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* Left Side: Title and Stats */}
          <Box>
            <Skeleton variant="text" width={120} height={32} sx={{ mb: 1 }} />
            <Grid container alignItems="center" spacing={1}>
              <Grid>
                <Skeleton variant="text" width={80} height={36} />
              </Grid>
              <Grid>
                <Skeleton variant="rounded" width={48} height={28} />
              </Grid>
              <Grid>
                <Skeleton variant="text" width={90} height={20} />
              </Grid>
            </Grid>
          </Box>
          {/* Right Side: Avatars and Select */}
          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            <Stack direction="row" alignItems="center" gap={2}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Skeleton variant="circular" width={16} height={16} />
                <Skeleton variant="text" width={48} height={20} />
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <Skeleton variant="circular" width={16} height={16} />
                <Skeleton variant="text" width={48} height={20} />
              </Stack>
            </Stack>
            <Skeleton variant="rounded" width={80} height={36} />
          </Box>
        </Box>
        {/* Chart Section */}
        <Box mt={3}>
          <Skeleton variant="rounded" width="100%" height={315} />
        </Box>
      </Box>
    </BlankCard>
  );
};

export default SkeletonRevenueUpdatesTwoCard;
