'use client'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material'
import RecordCard from '@/components/shared/RecordCard'

interface EngagementRateProps {
  engagementRate?: number | null;
}

const EngagementRate = ({ engagementRate }: EngagementRateProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const displayValue = engagementRate != null ? `${engagementRate}%` : '--';

  return (
    <>
      <RecordCard
        heading={t('Engagement Rate')}
        value={displayValue}
        subvalue={t('Overall engagement')}
        percentage='--'
        arrowicon='solar:course-up-line-duotone'
        arrowcolor={theme.palette.success.main}
        arrowbgcolor={theme.palette.success.light}
        producticon='solar:heart-line-duotone'
        productcolor={theme.palette.warning.main}
        productbgcolor={theme.palette.warning.light}
      />
    </>
  )
}

export default EngagementRate
