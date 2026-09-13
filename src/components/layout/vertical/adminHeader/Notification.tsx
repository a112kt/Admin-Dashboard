"use client";
import { useContext, useEffect, useState } from "react";
import {
  Badge,
  IconButton,
  Popover,
  Snackbar,
  Alert,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { AuthContext } from "@/context/authContext";
import useNotificationConnection from "@/libs/notificationConnection";
import { useUnreadNotificationCount } from "@/features/notifications/hooks/useNotifications.hook";
import { useQueryClient } from "@tanstack/react-query";
import NotificationList from "@/features/notifications/components/NotificationList";
import { useSnackbarAnchor } from "@/hooks/useSnackbarAnchor";

const Notification = () => {
  const { token } = useContext(AuthContext);
  const loggedIn = !!token;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
  const connection = useNotificationConnection(token);
  const { data: unreadCount } = useUnreadNotificationCount(loggedIn);
  const queryClient = useQueryClient();
  const snackbarAnchor = useSnackbarAnchor("top");

  useEffect(() => {
    if (!connection) return;

    const onNotification = (notification: any) => {
      setSnackbar({ open: true, message: notification?.message || "New notification" });
      queryClient.refetchQueries({ queryKey: ["notifications"] });
      queryClient.refetchQueries({ queryKey: ["unread-count"] });
    };

    const onUpdateCount = (count: number) => {
      queryClient.setQueryData(["unread-count"], count);
    };

    connection.on("ReceiveNotification", onNotification);
    connection.on("UpdateUnreadCount", onUpdateCount);

    return () => {
      connection.off("ReceiveNotification", onNotification);
      connection.off("UpdateUnreadCount", onUpdateCount);
    };
  }, [connection, queryClient]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton size="small" onClick={handleClick} color="inherit" aria-label="notifications">
        <Badge badgeContent={unreadCount ?? 0} color="primary" max={99}>
          <Icon icon="solar:bell-bing-line-duotone" width={20} />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { mt: 1, borderRadius: 2, boxShadow: 4 } } }}
      >
        <NotificationList loggedIn={loggedIn} />
      </Popover>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={snackbarAnchor}
      >
        <Alert severity="info" variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notification;
