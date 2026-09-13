"use client";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { NotificationType } from "../types";
import { fromTimeToRelativeString } from "@/libs/helpers/time";

type Props = {
  notification: NotificationType;
  onRead: (id: number) => void;
  onRemove: (id: number) => void;
};

const notificationIcons: Record<number, string> = {
  0: "solar:bell-bing-line-duotone",
  1: "solar:chat-round-dots-line-duotone",
  2: "solar:cart-check-line-duotone",
  3: "solar:info-circle-line-duotone",
  4: "solar:box-line-duotone",
  5: "solar:card-send-line-duotone",
};

const NotificationCard = ({ notification, onRead, onRemove }: Props) => {
  const theme = useTheme();
  const icon = notificationIcons[notification.type] || "solar:bell-bing-line-duotone";

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={1.5}
      sx={{
        px: 2,
        py: 1.5,
        bgcolor: notification.isRead ? "transparent" : "action.hover",
        transition: "background 0.2s",
        "&:hover": { bgcolor: "action.selected" },
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: notification.isRead ? "grey.200" : "primary.light",
        }}
      >
        <Box
          component="span"
          sx={{
            width: 16,
            height: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill={notification.isRead ? "#9E9E9E" : theme.palette.primary.main} />
          </svg>
        </Box>
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" color="text.primary" sx={{ wordBreak: "break-word" }}>
          {notification.message}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          {fromTimeToRelativeString(notification.createdAt)}
        </Typography>
      </Box>
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ flexShrink: 0 }}>
        {!notification.isRead && (
          <IconButton
            size="small"
            onClick={() => onRead(notification.id)}
            sx={{ width: 20, height: 20 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "primary.main",
              }}
            />
          </IconButton>
        )}
        <IconButton
          size="small"
          onClick={() => onRemove(notification.id)}
          sx={{ width: 20, height: 20, "&:hover": { color: "error.main" } }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default NotificationCard;
