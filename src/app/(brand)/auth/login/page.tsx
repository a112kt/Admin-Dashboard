"use client";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import NewLogo from "@/components/layout/shared/logo/NewLogo";
import Link from "next/link";
import Footer from "@/components/layout/shared/footer/Footer";
import PageContainer from "@/components/ui/container/PageContainer";
import AuthLogin from "@/features/brand/auth/authForms/AuthLogin";
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation();
  return (
    <PageContainer title="Login Page" description="this is Login page">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        {/* Login content */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 1, sm: 2 },
            overflow: "hidden",
            overflowY: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              // maxWidth: 1040,
              maxWidth: { xs: "100%", sm: 540, md: 920, lg: 1040 },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              bgcolor: "background.paper",
              overflow: "hidden",
              height: "100%",
              maxHeight: "100vh",
            }}
          >
            {/* Left Side */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 2, sm: 4, lg: 7 },
                gap: 2,
                boxShadow: "0px 3px 6px 0px #0000000A",
              }}
            >
              <Box>
                <NewLogo />
              </Box>
              <Box sx={{ overflowY: "auto", maxHeight: "100%", minHeight: "500px", padding: "10px" }}>
                <AuthLogin
                  title={t('Welcome to Alluvo')}
                  // subtext={
                  //   <Typography
                  //     variant="subtitle1"
                  //     color="textSecondary"
                  //     mb={1}
                  //   >
                  //     {t('Your Admin Dashboard')}
                  //   </Typography>
                  // }
                  subtitle={
                    <Stack direction="row" spacing={1} mt={3}>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="500"
                      >
                        {t('New to Alluvo?')}
                      </Typography>
                      <Typography
                        component={Link}
                        href="/auth/register"
                        fontWeight="500"
                        sx={{
                          textDecoration: "none",
                          color: "primary.main",
                        }}
                      >
                        {t('Create an account')}
                      </Typography>
                    </Stack>
                  }
                />
              </Box>
            </Box>

            {/* Right Side Image */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                position: "relative",
                display: { xs: "none", md: "block" },
              }}
            >
              <Image
                src="/images/backgrounds/largeLogo.png"
                alt="Login Visual"
                layout="fill"
                objectFit="cover"
                priority
              />
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            flexShrink: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            pb: { xs: 2 },
            px: { xs: 2 },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 1236 }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
}
