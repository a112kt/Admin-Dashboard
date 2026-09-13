'use client'
import { useTranslation } from 'react-i18next'
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material'
import BlankCard from '@/components/shared/BlankCard'
import { Icon } from '@iconify/react/dist/iconify.js'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { ApexAxisChartSeries } from 'apexcharts'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface TotalViewsProps {
  totalViews?: number;
  viewsGrowthPercentage?: number;
  monthlyViews?: Array<{ month: string; count: number }>;
}

const TotalViews = ({ totalViews, viewsGrowthPercentage, monthlyViews }: TotalViewsProps) => {
  //   color
  const theme = useTheme()
  const { t } = useTranslation()

  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      stacked: false,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.blackColor.black10],
    stroke: {
      curve: 'monotoneCubic',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.3,
        opacityTo: 0.1,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    yaxis: {
      min: 0,
      max: 100,
    },
  }
  const chartData = monthlyViews?.map(m => m.count) || [];
  const seriescolumnchart: ApexAxisChartSeries = [
    {
      name: t('Views'),
      data: chartData.length ? chartData : [2, 10, 50, 40, 70, 30, 35, 75, 90, 55, 70, 60, 80, 95, 100],
    },
  ]
  function getTotalView(views: number) {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}${t('K Views')}`
    } else {
      return `${views} ${t('Views')}`
    }

  }

  return (
    <BlankCard sx={{ height: '100%' }}>
      <Box p={3}>
        <Stack
          direction={'row'}
          alignItems={'end'}
          justifyContent={'space-between'}
          gap={3}>
          <Box>
            <Stack gap={6.6}>
              <Box>
                <Typography
                  variant='subtitle1'
                  sx={{
                    color: theme.palette.blackColor.black60,
                  }}>
                  {t('Total Views')}
                </Typography>
                <Typography variant='h5'>{t('Total Reach')}</Typography>
              </Box>
              <Box>
                <Typography variant='h3' fontSize={'1.75rem'}>
                  {totalViews ? getTotalView(totalViews) : "—"}
                </Typography>
                {viewsGrowthPercentage !== undefined && (
                  <Stack mt={1} direction={'row'} alignItems={'center'} gap={0.5}>
                    <Avatar
                      sx={{
                        width: 20,
                        height: 20,
                        color: viewsGrowthPercentage >= 0 ? theme.palette.success.main : theme.palette.error.main,
                        bgcolor: viewsGrowthPercentage >= 0 ? theme.palette.success.light : theme.palette.error.light,
                      }}>
                      <Icon
                        icon={viewsGrowthPercentage >= 0 ? 'solar:arrow-up-line-duotone' : 'solar:arrow-down-line-duotone'}
                        width={14}
                        height={14}
                      />
                    </Avatar>
                    <Typography
                      variant='body2'
                      fontWeight={500}
                      color={viewsGrowthPercentage >= 0 ? theme.palette.success.main : theme.palette.error.main}>
                      {viewsGrowthPercentage >= 0 ? '+' : ''}{viewsGrowthPercentage}%
                    </Typography>
                  </Stack>
                )}
              </Box>
            </Stack>
          </Box>
          <Box sx={{ height: "100px" }}>
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type='area'
              height={90}
              width={'80%'}
            />
          </Box>
        </Stack>
      </Box>
    </BlankCard>
  )
}

export default TotalViews
