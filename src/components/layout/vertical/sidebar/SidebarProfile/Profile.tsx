"use client";
import { CustomizerContext } from "@/context/customizerContext";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Welcome from "../../../shared/welcome/Welcome";

export const Profile = () => {
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { isSidebarHover, isCollapse } = useContext(CustomizerContext);
  const hideMenu = lgUp ? isCollapse == "mini-sidebar" && !isSidebarHover : "";
  return (
    <Box
      display={"flex"}
      alignItems="center"
      flexDirection="column"
      gap={2}
      sx={{ m: 2 }}
    >
      {!hideMenu ? (
        <>
          <Image
            src="/images/backgrounds/sidebarbuynow.svg"
            width={80}
            height={80}
            alt="sidebar buynow"
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5">{t('Grab Nice Admin')}</Typography>
            <Typography variant="subtitle1">
              {t('Customize your dashboard')}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: "black", fontWeight: "500" }}
          >
            {t('Download')}
          </Button>

        </>
      ) : (
        ""
      )}
    </Box>
  );
};
