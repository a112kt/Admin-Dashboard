"use client";
import React, { useContext, useState } from "react";
import Scrollbar from "@/components/ui/custom-scroll/Scrollbar";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLogout } from "@/features/brand/user/hooks/logout.hook";
import { useUser } from "@/features/brand/user/hooks/userInfoHooks";
import { useMyBrand } from "@/features/brand/Home/hooks/useMyBrand";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { mutateAsync: logout, isPending } = useLogout();
  const { user } = useUser();
  const { brand } = useMyBrand();
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const { t } = useTranslation();
  const router = useRouter();
  const userName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "User"
    : "User";

  const handleLogout = () => {
    localStorage.removeItem("BrandToken");
    localStorage.removeItem("AlluvoRole");
    localStorage.removeItem("BrandStatus");
    logout();
    router.replace("/auth/login");
  };

  const theme = useTheme();

  const listItemButtonStyle = {
    p: "3px",
    gap: "10px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark" ? "primary" : "primary.light",
      "& .MuiListItemIcon-root, & svg, & .MuiTypography-root": {
        color:
          theme.palette.mode === "dark"
            ? theme.palette.primary.main
            : theme.palette.primary.main,
      },
    },
  };
  return (
    <Box>
      <IconButton
        size="small"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={user?.profileImageUrl || "/images/profile/avtar.png"}
          alt={"ProfileImg"}
          sx={{
            width: 30,
            height: 30,
          }}
        />
      </IconButton>

      <Drawer
        anchor="right"
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        slotProps={{
          paper: {
            sx: {
              width: " 330px",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
            cursor: "pointer",
          }}
          onClick={handleClose2}
        >
          <Icon icon="solar:close-circle-line-duotone" fontSize={24} />
        </Box>

        <Scrollbar sx={{ height: "calc(100% - 75px)" }}>
          {brand && (
            <Stack
              component={Link}
              href="/profile"
              onClick={handleClose2}
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1.5}
              pt={3}
              pb={2}
              sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
            >
              <Avatar
                src={brand?.logoUrl}
                alt={brand?.displayName}
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {brand?.displayName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t('Brand')}
                </Typography>
              </Box>
            </Stack>
          )}
          <Box sx={{ borderTop: brand ? `1px solid ${theme.palette.divider}` : 'none', mx: 2 }} />
          <Stack direction="column" alignItems="center" pt={2.5} gap={4}>
            <Avatar
              src={user?.profileImageUrl || "/images/profile/avtar.png"}
              alt={"ProfileImg"}
              sx={{ width: 84, height: 84 }}
            />
            <Box textAlign="center">
              <Typography variant="h5" fontWeight={600}>
                {userName}
              </Typography>

              <Typography
                variant="subtitle2"
                color="blackColor.black60"
                display="flex"
                alignItems="center"
                gap={1}
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.whiteColor.white60
                      : theme.palette.blackColor.black60,
                }}
              >
                <Icon icon="solar:mailbox-line-duotone" width={16}></Icon>
                {user?.email || "info@niceadmin.com"}
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              borderTop: `1px dashed ${theme.palette.blackColor.black10}`,
              pt: "24px",
              px: "20px",
              mt: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <List
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.whiteColor.white60
                    : theme.palette.blackColor.black60,
              }}
            >
              {[
                {
                  icon: "solar:chart-square-line-duotone",
                  label: t('Home'),
                  href: "/home",
                },
                {
                  icon: "solar:shop-line-duotone",
                  label: t('Profile'),
                  href: "/profile",
                },
                {
                  icon: "solar:wallet-money-line-duotone",
                  label: t('Finance'),
                  href: "/finance",
                },
                {
                  icon: "solar:box-minimalistic-line-duotone",
                  label: t('Orders'),
                  href: "/orders-management/orders",
                },
                {
                  icon: "solar:videocamera-record-line-duotone",
                  label: t('Reels'),
                  href: "/reels-management/reels",
                },
                {
                  icon: "solar:chat-round-dots-outline",
                  label: t('Chat'),
                  href: "/chat",
                },
              ].map((item, index) => (
                <ListItemButton key={index} sx={listItemButtonStyle} component={Link} href={item.href}>
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <Icon icon={item.icon} width={20} height={20} />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        fontWeight={500}
                        color="inherit"
                      >
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>

          <Box
            sx={{
              borderTop: `1px dashed ${theme.palette.blackColor.black10}`,
              pt: "24px",
              mt: "24px",
            }}
          >
            <Stack alignItems="center" px="24px" p={2}>
              <Image
                src="/images/logo/mainLogo.svg"
                alt="sidebar_bg"
                width={100}
                height={100}
                style={{ width: "auto", height: "auto", objectFit: "cover" }}
              />

              <Box textAlign="center" mt={3}>
                <Typography variant="h5">{t('All Of Your Favorites')}</Typography>
                <Typography variant="subtitle1">
                  {t('In One Place')}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ color: "black", fontWeight: 500, mt: 2 }}
                disabled={isPending}
              >
                {isPending ? <CircularProgress size={24} /> : t('Log out')}
              </Button>
            </Stack>
          </Box>
        </Scrollbar>
      </Drawer>
    </Box>
  );
};

export default Profile;
