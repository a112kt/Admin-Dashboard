"use client";
import { useEffect, useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import CustomSelect from "@/components/ui/forms/theme-elements/CustomSelect";
import { useTranslation } from 'react-i18next';

interface OverViewTabProps {
  year: number;
  onYearChange: (year: number) => void;
  onRefresh: () => void;
  onDownload: () => void;
  availableYears: number[];
}

function OverViewTab({ year, onYearChange, onRefresh, onDownload, availableYears }: OverViewTabProps) {
  const { t } = useTranslation();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting(t('Good Morning'));
    } else if (hour >= 12 && hour < 17) {
      setGreeting(t('Good Afternoon'));
    } else if (hour >= 17 && hour < 21) {
      setGreeting(t('Good Evening'));
    } else {
      setGreeting(t('Good Night'));
    }
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    onYearChange(Number(event.target.value));
  };

  const getGreetingIcon = () => {
    if (greeting === "Good Morning" || greeting === "Good Afternoon") {
      return (
        <Icon
          icon="line-md:sunny-filled-loop"
          color="orange"
          width="24"
          height="24"
        />
      );
    } else {
      return (
        <Icon icon="line-md:moon-filled-alt-loop" width="24" height="24" />
      );
    }
  };
  //   theme
  const theme = useTheme();

  return (
    <Box>
      <Stack
        direction={{ sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent={"space-between"}
        gap={2}
      >
        <Box>
          <Typography variant="h3">
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {t('Welcome Back, Admin')} {getGreetingIcon()}
            </Box>
          </Typography>
        </Box>
        <Box>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <IconButton
              onClick={onRefresh}
              sx={{
                padding: "10px",
                bgcolor: theme.palette.whiteColor.white100,
                color: theme.palette.blackColor.black100,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Icon icon="solar:refresh-bold-duotone" width={20} height={20} />
            </IconButton>

            <CustomSelect
              variant="outlined"
              labelId="year"
              id="year"
              value={String(year)}
              size="small"
              onChange={handleChange}
              sx={{
                padding: "3px",
                backgroundColor: theme.palette.whiteColor.white100,
              }}
            >
              {availableYears.map(y => (
                <MenuItem key={y} value={String(y)}>{y}</MenuItem>
              ))}
            </CustomSelect>

            <Button
              variant="contained"
              color="secondary"
              onClick={onDownload}
              sx={{
                height: 40,
                padding: "0 16px",
              }}
              endIcon={<Icon
                icon="solar:download-minimalistic-line-duotone"
                width={18}
                height={18}
              />}
            >
              {t('Download')}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default OverViewTab;
