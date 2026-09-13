'use client'
import { useTranslation } from 'react-i18next'
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material'
import BlankCard from '@/components/shared/BlankCard'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { ApexAxisChartSeries } from 'apexcharts'
import type { DailyEngagement } from './types'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface UserInteractionProps {
  dailyEngagement?: DailyEngagement | null;
}

const UserInteraction = ({ dailyEngagement }: UserInteractionProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  // chart
  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'bar',
      foreColor: theme.palette.mode == 'dark' ? theme.palette.whiteColor.white40 : theme.palette.blackColor.black40,

      toolbar: {
        show: false,
      },
      height: 370,
      stacked: true,
    },
    colors: [theme.palette.secondary.main, theme.palette.primary.main, theme.palette.warning.main],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '20%',
        columnWidth: '45%',
        borderRadius: 0,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
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
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: {
        show: false,
      },
      labels: {
        rotate: 0,
        hideOverlappingLabels: false,
        style: {
          fontSize: '10px',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  }

  const defaultDaily = [0, 0, 0, 0, 0, 0, 0];
  const viewsData = dailyEngagement?.dailyViews ?? defaultDaily;
  const likesData = dailyEngagement?.dailyLikes ?? defaultDaily;
  const commentsData = dailyEngagement?.dailyComments ?? defaultDaily;

  const seriescolumnchart: ApexAxisChartSeries = [
    {
      name: t('Views'),
      data: viewsData,
    },
    {
      name: t('Likes'),
      data: likesData,
    },
    {
      name: t('Comments'),
      data: commentsData,
    },
  ]

  return (
    <BlankCard sx={{ height: '100%' }}>
      <Box p={3}>
        <Typography variant='h5'>{t('User Interaction')}</Typography>
        <Box>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type='bar'
            height={260}
            width={'100%'}
          />
        </Box>
        <Box>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            flexWrap="wrap"
            gap={3}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Avatar sx={{ width: 8, height: 8, bgcolor: theme.palette.secondary.main, svg: { display: 'none' } }} />
                <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? theme.palette.whiteColor.white60 : theme.palette.blackColor.black60 }}>
                  {t('Views')}
                </Typography>
              </Stack>
              <Typography variant='h6'>{dailyEngagement?.totalViews.toLocaleString() ?? 0}</Typography>
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Avatar sx={{ width: 8, height: 8, bgcolor: theme.palette.primary.main, svg: { display: 'none' } }} />
                <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? theme.palette.whiteColor.white60 : theme.palette.blackColor.black60 }}>
                  {t('Likes')}
                </Typography>
              </Stack>
              <Typography variant='h6'>{dailyEngagement?.totalLikes.toLocaleString() ?? 0}</Typography>
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Avatar sx={{ width: 8, height: 8, bgcolor: theme.palette.warning.main, svg: { display: 'none' } }} />
                <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? theme.palette.whiteColor.white60 : theme.palette.blackColor.black60 }}>
                  {t('Comments')}
                </Typography>
              </Stack>
              <Typography variant='h6'>{dailyEngagement?.totalComments.toLocaleString() ?? 0}</Typography>
            </Box>
            {/* <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Avatar sx={{ width: 8, height: 8, bgcolor: theme.palette.grey[400], svg: { display: 'none' } }} />
                <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? theme.palette.whiteColor.white60 : theme.palette.blackColor.black60 }}>
                  Shares
                </Typography>
              </Stack>
              <Typography variant='h6'>--</Typography>
            </Box> */}
          </Stack>
        </Box>
      </Box>
    </BlankCard>
  )
}

export default UserInteraction
