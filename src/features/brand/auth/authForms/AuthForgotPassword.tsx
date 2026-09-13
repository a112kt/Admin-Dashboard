'use client'
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import { useTranslation } from 'react-i18next';

export default function AuthForgotPassword() {
  const { t } = useTranslation();
  return (
    <>
      <Stack mt={4} spacing={2}>
        <CustomFormLabel htmlFor="reset-email">{t('Email')}</CustomFormLabel>
        <CustomTextField id="reset-email" variant="outlined" fullWidth />
        <Button
          color="secondary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          href="/"
        >
          {t('Forgot Password')}
        </Button>
        <Button
          color="secondary"
          size="large"
          fullWidth
          component={Link}
          href="/auth/auth1/login"
        >
          {t('Back to Login')}
        </Button>
      </Stack>
    </>
  )
};
