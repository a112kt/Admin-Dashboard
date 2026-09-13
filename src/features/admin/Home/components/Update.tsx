'use client'
import { Box, Stack, styled, Typography, useTheme } from '@mui/material'
import BlankCard from '@/components/shared/BlankCard'
import { useTranslation } from 'react-i18next'

interface UpdateProps {
  ordersGrowthPercentage?: number;
  revenueGrowthPercentage?: number;
}

const Update = ({ ordersGrowthPercentage, revenueGrowthPercentage }: UpdateProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const now = new Date()
  const monthName = now.toLocaleString('default', { month: 'long' })
  const year = now.getFullYear()
  const formattedDate = `${monthName} ${year}`

  const Lightwhitedot = styled('span')(() => ({
    position: 'relative',
    display: 'inline-block',
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: theme.palette.whiteColor.white40,
  }))

  const PulseDot = styled('span')(({ theme }) => ({
    position: 'relative',
    display: 'inline-block',
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'red',
    marginRight: theme.spacing(1),
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: -0.25,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      backgroundColor: 'red',
      animation: 'pulse 1.5s infinite ease-in-out',
      opacity: 0.6,
    },
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(1)',
        opacity: 0.7,
      },
      '50%': {
        transform: 'scale(1.8)',
        opacity: 0.5,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 0,
      },
    },
  }))

  const Highlightxt = styled('span')(() => ({
    color: theme.palette.secondary.main,
  }))

  const ordersGrowth = ordersGrowthPercentage ?? 0
  const revenueGrowth = revenueGrowthPercentage ?? 0

  return (
    <BlankCard>
      <Box p={3} bgcolor='primary.main'>
        <Stack
          direction={{ sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent={'space-between'}
          gap={3}>
          <Box>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Stack direction={'row'} alignItems={'center'}>
                <PulseDot />
                <Typography
                  variant='body1'
                  fontWeight={500}
                  sx={{ color: 'white' }}>
                  {t('Update')}
                </Typography>
              </Stack>
              <Lightwhitedot />
              <Typography
                variant='body2'
                fontWeight={500}
                sx={{ color: theme.palette.whiteColor.white40 }}>
                {formattedDate}
              </Typography>
            </Stack>
            <Typography variant='h5' sx={{ color: 'white' }} mt={1}>
              {t('Orders')} <Highlightxt>{ordersGrowth >= 0 ? '+' : ''}{ordersGrowth}%</Highlightxt> {t('and')} {t('Revenue')} <Highlightxt>{revenueGrowth >= 0 ? '+' : ''}{revenueGrowth}%</Highlightxt> {t('this month')}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </BlankCard>
  )
}

export default Update
