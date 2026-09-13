import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChatMsgSent from "./ChatMsgSent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import {
  IconDotsVertical,
  IconMenu2,
  IconPhone,
  IconVideo,
} from "@tabler/icons-react";
import { ChatContext } from "@/features/brand/chat/chatContext/chatContext";

import NoChatSelected from "./NoSelectedChat";
import ChatMessageBox from "./ChatMessageBox";
import ChatBootRoom from "./chatBootRoom";
// interface ChatContentProps {
//   toggleChatSidebar: () => void;
// }

const ChatContent = ({ isSmallScreen }: { isSmallScreen: boolean }) => {
  const { t } = useTranslation();
  // const [open, setOpen] = React.useState(true);
  // const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const { selectedChat, chatMsgList, setSelectedChat, isChatBoot, userId, setPage, page, hasNextPage, encryptedChatId, isSendMessagePending, deleteChat } = useContext(ChatContext);
  // const lastRoomIdRef = useRef<string | null>(null);
  // const lastMsgCountRef = useRef<number>(0);
  // const scrollCleanupRef = useRef<(() => void) | null>(null);

  const [now, setNow] = useState<Date>(new Date())
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {

    setAnchorEl(event.currentTarget);
  };
  const handledelete = () => {
    if (selectedChat) {
      deleteChat(selectedChat.roomIdEnc);
    }
    handleClose();
  }
  const handleClose = () => {
    setAnchorEl(null);
  };


  if (isChatBoot) {
    return (<Box flexGrow={1} height={"100%"} display={"flex"} >
      <ChatBootRoom isSmallScreen={isSmallScreen} />
    </Box>)
  }


  return (
    <Box flexGrow={1} height={"100%"} display={"flex"}>

      {selectedChat ? (
        <Box display={"flex"} flexDirection={"column"} flexGrow={1} >
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box flexShrink={0}>
            <Box display="flex" alignItems="center" p={2}>
              {/* <Box
                sx={{
                  display: { xs: "block", md: "block", lg: "none" },
                  mr: "10px",
                }}
              >
                <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
              </Box> */}
              <ListItem key={selectedChat.roomIdEnc} dense disableGutters>
                <ListItemAvatar>
                  <Badge
                  >
                    <Avatar
                      alt={selectedChat.userName}
                      src={selectedChat.userImageUrl}
                      sx={{ width: 40, height: 40 }}
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h5">{selectedChat.userName}</Typography>
                  }
                // secondary={selectedChat.userStatus}
                />
              </ListItem>
              <Box display={isSmallScreen ? "block" : "none"}>
                <IconButton
                  onClick={() => {
                    setSelectedChat(null)

                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Box>
              <Stack direction={"row"}>
                <IconButton id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}>
                  <IconDotsVertical stroke={1.5} />
                </IconButton>
                <Menu

                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem onClick={handledelete} sx={{ color: "red" }}>{t('Delete Chat')}</MenuItem>

                </Menu>
              </Stack>
            </Box>
            <Divider />
          </Box>
          {/* ------------------------------------------- */}
          {/* Chat Content */}
          {/* ------------------------------------------- */}


          {/* ------------------------------------------- */}
          {/* Chat msges */}
          {/* ------------------------------------------- */}
          <ChatMessageBox chatMsgList={chatMsgList} />



          {/* ------------------------------------------- */}
          {/* REMOVED Chat right sidebar Content REMOVED */}
          {/* ------------------------------------------- */}

          <Box flexShrink={0}>
            <Divider />
            <ChatMsgSent />
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={"100%"}
          p={2}
          pb={1}
          pt={1}
          // height="100%"
          // width="100%"
          flexGrow={1}
        >
          {/* ------------------------------------------- */}
          {/* if No Chat Content */}
          {/* ------------------------------------------- */}
          {!isSmallScreen && <NoChatSelected />}
        </Box>
      )
      }
    </Box >
  );
};

export default ChatContent;
