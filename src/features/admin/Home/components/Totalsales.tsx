"use client";

import {
  Box,
  Chip,
  Divider,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import BlankCard from "@/components/shared/BlankCard";
import React from "react";
import { Icon } from "@iconify/react";
// chart
import { ApexAxisChartSeries, ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import CustomSelect from "@/components/ui/forms/theme-elements/CustomSelect";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TotalsalesProps {
  totalRevenue?: number;
  revenueTrend?: Array<{ year: number; month: number; revenue: number }>;
  brandSalesRevenue?: number;
  deliveryRevenue?: number;
  revenueGrowthPercentage?: number;
}

const Totalsales = ({ totalRevenue, revenueTrend, brandSalesRevenue, deliveryRevenue, revenueGrowthPercentage }: TotalsalesProps) => {
  const theme = useTheme();

  const [year, setYear] = React.useState(new Date().getFullYear().toString());

  const handleChange = (event: SelectChangeEvent<string>) => {
    setYear(event.target.value);
  };

  const monthlyLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
  ];

  const monthlyData = monthlyLabels.map((_, idx) => {
    const entry = revenueTrend?.find(r => r.month === idx + 1 && r.year.toString() === year);
    return entry ? Math.round(entry.revenue / 100) : 0;
  });

  const years = revenueTrend
    ? [...new Set(revenueTrend.map(r => r.year))].sort((a, b) => b - a).map(String)
    : [new Date().getFullYear().toString()];

  const optionscolumnchart: ApexOptions = {
    chart: {
      height: 215,
      type: 'line',
      offsetX: -5,
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 2],
    },
    grid: {
      show: false,
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 1,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    colors: [theme.palette.primary.light, theme.palette.primary.main],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '80%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        [''],
        ['Jan'],
        [''],
        [''],
        ['Feb'],
        [''],
        [''],
        ['Mar'],
        [''],
        [''],
        ['Apr'],
        [''],
        [''],
        ['May'],
        [''],
        [''],
        ['Jun'],
        [''],
        [''],
        ['Jul'],
        [''],
        [''],
        ['Aug'],
        [''],
        [''],
        ['Sep'],
        [''],
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: 'dark',
    },
    legend: {
      show: false,
    },
  };

  const seriescolumnchart: ApexAxisChartSeries = [
    {
      name: "Revenue",
      type: "column",
      data: monthlyData.length ? monthlyData : [71, 71, 43, 72, 71, 82, 108, 108, 144, 142, 126, 108, 93, 79, 79, 79, 64, 98, 102, 125, 137, 137, 102, 102, 74],
    },
    {
      name: "Trend",
      type: "line",
      data: monthlyData.length ? monthlyData : [71, 71, 43, 72, 71, 82, 108, 108, 144, 142, 126, 108, 93, 79, 79, 79, 64, 98, 102, 125, 137, 137, 102, 102, 74],
    },
  ];

  const revenueGrowth = revenueGrowthPercentage ?? 22;
  const growthColor = revenueGrowth >= 0 ? theme.palette.success.main : theme.palette.error.main;
  const growthBg = revenueGrowth >= 0 ? theme.palette.success.light : theme.palette.error.light;

  return (
    <>
      <BlankCard sx={{ height: "100%" }} >
        <Box p={3}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box>
              <Typography variant="h6" fontWeight={400} sx={{ color: theme.palette.blackColor.black60 }}>
                Total Platform Revenue
              </Typography>
              <Stack
                direction={{ sm: "row" }}
                alignItems={{ sm: "center" }}
                gap={1}
                mt={0.75}
              >
                <Typography variant="h3">${totalRevenue?.toLocaleString() ?? "—"}</Typography>
                <Chip
                  label={`${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth}%`}
                  size="small"
                  sx={{
                    bgcolor: growthBg,
                    color: growthColor,
                    width: "fit-content",
                  }}
                />
                <Typography variant="body2" sx={{ color: theme.palette.blackColor.black40 }}>
                  compared to last month
                </Typography>
              </Stack>
            </Box>
            <Box>
              <CustomSelect
                variant="outlined"
                labelId="year"
                id="year"
                value={year}
                size="small"
                onChange={handleChange}
                sx={{
                  bgcolor: theme.palette.mode === "dark" ? "black" : "white",
                  padding: "3px 6px",
                }}
              >
                {years.map(y => (
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                ))}
              </CustomSelect>
            </Box>
          </Stack>
          <Box py={2.5}>
            <Divider />
          </Box>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} alignItems={"center"} gap={1.5}>
              <Icon icon={"solar:global-line-duotone"} width={20} height={20} />
              <Typography variant="body1" fontWeight={500}>
                Brand Orders
              </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={0.75}>
              <Typography variant="body1" fontWeight={500}>
                ${brandSalesRevenue?.toLocaleString() ?? "—"}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mt={1.5}
          >
            <Stack direction={"row"} alignItems={"center"} gap={1.5}>
              <Icon
                icon={"solar:home-angle-line-duotone"}
                width={20}
                height={20}
              />
              <Typography variant="body1" fontWeight={500}>
                Delivery Revenue
              </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={0.75}>
              <Typography variant="body1" fontWeight={500}>
                ${deliveryRevenue?.toLocaleString() ?? "—"}
              </Typography>
            </Stack>
          </Stack>
          <Box sx={{ height: '220px' }}>
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type='line'
              height={220}
              width={"100%"}
            />
          </Box>
        </Box >
      </BlankCard >
    </>
  );
};
export default Totalsales;
