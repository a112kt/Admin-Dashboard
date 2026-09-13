import React from 'react';
import { Stack, Typography, Box, Skeleton } from '@mui/material';
import DashboardCard from '@/components/shared/DashboardCard';

const SkeletonCurrentVisit = () => {
    return (
        <DashboardCard>
            <Box display="flex" flexDirection="column" alignItems="center" py={3}>
                {/* Circular Chart Skeleton */}
                <Skeleton variant="circular" width={200} height={200} />

                {/* Legends/Stats */}
                <Stack direction="column" spacing={4} justifyContent="center" mt={2} width="100%">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Skeleton variant="circular" width={24} height={24} />
                        <Box>
                            <Typography variant="h6" mb={0.5} >
                                <Skeleton variant="text" width={40} height={20} />
                            </Typography>

                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Skeleton variant="circular" width={24} height={24} />
                        <Box>
                            <Typography variant="h6" mb={0.5} >
                                <Skeleton variant="text" width={40} height={20} />
                            </Typography>

                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Skeleton variant="circular" width={24} height={24} />
                        <Box>
                            <Typography variant="h6" mb={0.5} >
                                <Skeleton variant="text" width={40} height={20} />
                            </Typography>

                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </DashboardCard>
    );
};

export default SkeletonCurrentVisit;
