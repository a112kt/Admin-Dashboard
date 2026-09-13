'use client'
import { useTranslation } from 'react-i18next'
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material'
import BlankCard from '@/components/shared/BlankCard'
import { Icon } from '@iconify/react/dist/iconify.js'

interface ReelsGrowthProps {
  viewsGrowthPercentage?: number;
}

const ReelsGrowth = ({ viewsGrowthPercentage }: ReelsGrowthProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const growth = viewsGrowthPercentage ?? 24;

  return (
    <BlankCard>
      <Box p={3} bgcolor={theme.palette.secondary.main}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant='h5' sx={{ color: 'black' }}>
            {t('Reels')} <br /> {t('Growth')}
          </Typography>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            }}>
            <Icon icon={'solar:diagram-up-line-duotone'} />
          </Avatar>
        </Stack>
        <Box mt={5.5}>
          <Typography variant='h2' fontSize={'2rem'} sx={{ color: 'black' }}>
            {growth >= 0 ? '+' : ''}{growth}%
          </Typography>
          <Typography
            variant='subtitle1'
            color="primary">
            {t('Compared to Last Month')}
          </Typography>
        </Box>
      </Box>
    </BlankCard >
  )
}

export default ReelsGrowth
