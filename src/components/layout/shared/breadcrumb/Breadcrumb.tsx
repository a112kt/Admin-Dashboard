'use client';
import React, { ReactNode, useContext } from "react";
import { Typography, Breadcrumbs, useTheme, Box, Stack } from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { CustomizerContext } from "@/context/customizerContext";

interface BreadCrumbItem {
  title: string;
  to?: string;
}

interface BreadCrumbType {
  subtitle?: string;
  items?: BreadCrumbItem[];
  title: string;
  children?: ReactNode;
  bg?: string;
}

const Breadcrumb = ({ subtitle, items, title, children, bg }: BreadCrumbType) => {
  const theme = useTheme();
  const { isBorderRadius } = useContext(CustomizerContext);
  const defaultBg = "linear-gradient(135deg, #1B2351 0%, #11183D 100%)";

  return (
    <Box
      sx={{
        background: bg || defaultBg,
        borderRadius: `${isBorderRadius}px`,
        p: "20px",
        my: 3,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Left side: Title  */}
        <Stack flexDirection={"column"} spacing={1}>
          <Box>
            <Typography variant="h4" color="white">
              {title}
            </Typography>
          </Box>
          {children && <Breadcrumbs
            separator={
              <Icon
                icon="heroicons:slash-20-solid"
                color={theme.palette.whiteColor.white60}
                height={18}
              />
            }
            aria-label="breadcrumb"
            sx={{
              alignItems: "center",
              mt: { xs: 1, sm: 0 },
            }}
          >
            {items?.map((item) => (
              <Box key={item.title}>
                {item.to ? (
                  <Link href={item.to} passHref>
                    <Typography
                      variant="h6"
                      fontWeight={500}
                      color="whiteColor.white60"
                      sx={{ cursor: "pointer" }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                ) : (
                  <Typography
                    variant="h6"
                    fontWeight={500}
                    color="whiteColor.white60"
                  >
                    {item.title}
                  </Typography>
                )}
              </Box>
            ))}
          </Breadcrumbs>}

        </Stack>


        {/* Right side: Breadcrumbs */}
        <Stack direction="row" spacing={2} alignItems="center">
          {!children && <Breadcrumbs
            separator={
              <Icon
                icon="heroicons:slash-20-solid"
                color={theme.palette.whiteColor.white60}
                height={18}
              />
            }
            aria-label="breadcrumb"
            sx={{
              alignItems: "center",
              mt: { xs: 1, sm: 0 },
            }}
          >
            {items?.map((item) => (
              <Box key={item.title}>
                {item.to ? (
                  <Link href={item.to} passHref>
                    <Typography
                      variant="h6"
                      fontWeight={500}
                      color="whiteColor.white60"
                      sx={{ cursor: "pointer" }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                ) : (
                  <Typography
                    variant="h6"
                    fontWeight={500}
                    color="whiteColor.white60"
                  >
                    {item.title}
                  </Typography>
                )}
              </Box>
            ))}
          </Breadcrumbs>}
          {children}
        </Stack>
      </Box>
    </Box>
  );
};

export default Breadcrumb;
