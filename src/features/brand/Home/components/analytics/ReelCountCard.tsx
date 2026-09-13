"use client";

import { useTranslation } from 'react-i18next';
import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import BlankCard from "@/components/shared/BlankCard";

interface ReelCountCardProps {
  reelCounts?: {
    all: number;
    published: number;
    draft: number;
  };
}

const ReelCountCard = ({ reelCounts }: ReelCountCardProps) => {
  const { t } = useTranslation();
  const counts = reelCounts ?? { all: 0, published: 0, draft: 0 };

  return (
    <BlankCard>
      <Box p={3} display="flex" gap={1} flexDirection="column">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5" fontWeight={600}>{t('Total Reels')}</Typography>
          <Avatar
            sx={{
              bgcolor: "rgba(71, 192, 210, 0.1)",
              color: "#1B2351",
              borderRadius: "12px",
            }}
            variant="rounded"
          >
            <Icon icon={"solar:videocamera-linear"} width={24} height={24} />
          </Avatar>
        </Stack>
        <Box>
          <Stack direction={"row"} gap={1} alignItems={"center"} mt={1}>
            <Typography variant="h4" fontWeight={700}>
              {counts.all} {t('Reels')}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1} mt={1}>
            <Chip
              label={`${counts.published} ${t('Published')}`}
              size="small"
              color="success"
              sx={{ fontWeight: 600, borderRadius: "8px" }}
            />
            <Chip
              label={`${counts.draft} ${t('Draft')}`}
              size="small"
              color="default"
              sx={{ fontWeight: 600, borderRadius: "8px" }}
            />
          </Stack>
        </Box>
      </Box>
    </BlankCard>
  );
};

export default ReelCountCard;
