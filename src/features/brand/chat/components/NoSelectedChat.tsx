"use client";

import { useTranslation } from 'react-i18next';
import { Box, Typography, Stack } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function NoChatSelected() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        sx={{
          textAlign: "center",
          maxWidth: 360,
          padding: 3,
        }}
      >
        <ChatBubbleOutlineIcon
          sx={{
            fontSize: 64,
            color: "text.secondary",
            opacity: 0.7,
          }}
        />

        <Typography variant="h6" fontWeight={600}>
          {t('No chat selected')}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {t('Choose a conversation from the left to start messaging.')}
          {t('Your messages will appear here in real time.')}
        </Typography>
      </Stack>
    </Box>
  );
}