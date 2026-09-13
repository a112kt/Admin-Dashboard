'use client'
import { useTranslation } from 'react-i18next'
import React from 'react'
import {
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import BlankCard from '@/components/shared/BlankCard'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { ApexAxisChartSeries } from 'apexcharts'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ReelsPerformanceOverTimeProps {
  monthlyViews?: Array<{ month: string; count: number }>;
  monthlyLikes?: Array<{ month: string; count: number }>;
}

const niceMax = (n: number): number => {
  if (n <= 0) return 10;
  const mag = Math.pow(10, Math.floor(Math.log10(n)));
  const norm = n / mag;
  return (norm <= 1 ? mag : norm <= 2 ? 2 * mag : norm <= 5 ? 5 * mag : 10 * mag);
};

const fmt = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${Math.round(v)}`;

const ReelsPerformanceOverTime = ({ monthlyViews, monthlyLikes }: ReelsPerformanceOverTimeProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const now = new Date();
  const currentMonth = now.getMonth();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonths = monthNames.slice(0, currentMonth + 1);

  const dataMap = new Map(monthlyViews?.map(m => [m.month, Math.round(m.count)]) ?? []);
  const likesMap = new Map(monthlyLikes?.map(m => [m.month, Math.round(m.count)]) ?? []);

  const allViews = fullMonths.map(m => dataMap.get(m) ?? 0);
  const allLikes = fullMonths.map(m => likesMap.get(m) ?? 0);
  const allMonths = fullMonths;

  const viewsMax = Math.max(...allViews);
  const likesMax = Math.max(...allLikes);
  const scaleFactor = likesMax > 0 ? viewsMax / likesMax : 1;
  const scaledLikes = allLikes.map(l => Math.round(l * scaleFactor));

  const combined = [...allViews, ...scaledLikes];
  const dataMin = Math.min(...combined);
  const dataMax = Math.max(...combined);
  const yMin = Math.max(0, Math.floor(dataMin * 0.85));
  const yMax = niceMax(dataMax * 1.1);

  const chartSeries: ApexAxisChartSeries = [
    { name: t('Total Views'), data: allViews },
    { name: t('Engagement'), data: scaledLikes },
  ]

  const totalViews = allViews.reduce((a, b) => a + b, 0) || 0;
  const totalLikes = allLikes.reduce((a, b) => a + b, 0) || 0;

  const optionssplinechart: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.3,
        opacityTo: 0,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
      y: {
        formatter(value: number, opts?: any) {
          if (opts?.seriesIndex === 1) {
            return `${allLikes[opts.dataPointIndex]}`;
          }
          return `${Math.round(value)}`;
        },
      },
    },
    xaxis: {
      categories: allMonths.length ? allMonths : [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '0.75rem',
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      min: yMin,
      max: yMax,
      tickAmount: 5,
      labels: {
        formatter(value: number) {
          return fmt(value);
        },
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '0.75rem',
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: false,
    },
    legend: {
      show: true,
    },
  }

  return (
    <BlankCard sx={{ height: '80%' }}>
      <Box p={3}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Typography variant='h5'>{t('Reels Performance Over The Year')}</Typography>
        </Stack>
        <Box mt={2}>
          <Stack direction={'row'} gap={2.5}>
            <Box>
              <Typography
                variant='body2'
                sx={{
                  color: theme.palette.blackColor.black60,
                }}>
                {t('Total Views')}
              </Typography>
              <Typography variant='h3' mt={0.5}>
                {totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews}
              </Typography>
            </Box>
            <Divider orientation='vertical' flexItem />
            <Box>
              <Typography
                variant='body2'
                sx={{
                  color: theme.palette.blackColor.black60,
                }}>
                {t('Engagement')}
              </Typography>
              <Typography variant='h3' mt={0.5}>
                {totalLikes >= 1000 ? `${(totalLikes / 1000).toFixed(1)}k` : totalLikes}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ height: '250px' }}>
          <Chart
            options={optionssplinechart}
            series={chartSeries}
            type='area'
            height={250}
            width={'100%'}
          />
        </Box>
      </Box>
    </BlankCard>
  )
}

export default ReelsPerformanceOverTime
