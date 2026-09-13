"use client";
import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import NotificationCard from "./NotificationCard";
import { useTranslation } from "react-i18next";
import { useGetNotifications, useMarkAsRead, useMarkAllAsRead, useClearAll, useRemove } from "../hooks/useNotifications.hook";

type Props = {
  loggedIn: boolean;
};

const NotificationList = ({ loggedIn }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const { data: notifications, isLoading } = useGetNotifications(loggedIn);
  const { mutate: markRead } = useMarkAsRead();
  const { mutate: markAllRead } = useMarkAllAsRead();
  const { mutate: removeAll } = useClearAll();
  const { mutate: removeOne } = useRemove();

  const filtered = tab === 0
    ? notifications
    : notifications?.filter((n) => !n.isRead);

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  return (
    <Box sx={{ width: 380, maxWidth: "90vw" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography variant="h6" fontWeight={600}>
          {t('Notifications')}
        </Typography>
      </Stack>

      <Tabs
        value={tab}
        onChange={(_e, v) => setTab(v)}
        sx={{ px: 2, minHeight: 36, "& .MuiTab-root": { minHeight: 36, py: 0.5 } }}
      >
        <Tab label={t('All ({{count}})', { count: notifications?.length || 0 })} />
        <Tab label={t('Unread ({{count}})', { count: unreadCount })} />
      </Tabs>

      <Box sx={{ px: 2, py: 1 }}>
        {tab === 1 && unreadCount > 0 && (
          <Button size="small" variant="text" onClick={() => markAllRead()} sx={{ textTransform: "none", fontSize: 13 }}>
            {t('Mark all as read')}
          </Button>
        )}
        {tab === 0 && (notifications?.length || 0) > 0 && (
          <Button size="small" variant="text" onClick={() => removeAll()} sx={{ textTransform: "none", fontSize: 13, color: "error.main" }}>
            {t('Remove All')}
          </Button>
        )}
      </Box>

      <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
        {isLoading ? (
          <Stack alignItems="center" py={4}>
            <CircularProgress size={28} />
          </Stack>
        ) : !filtered || filtered.length === 0 ? (
          <Stack alignItems="center" py={4} px={2}>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {tab === 1
                ? t("You don't have any Unread Notifications!")
                : t("You don't have any Notifications!")}
            </Typography>
          </Stack>
        ) : (
          filtered.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onRead={(id) => markRead(id)}
              onRemove={(id) => removeOne(id)}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default NotificationList;
