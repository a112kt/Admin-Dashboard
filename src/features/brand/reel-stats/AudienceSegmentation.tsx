'use client'
import { useTranslation } from 'react-i18next'
import { CustomizerContext } from '@/context/customizerContext'
import DashboardCard from '@/components/shared/DashboardCard'
import { Stack, Box, Typography, Chip, useTheme } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import type { AudienceStats } from './types'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface AudienceSegmentationProps {
  audienceStats?: AudienceStats | null;
}

const AudienceSegmentation = ({ audienceStats }: AudienceSegmentationProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const {
    activeTheme,
  } = useContext(CustomizerContext)
  // chart
  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'donut',
      foreColor: theme.palette.blackColor.black40,
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.secondary.main,
    ],
    labels: [t('Followers'), t('Non-Followers'), t('New Users')],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,

        donut: {
          size: '70%',
          background: 'transparent',
          labels: {
            show: true,
            total: {
              show: true,
            },
          },
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  }
  const followers = audienceStats?.followersCount ?? 0;
  const nonFollowers = audienceStats?.nonFollowersCount ?? 0;
  const newUsers = audienceStats?.newUsersCount ?? 0;
  const total = followers + nonFollowers + newUsers;
  const followersPct = total > 0 ? Math.round((followers / total) * 100) : 0;
  const nonFollowersPct = total > 0 ? Math.round((nonFollowers / total) * 100) : 0;
  const newUsersPct = total > 0 ? Math.round((newUsers / total) * 100) : 0;

  const seriescolumnchart: number[] = [followers, nonFollowers, newUsers]

  return (
    <DashboardCard title={t('Audience Segmentation')}>
      <>
        <Box display={'flex'} justifyContent={'center'} height={180}>
          <Chart
            key={activeTheme}
            options={optionscolumnchart}
            series={seriescolumnchart}
            type='donut'
            height={150}
            width={'100%'}
          />
        </Box>
        <Stack gap={1.5} mt={3}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Box
                sx={{
                  height: '14px',
                  width: '3px',
                  bgcolor: theme.palette.primary.main,
                }}
              />
              <Typography variant='body1' fontWeight={500}>
                {t('Followers')}
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={0.75}>
              <Typography variant='body1' fontWeight={600}>
                {followersPct}%
              </Typography>
              <Chip
                label={`${(audienceStats?.followersGrowth ?? 0) >= 0 ? '+' : ''}${audienceStats?.followersGrowth ?? 0}%`}
                size='small'
                sx={{
                  color: (audienceStats?.followersGrowth ?? 0) >= 0 ? theme.palette.success.main : theme.palette.error.main,
                  bgcolor: (audienceStats?.followersGrowth ?? 0) >= 0 ? theme.palette.success.light : theme.palette.error.light,
                }}
              />
            </Stack>
          </Stack>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Box
                sx={{
                  height: '14px',
                  width: '3px',
                  bgcolor: theme.palette.warning.main,
                }}
              />
              <Typography variant='body1' fontWeight={500}>
                {t('Non-Followers')}
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={0.75}>
              <Typography variant='body1' fontWeight={600}>
                {nonFollowersPct}%
              </Typography>
              <Chip
                label={`${(audienceStats?.nonFollowersGrowth ?? 0) >= 0 ? '+' : ''}${audienceStats?.nonFollowersGrowth ?? 0}%`}
                size='small'
                sx={{
                  color: (audienceStats?.nonFollowersGrowth ?? 0) >= 0 ? theme.palette.success.main : theme.palette.error.main,
                  bgcolor: (audienceStats?.nonFollowersGrowth ?? 0) >= 0 ? theme.palette.success.light : theme.palette.error.light,
                }}
              />
            </Stack>
          </Stack>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Box
                sx={{
                  height: '14px',
                  width: '3px',
                  bgcolor: theme.palette.secondary.main,
                }}
              />
              <Typography variant='body1' fontWeight={500}>
                {t('New Users')}
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={0.75}>
              <Typography variant='body1' fontWeight={600}>
                {newUsersPct}%
              </Typography>
              <Chip
                label={`${(audienceStats?.newUsersGrowth ?? 0) >= 0 ? '+' : ''}${audienceStats?.newUsersGrowth ?? 0}%`}
                size='small'
                sx={{
                  color: (audienceStats?.newUsersGrowth ?? 0) >= 0 ? theme.palette.success.main : theme.palette.error.main,
                  bgcolor: (audienceStats?.newUsersGrowth ?? 0) >= 0 ? theme.palette.success.light : theme.palette.error.light,
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </>
    </DashboardCard>
  )
}

export default AudienceSegmentation
