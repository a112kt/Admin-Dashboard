import { useTranslation } from 'react-i18next';
import {
  Box,
  Chip,
  Fab,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DashboardCard from "@/components/shared/DashboardCard";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { OrderStatusOverview as OrderStatusOverviewType, OrderStatusCounts } from "../../types";

const STATUS_MAP: Record<string, string> = {
  "0": "Pending",
  "5": "Delivered",
  "6": "Cancelled",
  "7": "PendingCancellation",
};

const STATUS_COLORS: Record<string, string> = {
  Delivered: "#1B2351",
  Pending: "#FFB300",
  Cancelled: "#EF5350",
  PendingCancellation: "#FF7043",
};

type TimeFilter = "This Week" | "This Month" | "This Year";

const getCountsForFilter = (
  overview: OrderStatusOverviewType | undefined,
  filter: TimeFilter
): OrderStatusCounts | undefined => {
  if (!overview) return undefined;
  switch (filter) {
    case "This Week":
      return overview.thisWeek;
    case "This Month":
      return overview.thisMonth;
    case "This Year":
      return overview.thisYear;
  }
};

const OrderStatusOverview = ({ orderStatusOverview }: { orderStatusOverview?: OrderStatusOverviewType }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("This Week");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (filter: TimeFilter) => {
    setTimeFilter(filter);
    setAnchorEl(null);
  };

  const counts = getCountsForFilter(orderStatusOverview, timeFilter);

  const pending = counts?.pending ?? 0;
  const processing = counts?.processing ?? 0;
  const preparing = counts?.preparing ?? 0;
  const packed = counts?.packed ?? 0;
  const shipped = counts?.shipped ?? 0;
  const delivered = counts?.delivered ?? 0;
  const cancelled = counts?.cancelled ?? 0;
  const pendingCancellation = counts?.pendingCancellation ?? 0;

  const relevant = pending + processing + preparing + packed + shipped + delivered + cancelled + pendingCancellation;
  const total = relevant || 1;

  const pendingPct = (pending / total) * 100;
  const deliveredPct = (delivered / total) * 100;
  const cancelledPct = (cancelled / total) * 100;
  const pendingCancellationPct = (pendingCancellation / total) * 100;
  const successRate = delivered + cancelled > 0 ? (delivered / (delivered + cancelled)) * 100 : 0;

  return (
    <DashboardCard
      title={t('Order Status')}
      subtitle={t(timeFilter)}
      action={
        <Fab
          size="small"
          sx={{
            bgcolor: "transparent",
            boxShadow: 'none',
            "&:hover": {
              background: `rgba(0,0,0,0.05) !important`,
            },
          }}
          onClick={handleClick}
        >
          <Icon
            icon={"solar:menu-dots-bold"}
            width={24}
            height={24}
          />
        </Fab>
      }
    >
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect("This Week")} selected={timeFilter === "This Week"}>{t('This Week')}</MenuItem>
        <MenuItem onClick={() => handleSelect("This Month")} selected={timeFilter === "This Month"}>{t('This Month')}</MenuItem>
        <MenuItem onClick={() => handleSelect("This Year")} selected={timeFilter === "This Year"}>{t('This Year')}</MenuItem>
      </Menu>
      <>
        <Typography
          variant="h6"
          fontWeight={400}
          color="textSecondary"
        >
          {t('Total Orders Performance')}
        </Typography>
        <Stack direction={"row"} gap={1} alignItems={"center"} mt={0.5}>
          <Typography variant="h3" fontWeight={700}>{successRate.toFixed(1)}%</Typography>
          <Chip
            label={t('Success Rate')}
            size="small"
            sx={{
              color: '#1B2351',
              bgcolor: 'rgba(71, 192, 210, 0.2)',
              fontWeight: 600
            }}
          />
        </Stack>
        <Box mt={3} sx={{ height: 15, width: '100%', display: 'flex', overflow: 'hidden' }}>
          <Box sx={{ width: `${deliveredPct}%`, bgcolor: STATUS_COLORS.Delivered }} />
          <Box sx={{ width: `${pendingPct}%`, bgcolor: STATUS_COLORS.Pending }} />
          <Box sx={{ width: `${cancelledPct}%`, bgcolor: STATUS_COLORS.Cancelled }} />
          <Box sx={{ width: `${pendingCancellationPct}%`, bgcolor: STATUS_COLORS.PendingCancellation }} />
        </Box>
        <Stack direction={"row"} gap={2} mt={3} flexWrap="wrap">
          {(["Delivered", "Pending", "Cancelled", "PendingCancellation"] as const).map((label) => {
            const key = label.toLowerCase() as keyof OrderStatusCounts;
            return (
              <Stack key={label} direction={"row"} alignItems={"center"} gap={1}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: STATUS_COLORS[label] }} />
                <Typography variant="body2" color="textSecondary">
                  {t(label)} ({counts?.[key] ?? 0})
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </>
    </DashboardCard>
  );
};
export default OrderStatusOverview;
