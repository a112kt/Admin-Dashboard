"use client";
import React, { useContext } from "react";
import BlankCard from "@/components/shared/BlankCard";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import { BarChart } from "@mui/x-charts";
import SkeletonRevenueUpdatesTwoCard from "../skeleton/RevenueUpdatesTwoCard";
import CustomSelect from "@/components/ui/forms/theme-elements/CustomSelect";

interface RevenueupdatestwoCardProps {
  isLoading?: boolean;
  revenueTrend?: Array<{ year: number; month: number; revenue: number }>;
  salesGrowthPercentage?: number;
}

const SalesPerformance = ({ isLoading, revenueTrend, salesGrowthPercentage }: RevenueupdatestwoCardProps) => {
  const { t } = useTranslation();
  const [year, setYear] = React.useState(new Date().getFullYear().toString());
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setYear(event.target.value);
  };

  const xLabels = [
    `Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`,
    `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`,
  ];

  const monthlyData = xLabels.map((_, idx) => {
    const month = idx + 1;
    const entry = revenueTrend?.find(r => r.month === month && r.year.toString() === year);
    return entry?.revenue ?? 0;
  });

  const totalRevenue = monthlyData.reduce((sum, v) => sum + v, 0);

  const years = revenueTrend
    ? [...new Set(revenueTrend.map(r => r.year))].sort((a, b) => b - a).map(String)
    : [new Date().getFullYear().toString()];

  return (
    <>
      {isLoading ? (
        <SkeletonRevenueUpdatesTwoCard />
      ) : (
        <BlankCard>
          <Box p={3}>
            {/* Header Row */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Box>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {t('Total Orders / Sales')}
                </Typography>
                <Grid container alignItems="center" spacing={1}>
                  <Grid>
                    <Typography variant="h3" fontWeight={700}>
                      {totalRevenue.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Chip
                      label={`${(salesGrowthPercentage ?? 0) >= 0 ? '+' : ''}${salesGrowthPercentage ?? 0}%`}
                      size="small"
                      sx={{
                        color: (salesGrowthPercentage ?? 0) >= 0 ? "#1B5E20" : "#d32f2f",
                        bgcolor: (salesGrowthPercentage ?? 0) >= 0 ? "rgba(27, 94, 32, 0.1)" : "rgba(211, 47, 47, 0.1)",
                        fontWeight: 600,
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>
                  <Grid>
                    <Typography variant="body2" color="textSecondary">
                      {t('than last year')}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={3}
              >
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Stack direction="row" gap={3}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          bgcolor: "#1B2351",
                        }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        color="textSecondary"
                      >
                        {t('Revenue')}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
                <CustomSelect value={year} size="small" onChange={handleChange}>
                  {years.map(y => (
                    <MenuItem key={y} value={y}>{y}</MenuItem>
                  ))}
                </CustomSelect>
              </Box>
            </Box>

            {/* Chart Section */}
            <Box sx={{ height: 350, width: "100%" }}>
              <BarChart
                height={350}
                series={[
                  {
                    data: monthlyData,
                    label: t('Revenue'),
                    color: "#1B2351",
                  },
                ]}
                xAxis={[
                  {
                    data: xLabels,
                    scaleType: "band",
                    categoryGap: 0.7,
                    barGap: 0,
                    disableTicks: true,
                  } as any,
                ]}
                yAxis={[
                  {
                    valueFormatter: (value: number) => `${(value / 1000).toFixed(1)}k`,
                    disableTicks: true,
                  },
                ]}
                slotProps={{
                  legend: { hidden: true } as any,
                  bar: {
                    style: {
                      stroke: "none",
                    },
                  },
                }}
                sx={{
                  "& .MuiBarElement-series-SiteB": {
                    rx: 5,
                  },
                  "& .MuiBarElement-series-SiteA": {
                    rx: 0,
                  },
                }}
                margin={{ top: 20, bottom: 40, left: 40, right: 10 }}
                grid={{ horizontal: true }}
              />
            </Box>
          </Box>
        </BlankCard>
      )}
    </>
  );
};
export default SalesPerformance;
