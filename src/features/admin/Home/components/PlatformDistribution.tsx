'use client'
import {
  Badge,
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import BlankCard from '@/components/shared/BlankCard'
import { ApexAxisChartSeries, ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface PlatformDistributionProps {
  totalRevenue?: number;
  brandSalesRevenue?: number;
  deliveryRevenue?: number;
  revenueGrowthPercentage?: number;
  activeBrands?: number;
  activeUsers?: number;
}

const PlatformDistribution = ({ totalRevenue, brandSalesRevenue, deliveryRevenue, revenueGrowthPercentage, activeBrands, activeUsers }: PlatformDistributionProps) => {
  const theme = useTheme()

  const total = (brandSalesRevenue ?? 0) + (deliveryRevenue ?? 0);
  const brandPct = total > 0 ? Math.round((brandSalesRevenue ?? 0) / total * 100) : 65;
  const deliveryPct = total > 0 ? 100 - brandPct : 35;

  // chart
  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'bar',
      height: 16,
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
    ],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 3,
        borderRadiusApplication: 'around', // 'around', 'end'
        borderRadiusWhenStacked: 'all', // 'all', 'last'
      },
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 350,
          },
        },
      },
      {
        breakpoint: 430,
        options: {
          chart: {
            width: 250,
          },
        },
      },
      {
        breakpoint: 370,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  }
  const seriescolumnchart: ApexAxisChartSeries = [
    { name: 'Brand Sales', data: [brandPct] },
    { name: 'Delivery Revenue', data: [deliveryPct] },
  ]

  const growth = revenueGrowthPercentage ?? 15.7;
  const growthColor = growth >= 0 ? theme.palette.success.main : theme.palette.error.main;
  const growthBg = growth >= 0 ? theme.palette.success.light : theme.palette.error.light;

  return (
    <BlankCard sx={{ height: '100%' }}>
      <Box p={3}>
        <Typography variant='h5'>Platform Distribution</Typography>
        <Typography variant='h3' mt={2} lineHeight={'140%'}>
          ${totalRevenue?.toLocaleString() ?? "—"} Revenue
        </Typography>
        <Stack mt={0.75} direction={'row'} alignItems={'center'} gap={0.5}>
          <Chip
            label={`${growth >= 0 ? '+' : ''}${growth}%`}
            size='small'
            sx={{
              color: growthColor,
              bgcolor: growthBg,
              width: 'fit-content',
            }}
          />
          <Typography
            variant='body1'
            fontWeight={500}
            sx={{
              color: 'textprimary'
            }}>
            compared to last month
          </Typography>
        </Stack>
        {/* chart */}
        <Box mt={2}>
          <Typography variant='body1' fontWeight={500}>
            Revenue Source Distribution
          </Typography>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type='bar'
            height={26}
            width={'100%'}
          />
        </Box>
        {/* Records */}
        <Box mt={2}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            my={1.25}>
            <Stack direction={'row'} alignItems={'center'} gap={1.5}>
              <Badge color='primary' variant='dot' />
              <Typography variant='body1' fontWeight={500}>
                Brand Sales
              </Typography>
            </Stack>
            {/*  */}
            <Stack direction={'row'} alignItems={'center'} gap={0.5}>
              <Typography variant='body1'>${(brandSalesRevenue ?? 0)?.toLocaleString()}</Typography>
              <Typography variant='body2' sx={{ color: theme.palette.blackColor.black60 }}>
                ({brandPct}%)
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            my={1.25}>
            <Stack direction={'row'} alignItems={'center'} gap={1.5}>
              <Badge color='warning' variant='dot' />
              <Typography variant='body1' fontWeight={500}>
                Delivery Revenue
              </Typography>
            </Stack>
            {/*  */}
            <Stack direction={'row'} alignItems={'center'} gap={0.5}>
              <Typography variant='body1'>${(deliveryRevenue ?? 0)?.toLocaleString()}</Typography>
              <Typography variant='body2' sx={{ color: theme.palette.blackColor.black60 }}>
                ({deliveryPct}%)
              </Typography>
            </Stack>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="body2" color="textSecondary">Active Brands</Typography>
              <Typography variant="h6">{activeBrands?.toLocaleString() ?? "—"}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">Active Users</Typography>
              <Typography variant="h6">{activeUsers?.toLocaleString() ?? "—"}</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </BlankCard>
  )
}

export default PlatformDistribution
