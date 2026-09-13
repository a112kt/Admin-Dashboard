"use client";

import { useTranslation } from 'react-i18next';
import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import BlankCard from "@/components/shared/BlankCard";

interface ReelViewsCardProps {
  totalReelViews?: number;
}

const ReelViewsCard = ({ totalReelViews }: ReelViewsCardProps) => {
  const { t } = useTranslation();
  return (
    <BlankCard>
      <Box p={3} display="flex" gap={1} flexDirection="column">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5" fontWeight={600}>{t('Total Reel Views')}</Typography>
          <Avatar
            sx={{
              bgcolor: "rgba(71, 192, 210, 0.1)",
              color: "#1B2351",
              borderRadius: "12px",
            }}
            variant="rounded"
          >
            <Icon icon={"solar:eye-linear"} width={24} height={24} />
          </Avatar>
        </Stack>
        <Box>
          <Stack direction={"row"} gap={1} alignItems={"center"} mt={1}>
            <Typography variant="h4" fontWeight={700}>
              {totalReelViews?.toLocaleString() ?? "—"}
            </Typography>
          </Stack>
          <Typography color="textSecondary" variant="body2" mt={0.5}>
            {t('Total views across all reels')}
          </Typography>
        </Box>
      </Box>
    </BlankCard>
  );
};

export default ReelViewsCard;
