'use client'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material'
import RecordCard from '@/components/shared/RecordCard'

interface TotalReelsProps {
  count?: number;
}

const TotalReels = ({ count }: TotalReelsProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <>
      <RecordCard
        heading={t('Total Reels')}
        value={count !== undefined ? `${count} ${t('Reels')}` : `${t('120 Reels')}`}
        subvalue={t('All time')}
        percentage='—'
        arrowicon='solar:course-up-line-duotone'
        arrowcolor={theme.palette.success.main}
        arrowbgcolor={theme.palette.success.light}
        producticon='solar:videocamera-record-line-duotone'
        productcolor={theme.palette.primary.main}
        productbgcolor={theme.palette.primary.light}
      />
    </>
  )
}

export default TotalReels
