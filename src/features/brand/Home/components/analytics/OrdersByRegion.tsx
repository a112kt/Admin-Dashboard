"use client";
import { useTranslation } from 'react-i18next';
import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import DashboardCard from "@/components/shared/DashboardCard";
import { PieChart } from "@mui/x-charts/PieChart";
import SkeletonCurrentVisit from "../skeleton/SkeletonCurrentVisit";
import { useOrdersByRegion } from "../../hooks/useOrdersByRegion";

const COLORS = ["#1B2351", "#47C0D2", "#85D9E5", "#A6E4E8", "#C8F0F3"];

const OrdersByRegion = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { ordersByRegion, loading } = useOrdersByRegion();

  const regions = ordersByRegion?.regions || [];
  const totalOrders = ordersByRegion?.totalOrders || 0;

  const namedRegions = regions.filter((r) => r.city !== "N/A");
  const naRegions = regions.filter((r) => r.city === "N/A");
  const naTotal = naRegions.reduce((sum, r) => sum + r.orderCount, 0);

  const aggregatedRegions = [
    ...namedRegions,
    ...(naTotal > 0 ? [{ city: t("Others"), orderCount: naTotal }] : []),
  ];

  const data = aggregatedRegions.map((r, i) => ({
    id: i,
    value: r.orderCount,
    label: r.city,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <>
      {loading ? (
        <SkeletonCurrentVisit />
      ) : (
        <DashboardCard title={t('Orders by Region')}>
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 240,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 240,
                  height: 240,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto",
                }}
              >
                <PieChart
                  series={[
                    {
                      data,
                      innerRadius: 65,
                      outerRadius: 90,
                      paddingAngle: 0,
                    },
                  ]}
                  height={240}
                  width={240}
                  margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                  slotProps={{
                    legend: { hidden: true } as any,
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-69%, -55%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                      color: "#1B2351",
                      lineHeight: 1,
                      fontSize: "22px",
                    }}
                  >
                    {totalOrders.toLocaleString()}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      fontSize: "12px",
                      mt: 0.5,
                    }}
                  >
                    {t('Total Orders')}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Stack gap={1.5} mt={3}>
              {data.map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        height: "14px",
                        width: "4px",
                        borderRadius: "2px",
                        bgcolor: item.color,
                      }}
                    />
                    <Typography variant="body1" fontWeight={500}>
                      {item.label}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap={0.75}>
                    <Typography variant="body1" fontWeight={600}>
                      {item.value.toLocaleString()}
                    </Typography>

                    <Chip
                      label={`${Math.round((item.value / totalOrders) * 100)}%`}
                      size="small"
                      sx={{
                        color: "#1B2351",
                        bgcolor: "rgba(71, 192, 210, 0.2)",
                        fontWeight: 600,
                      }}
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default OrdersByRegion;
