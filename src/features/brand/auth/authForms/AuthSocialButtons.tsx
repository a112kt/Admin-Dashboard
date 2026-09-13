"use client";
import CustomSocialButton from "@/components/ui/forms/theme-elements/CustomSocialButton";
import { Stack } from "@mui/system";
import { Avatar, Box } from "@mui/material";
import { signInType } from "@/features/brand/auth/types/auth";
import { useContext } from "react";
import { useTranslation } from 'react-i18next';

const AuthSocialButtons = ({ title }: signInType) => {
  const { t } = useTranslation();

  const handleGoogle = async () => {
    // try {
    //   await loginWithProvider("google");
    // } catch (error) {
    //   console.error("Google login failed", error);
    // }
  };

  const handleGithub = async () => {
    // try {
    //   await loginWithProvider("github");
    // } catch (error) {
    //   console.error("GitHub login failed", error);
    // }
  };

  return (
    <>
      <Stack direction="row" spacing={2} mt={3} >
        <div onClick={handleGoogle} style={{ width: '100%' }}>
          <CustomSocialButton sx={{ width: '100%' }}>
            <Avatar
              src={"/images/svgs/google-icon.svg"}
              alt={"icon1"}
              sx={{
                width: 16,
                height: 16,
                borderRadius: 0,
                mr: 1,
              }}
            />

            {t('Google')}
          </CustomSocialButton>
        </div>
        <div onClick={handleGithub} style={{ width: '100%' }}>
          <CustomSocialButton sx={{ width: '100%' }}>
            <Avatar
              src={"/images/svgs/git-icon.svg"}
              alt={"icon2"}
              sx={{
                width: 20,
                height: 20,
                borderRadius: 0,
                mr: 1,
              }}
            />

            {t('GitHub')}
          </CustomSocialButton>
        </div>
      </Stack>
    </>
  );
};

export default AuthSocialButtons;
