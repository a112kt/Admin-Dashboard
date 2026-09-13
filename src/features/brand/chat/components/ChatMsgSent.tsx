import React, { useContext } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { useTranslation } from 'react-i18next';
import { IconSend } from "@tabler/icons-react";
import { ChatContext } from "@/features/brand/chat/chatContext/chatContext";

const ChatMsgSent = () => {
  const { t } = useTranslation();
  const [msg, setMsg] = React.useState<string>("");
  const { sendMessage, selectedChat, isChatBoot, sendQueryToChatBoot } = useContext(ChatContext);

  const handleChatMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const onChatMsgSubmit = (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();
    if (!msg.trim() || (!selectedChat && !isChatBoot)) return;
    if (isChatBoot) {
      sendQueryToChatBoot(msg.trim());
    } else {
      sendMessage(msg.trim());
    }
    setMsg("");
  };

  return (
    <Box p={1} px={3} bgcolor={"white"} borderRadius={"0px"}>
      {/* ------------------------------------------- */}
      {/* sent chat */}
      {/* ------------------------------------------- */}
      <form
        onSubmit={onChatMsgSubmit}
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        {/* ------------------------------------------- */}
        {/* Emoji picker */}
        {/* ------------------------------------------- */}

        <InputBase
          id="msg-sent"
          fullWidth
          value={msg}
          placeholder={t('Type a Message')}
          size="small"
          type="text"
          inputProps={{ "aria-label": t('Type a Message') }}
          onChange={handleChatMsgChange.bind(null)}
        />
        <IconButton aria-label="delete" disabled={!msg} onClick={onChatMsgSubmit.bind(null)} type="submit">
          <IconSend stroke={1.5} size="20" />
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatMsgSent;
