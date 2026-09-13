'use client'
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material'
import BlankCard from '@/components/shared/BlankCard'
import { ApexAxisChartSeries, ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface TotalProfitProps {
  totalReelViews?: number;
  totalReels?: number;
}

const TotalProfit = ({ totalReelViews, totalReels }: TotalProfitProps) => {
  const theme = useTheme()
  // chart
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
    },
    colors: [theme.palette.secondary.main],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '30%',
        columnWidth: '75%',
        borderRadius: 3,
        borderRadiusApplication: 'end', // 'around', 'end'
        borderRadiusWhenStacked: 'all', // 'all', 'last'
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
      name: 'Views',
      data: totalReels ? [totalReelViews ?? 0] : [44, 55, 41, 67, 22, 34, 48],
    },
  ]

  return (
    <BlankCard>
      <Box p={3}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Stack gap={0.75}>
            <Typography variant='body1' sx={{ color: theme.palette.blackColor.black60 }}>
              Total Reels Views
            </Typography>
            <Typography variant='h3'>{totalReelViews?.toLocaleString() ?? "—"}</Typography>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Chip
                label={`${totalReels ?? 0} Reels`}
                size='small'
                sx={{
                  bgcolor: theme.palette.primary.light,
                  color: theme.palette.primary.main,
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

export default TotalProfit
