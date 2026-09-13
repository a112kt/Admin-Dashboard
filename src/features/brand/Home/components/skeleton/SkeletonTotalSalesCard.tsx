import { Box, Chip, Divider, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import BlankCard from '@/components/shared/BlankCard';


const SkeletonTotalSalesCard = () => {
    const theme = useTheme();

    return (
        <BlankCard>
            <Box p={3}>
                {/* Title */}
                <Skeleton width={120} height={32} />

                {/* Stats + Select */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1.5}>
                    <Skeleton variant="rectangular" width={200} height={36} />
                    <Skeleton variant="rectangular" width={80} height={36} />
                </Stack>

                {/* Divider */}
                <Box py={2.5}>
                    <Skeleton height={1} />
                </Box>

                {/* Online store row */}
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Skeleton width={120} height={24} />
                    <Skeleton width={80} height={24} />
                </Stack>

                {/* Offline store row */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1.5}>
                    <Skeleton width={120} height={24} />
                    <Skeleton width={80} height={24} />
                </Stack>

                {/* Chart */}
                <Box mt={3}>
                    <Skeleton variant="rectangular" height={200} />
                </Box>
            </Box>
        </BlankCard>
    );
};

export default SkeletonTotalSalesCard;
