"use client";
import React, { useContext, useState } from "react";
import Scrollbar from "@/components/ui/custom-scroll/Scrollbar";
import {
  Avatar,
  Box,
  Button,
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
import { useTranslation } from "react-i18next";
import { useUser } from "@/features/brand/user/hooks/userInfoHooks";
import { AdminAuthContext } from "@/context/adminAuthContext";

const DEFAULT_PLACEHOLDER = "https://static.vecteezy.com";
const ADMIN_PROFILE_IMG = "/images/profile/admin-profile.png";

const getProfileImage = (url?: string | null) => {
  if (!url || url.trim() === "" || url.startsWith(DEFAULT_PLACEHOLDER)) return ADMIN_PROFILE_IMG;
  return url;
};

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { user, loading: userLoading } = useUser();
  const { adminEmail, logout: adminLogout } = useContext(AdminAuthContext);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const { t } = useTranslation();
  const userName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "Admin"
    : adminEmail || "Admin";

  const handleLogout = async () => {
    adminLogout();
    window.location.href = "/admin/auth/login";
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
          src={getProfileImage(user?.profileImageUrl)}
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
          <Stack direction="column" alignItems="center" pt={2.5} gap={4}>
            <Avatar
              src={getProfileImage(user?.profileImageUrl)}
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
                {user?.email || adminEmail || "admin@alluvo.com"}
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
                  label: t('Dashboard'),
                  href: "/admin/home",
                },
                {
                  icon: "solar:user-broken",
                  label: t('Profile'),
                  href: "/admin/profile",
                },
                {
                  icon: "solar:wallet-money-line-duotone",
                  label: t('Finance'),
                  href: "/admin/finance",
                },
                {
                  icon: "solar:document-text-line-duotone",
                  label: t('Audit Trail'),
                  href: "/admin/audit-trail",
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
                width={80}
                height={80}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ color: "black", fontWeight: 500, mt: 2 }}
              >
                {t('Log out')}
              </Button>
            </Stack>
          </Box>
        </Scrollbar>
      </Drawer>
    </Box>
  );
};

export default Profile;
