"use client";

import { useTranslation } from 'react-i18next';
import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import BlankCard from "@/components/shared/BlankCard";
import type { TopReelDto } from "../../types";

interface TopViewedReelsProps {
  reels?: TopReelDto[];
}

const TopViewedReels = ({ reels }: TopViewedReelsProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const items = reels ?? [];

  return (
    <BlankCard sx={{ height: "100%" }}>
      <Box p={3}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={2}
        >
          <Typography variant="h5" fontWeight={600}>
            {t('Most Viewed Reels')}
          </Typography>
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
        <Stack spacing={2}>
          {items.map((reel, index) => (
            <Box key={reel.reelId}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} gap={2} alignItems={"center"} flex={1}>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="textSecondary"
                    sx={{ minWidth: 20 }}
                  >
                    {index + 1}
                  </Typography>
                  <Box>
                    <Typography variant="body1" fontWeight={600} noWrap sx={{ maxWidth: 180 }}>
                      {reel.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {reel.likes} {t('likes')}
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="body2" fontWeight={700} color="primary">
                  {reel.views.toLocaleString()} {t('views')}
                </Typography>
              </Stack>
              {index < items.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
          {items.length === 0 && (
            <Typography color="textSecondary" variant="body2" textAlign="center" py={4}>
              {t('No reel data available')}
            </Typography>
          )}
        </Stack>
      </Box>
    </BlankCard>
  );
};

export default TopViewedReels;
