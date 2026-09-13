'use client'

import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      spacing={0.5}
      mt={3}
    >
      <Typography variant="body1" color="text.secondary">
        {t('© {{year}} by Alluvo Team.', { year })}
      </Typography>
      <Typography variant="body2" color="text.disabled">
        {t('We help you make your local brand better.')}
      </Typography>
    </Stack>
  )
}
export default Footer

