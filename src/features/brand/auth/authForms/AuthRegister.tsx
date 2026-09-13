"use client"
import { Box, Typography, Button, Divider, Alert } from "@mui/material";

import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { registerType } from "@/features/brand/auth/types/auth";
import AuthSocialButtons from "./AuthSocialButtons";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { useTranslation } from 'react-i18next';

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // try {
    //   await signup(email, password, userName);
    //   router.push("/auth/auth1/login");
    // } catch (err: any) {
    //   setError(err.message);
    // }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <AuthSocialButtons title={t('Sign up with')} />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            {t('or sign up with')}
          </Typography>
        </Divider>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}

      <Box>
        <form onSubmit={handleRegister}>
          <Stack mb={3}>
            <CustomFormLabel htmlFor="username">{t('Name')}</CustomFormLabel>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setuserName(e.target.value)
              }
            />
            <CustomFormLabel htmlFor="email">{t('Email')}</CustomFormLabel>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setEmail(e.target.value)
              }
            />
            <CustomFormLabel htmlFor="password">{t('Password')}</CustomFormLabel>
            <CustomTextField
              id="password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setPassword(e.target.value)
              }
            />
          </Stack>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            {t('Register')}
          </Button>
        </form>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
