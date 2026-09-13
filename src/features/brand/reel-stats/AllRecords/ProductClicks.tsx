'use client'
import { useTranslation } from 'react-i18next'
import RecordCard from '@/components/shared/RecordCard'
import { useTheme } from '@mui/material'

interface ProductClicksProps {
  productViewsCount?: number | null;
}

const ProductClicks = ({ productViewsCount }: ProductClicksProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const displayValue = productViewsCount != null ? productViewsCount.toLocaleString() + t(' Clicks') : '--';

  return (
    <>
      <RecordCard
        heading={t('Product Clicks')}
        value={displayValue}
        subvalue={t('Total product views')}
        percentage='--'
        arrowicon='solar:course-up-line-duotone'
        arrowcolor={theme.palette.success.main}
        arrowbgcolor={theme.palette.success.light}
        producticon='solar:cursor-square-line-duotone'
        productcolor={theme.palette.purple.main}
        productbgcolor={theme.palette.purple.light}
      />
    </>
  )
}

export default ProductClicks
