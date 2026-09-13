"use client";

import { Icon } from "@iconify/react";
import { Avatar, Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import BlankCard from "@/components/shared/BlankCard";

interface TotalRevenueProps {
  totalRevenue?: number;
  revenueGrowthPercentage?: number;
}

const TotalRevenue = ({ totalRevenue, revenueGrowthPercentage }: TotalRevenueProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <BlankCard>
      <Box p={3} display="flex" gap={1} flexDirection="column">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5" fontWeight={600}>{t('Total Revenue')}</Typography>
          <Avatar
            sx={{
              bgcolor: 'rgba(71, 192, 210, 0.1)',
              color: '#1B2351',
              borderRadius: '12px'
            }}
            variant="rounded"
          >
            <Icon
              icon={"solar:dollar-minimalistic-linear"}
              width={24}
              height={24}
            />
          </Avatar>
        </Stack>
        <Box>
          <Stack direction={"row"} gap={1} alignItems={"center"} mt={1}>
            <Typography variant="h4" fontWeight={700}>EGP {totalRevenue?.toLocaleString() ?? "—"}</Typography>
            <Chip
              label={`${(revenueGrowthPercentage ?? 0) >= 0 ? '+' : ''}${revenueGrowthPercentage ?? 0}%`}
              size="small"
              sx={{
                color: (revenueGrowthPercentage ?? 0) >= 0 ? '#1B2351' : '#d32f2f',
                bgcolor: (revenueGrowthPercentage ?? 0) >= 0 ? 'rgba(71, 192, 210, 0.2)' : 'rgba(211, 47, 47, 0.1)',
                fontWeight: 600
              }}
            />
          </Stack>
          <Typography color="textSecondary" variant="body2" mt={0.5}>
            {t('vs last month')}
          </Typography>
        </Box>
      </Box>
    </BlankCard>
  );
};

export default TotalRevenue;
