'use client'
import { Grid, Box, Card, Typography, styled } from '@mui/material';
import PageContainer from '@/components/ui/container/PageContainer';
import AuthForgotPassword from '@/features/brand/auth/authForms/AuthForgotPassword';
import NewLogo from '@/components/layout/shared/logo/NewLogo';
import Footer from '@/components/layout/shared/footer/Footer';
import { useTranslation } from 'react-i18next';



export default function ForgotPassword2() {
  const { t } = useTranslation();


  return (



    <PageContainer title="Forgot Password Page" description="this is Sample page">
      <Box
      >
        <Grid container spacing={0} justifyContent="center" sx={{ minHeight: "100vh", flexDirection: "column" }}>
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            size={{
              xs: 12,
            }}
            sx={{ flex: 1, p: { xs: 2, sm: 3 }, }}
          >
            <Card sx={{ width: '100%', maxWidth: "450px", boxShadow: '0px 3px 6px 0px #0000000A', p: { xs: 2, sm: 3 }, }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <NewLogo />
              </Box>
              <Typography
                color="textSecondary"
                textAlign="center"
                variant="subtitle2"
                fontWeight="400"
              >
                {t('Please enter the email address associated with your account and We will email you a link to reset your password.')}
              </Typography>
              <AuthForgotPassword />
            </Card>
          </Grid>
          <Grid >
            <Box
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '100%', md: 920, lg: 1200 },
                m: 'auto',
                px: { xs: 2, sm: 3 },
                pb: { xs: 3 },
              }}
            >
              <Footer />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>


  );
};

