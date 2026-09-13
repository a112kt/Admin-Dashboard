'use client'
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material'
import BlankCard from '@/components/shared/BlankCard'
import { ApexAxisChartSeries, ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface TotalSaleProps {
  totalOrders?: number;
  monthlyOrdersTrend?: Array<{ year: number; month: number; count: number }>;
  ordersGrowthPercentage?: number;
}

const TotalSale = ({ totalOrders, monthlyOrdersTrend, ordersGrowthPercentage }: TotalSaleProps) => {
  const theme = useTheme()

  const chartData = monthlyOrdersTrend?.map(m => m.count) ?? [44, 55, 41, 67, 22, 34, 48, 59, 30, 40];

  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'bar',
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      height: 370,
      stacked: true,
    },
    colors: [theme.palette.primary.main, theme.palette.primary.light],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '30%',
        columnWidth: '55%',
        borderRadius: 4,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  }
  const seriescolumnchart: ApexAxisChartSeries = [
    {
      name: 'Orders',
      data: chartData,
    },
    {
      name: 'Trend',
      data: chartData.map(v => Math.round(v * 0.6)),
    },
  ]

  const growth = ordersGrowthPercentage ?? 18;
  const growthColor = growth >= 0 ? theme.palette.success.main : theme.palette.error.main;
  const growthBg = growth >= 0 ? theme.palette.success.light : theme.palette.error.light;

  return (
    <BlankCard>
      <Box p={3}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Stack gap={0.75}>
            <Typography variant='body1' sx={{ color: theme.palette.blackColor.black60 }}>
              Total Orders
            </Typography>
            <Typography variant='h3'>{totalOrders?.toLocaleString() ?? "—"}</Typography>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Chip
                label={`${growth >= 0 ? '+' : ''}${growth}%`}
                size='small'
                sx={{
                  bgcolor: growthBg,
                  color: growthColor,
                  width: 'fit-content',
                }}
              />
            </Stack>
          </Stack>
          <Box>
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type='bar'
              height={80}
              width={'40%'}
            />
          </Box>
        </Stack>
      </Box>
    </BlankCard>
  )
}

export default TotalSale
