'use client'
import React, { useState } from "react";
import {
  IconButton,
  Box,
  Badge,
  MenuItem,
  Avatar,
  Typography,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import Menu, { MenuProps } from "@mui/material/Menu";
import Scrollbar from "@/components/ui/custom-scroll/Scrollbar";
import { styled, alpha } from "@mui/material/styles";
import { Stack } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useRoomList } from "@/features/brand/chat/hooks/chatApiHooks";
import { fromTimeToRelativeString } from "@/libs/helpers/time";

const Messages = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);
  const { data: roomListRes, isLoading } = useRoomList();
  const allRooms = Array.isArray(roomListRes?.data) ? roomListRes.data : [];
  const rooms = allRooms.filter((r: any) => r.unreadCount > 0);
  const totalUnread = rooms.reduce((sum: number, r: any) => sum + (r.unreadCount || 0), 0);

  const handleClick2 = (event: { currentTarget: React.SetStateAction<HTMLElement | null> }) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      "& .MuiMenuItem-root": {
        "&:hover": {
          backgroundColor: `${theme.palette.primary.light}`,
        },
      },
    },
  }));

  return (
    <Box>
      <IconButton
        aria-label="show 4 new mails"
        onClick={handleClick2}
        size="small"
        color='inherit'
        sx={{
          color: anchorEl2 ? 'primary.main' : 'text.secondary',
        }}
      >
        <Badge badgeContent={totalUnread} color="primary" max={99}>
          <Box sx={{ position: 'relative', display: 'flex' }}>
            <Box component="span" className="heartbit"></Box>
            <Icon icon="solar:settings-minimalistic-line-duotone" width="24" height="24" />
          </Box>
        </Badge>
      </IconButton>

      <StyledMenu
        id="msgs-menu2"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            maxHeight: "none",
            "& .MuiMenu-list": {
              paddingY: 0,
            },
          },
        }}
      >
        <Stack direction="row" py={2} px={3} alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontSize="20px">
            {t('Inbox')}
          </Typography>
          {totalUnread > 0 && <Chip label={t('{{count}} New', { count: totalUnread })} color="warning" />}
        </Stack>
        <Scrollbar sx={{ height: "365px" }}>
          {isLoading ? (
            <Stack alignItems="center" py={4}>
              <CircularProgress size={28} />
            </Stack>
          ) : rooms.length === 0 ? (
            <Stack alignItems="center" py={4}>
              <Typography variant="body2" color="text.secondary">
                {t('No new messages')}
              </Typography>
            </Stack>
          ) : (
            rooms.map((room: any) => (
              <Box key={room.roomIdEnc}>
                <MenuItem
                  onClick={() => {
                    handleClose2();
                    router.push(`/chat?chatId=${encodeURIComponent(room.roomIdEnc)}`);
                  }}
                  sx={{
                    p: 2,
                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                    backgroundColor: (theme) =>
                      room.unreadCount > 0
                        ? alpha(theme.palette.primary.main, 0.04)
                        : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" width="100%">
                    <Box minWidth="40px" height="40px" display="flex" alignItems="center" justifyContent="center">
                      <Badge
                        color="success"
                        overlap="circular"
                        badgeContent=" "
                        variant="dot"
                      >
                        <Avatar
                          src={room.userImageUrl}
                          alt={room.userName}
                          sx={{ width: 42, height: 42 }}
                        />
                      </Badge>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography
                          variant="subtitle2"
                          color="textPrimary"
                          fontWeight={600}
                          fontSize="14px"
                          noWrap
                          sx={{ maxWidth: "180px" }}
                        >
                          {room.userName}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontSize="12px"
                          noWrap
                          flexShrink={0}
                          ml={1}
                        >
                          {room.lastMessageAt ? fromTimeToRelativeString(room.lastMessageAt) : ''}
                        </Typography>
                      </Box>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontSize="12px"
                        noWrap
                        sx={{ maxWidth: "250px" }}
                      >
                        {room.lastMessage || t('No messages yet')}
                      </Typography>
                    </Box>
                    {room.unreadCount > 0 && (
                      <Box
                        sx={{
                          minWidth: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 600,
                          flexShrink: 0,
                        }}
                      >
                        {room.unreadCount}
                      </Box>
                    )}
                  </Stack>
                </MenuItem>
              </Box>
            ))
          )}
        </Scrollbar>

        <Box p={2} sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
          borderRadius: "0px"
        }}>
          <Button
            href="/chat"
            variant='contained'
            component={Link}
            color='primary'
            sx={{
              display: "flex",
              gap: "6px",
              lineHeight: 2,
            }}
            fullWidth
          >
            {t('See all Messages')}
          </Button>
        </Box>
      </StyledMenu>
    </Box>
  );
};

export default Messages;
