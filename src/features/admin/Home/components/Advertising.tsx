'use client'
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material'
import BlankCard from '@/components/shared/BlankCard'
import { ApexAxisChartSeries, ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { MonthlyEngagement } from '../types'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface AdvertisingProps {
  engagementRate?: number;
  monthlyEngagementTrend?: MonthlyEngagement[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const Advertising = ({ engagementRate, monthlyEngagementTrend }: AdvertisingProps) => {
  const theme = useTheme()

  const { categories, data } = useMemo(() => {
    if (!monthlyEngagementTrend || monthlyEngagementTrend.length === 0) {
      return { categories: [], data: [] }
    }
    return {
      categories: monthlyEngagementTrend.map(m => MONTHS[m.month - 1]),
      data: monthlyEngagementTrend.map(m => m.engagementRate),
    }
  }, [monthlyEngagementTrend])

  const optionsareachart: ApexOptions = {
    chart: {
      type: 'area',
      foreColor: 'pink',
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      height: 370,
    },
    colors: [theme.palette.error.main],
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
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0.1,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      categories,
    },
  }

  const seriesareachart: ApexAxisChartSeries = [
    {
      name: 'Engagement',
      data,
    },
  ]

  const rate = engagementRate ?? 0;

  return (
    <BlankCard>
      <Box p={3}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Stack gap={0.75}>
            <Typography variant='body1' sx={{
              color: theme.palette.blackColor.black60
            }}>
              Engagement Rate
            </Typography>
            <Typography variant='h3'>{rate.toFixed(1)}%</Typography>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Chip
                label={`${rate >= 5 ? '+' : ''}${rate.toFixed(1)}%`}
                size='small'
                sx={{
                  bgcolor: rate >= 5 ? theme.palette.success.light : theme.palette.warning.light,
                  color: rate >= 5 ? theme.palette.success.main : theme.palette.warning.main,
                  width: 'fit-content',
                }}
              />
            </Stack>
          </Stack>
          <Box>
            {categories.length > 0 && (
              <Chart
                options={optionsareachart}
                series={seriesareachart}
                type='area'
                height={80}
                width={'40%'}
              />
            )}
          </Box>
        </Stack>
      </Box>
    </BlankCard>
  )
}

export default Advertising
