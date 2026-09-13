"use client";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import BlankCard from "@/components/shared/BlankCard";

interface Props {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
}

const StatsCard = ({ icon, label, value, color = "primary" }: Props) => {
  return (
    <BlankCard>
      <Box p={3} display="flex" gap={1} flexDirection="column">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight={600}>{label}</Typography>
          <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main`, borderRadius: "12px" }} variant="rounded">
            <Icon icon={icon} width={24} height={24} />
          </Avatar>
        </Stack>
        <Typography variant="h4" fontWeight={700}>{value}</Typography>
      </Box>
    </BlankCard>
  );
};

export default StatsCard;
