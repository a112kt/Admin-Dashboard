'use client'
import { useTranslation } from 'react-i18next'
import BlankCard from '@/components/shared/BlankCard'
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { ApexAxisChartSeries } from 'apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface MonthlyEngagementProps {
  totalLikes?: number;
  likesGrowthPercentage?: number;
}

const MonthlyEngagement = ({ totalLikes, likesGrowthPercentage }: MonthlyEngagementProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  // chart
  // const optionscolumnchart: ApexOptions = {
  //   chart: {
  //     type: 'bar',
  //     foreColor: theme.palette.blackColor.black40,
  //     sparkline: {
  //       enabled: true,
  //     },
  //     toolbar: {
  //       show: false,
  //     },
  //     height: 370,
  //     stacked: true,
  //   },
  //   colors: [theme.palette.secondary.main, theme.palette.success.light],
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       barHeight: '30%',
  //       columnWidth: '45%',
  //       borderRadius: 3,
  //       borderRadiusApplication: 'end', // 'around', 'end'
  //       borderRadiusWhenStacked: 'last', // 'all', 'last'
  //     },
  //   },
  //   stroke: {
  //     width: 1, // controls the gap thickness
  //     colors: ['transparent'], // or background color for clean look
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   legend: {
  //     show: false,
  //   },
  //   grid: {

  //     strokeDashArray: 3,
  //     xaxis: {
  //       lines: {
  //         show: false,
  //       },
  //     },
  //   },
  //   tooltip: {
  //     theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
  //     fillSeriesColor: false,
  //   },
  // }
  // const seriescolumnchart: ApexAxisChartSeries = [
  //   {
  //     name: 'TEAM A',
  //     data: [44, 55, 41, 67, 22],
  //   },
  //   {
  //     name: 'TEAM B',
  //     data: [13, 23, 20, 8, 13],
  //   },
  // ]
  function getTotalLikes(totalLikes: number) {
    if (totalLikes >= 1000) {
      return `${(totalLikes / 1000).toFixed(0)}K`
    }
    return totalLikes
  }

  return (
    <BlankCard>
      <Box p={3} bgcolor={theme.palette.primary.main}>
        <Stack
          direction={'row'}
          alignItems={'end'}
          justifyContent={'space-between'}>
          <Stack gap={6.2}>
            <Box>
              <Typography variant='h5' sx={{ color: 'white' }}>
                {t('Monthly')} <br /> {t('Engagement')}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant='h4'
                fontSize={'1.75rem'}
                sx={{ color: 'white' }}>
                {totalLikes ? `${getTotalLikes(totalLikes)} ${t('Engagement')}` : "—"}
              </Typography>
              {likesGrowthPercentage !== undefined && (
                <Stack direction={'row'} gap={0.6} alignItems={'center'} mt={0.6}>
                  <Typography
                    variant='subtitle1'
                    sx={{ color: theme.palette.whiteColor.white60 }}>
                    {t('vs last month')}
                  </Typography>
                  <Chip
                    label={`${likesGrowthPercentage >= 0 ? '+' : ''}${likesGrowthPercentage}%`}
                    size='small'
                    sx={{
                      color: likesGrowthPercentage >= 0 ? theme.palette.success.main : theme.palette.error.main,
                      bgcolor: likesGrowthPercentage >= 0 ? theme.palette.success.light : theme.palette.error.light,
                    }}
                  />
                </Stack>
              )}
            </Box>
          </Stack>
          <Box sx={{ height: "100px" }}>
            {/* <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type='bar'
              height={80}
              width={'30%'}
            /> */}
          </Box>
        </Stack>

      </Box>
    </BlankCard >
  )
}
export default MonthlyEngagement
