'use client'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material'
import RecordCard from '@/components/shared/RecordCard'

interface PublishedReelsProps {
  count?: number;
}

const PublishedReels = ({ count }: PublishedReelsProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <>
      <RecordCard
        heading={t('Published Reels')}
        value={count !== undefined ? `${count} ${t('Published')}` : `${t('110 Published')}`}
        subvalue={t('All time')}
        percentage='—'
        arrowicon='solar:course-down-line-duotone'
        arrowcolor={theme.palette.error.main}
        arrowbgcolor={theme.palette.error.light}
        producticon='solar:cloud-upload-line-duotone'
        productcolor={theme.palette.success.main}
        productbgcolor={theme.palette.success.light}
      />
    </>
  )
}

export default PublishedReels
