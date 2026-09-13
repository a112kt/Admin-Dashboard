import React, { useContext, useEffect, useState, useCallback } from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ChatContext } from "@/features/brand/chat/chatContext/chatContext";
import Scrollbar from "@/components/ui/custom-scroll/Scrollbar";
import { RoomType } from "@/features/brand/chat/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useRoomList, useCreateNewChat } from "../hooks/chatApiHooks"
import { Skeleton } from "@mui/material";
import { useUser } from "@/features/brand/user/hooks/userInfoHooks";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { decrypt } from "@/utils/helpers/chatHelpers";
import { formatDistanceToNowStrict } from "date-fns";

function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const ChatListing = ({ isSmallScreens }: { isSmallScreens: boolean }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const chatId = searchParams.get("chatId");

  const { user, loading } = useUser();
  const {

    connection,
    userId,
    chatSearch,
    setChatSearch,
    selectedChat,
    setSelectedChat,
    activeChatId,
    roomUpdatedReadCount,
    lastMessageUpdate,
    isDeleteChatSuccess,
    setIsChatBoot,
    isChatBoot

  } = useContext(ChatContext);

  const { data: roomList, isError, isLoading, error, isSuccess, refetch } = useRoomList()
  const [filteredChats, setFilteredChats] = useState<RoomType[]>([])
  const { mutateAsync: createNewChat, isSuccess: isCreateNewChatSuccess, isPending: isCreateNewChatPending } = useCreateNewChat()

  useEffect(() => {
    if (roomList?.data && roomList.data.length > 0) {
      setFilteredChats(roomList?.data?.filter((chat: RoomType) =>
        chat.userName.toLowerCase().includes(chatSearch.toLowerCase()),
      ))
    }
  }, [chatSearch])

  useEffect(() => {
    if (isSuccess && roomList?.data) {
      setFilteredChats(roomList?.data)
    }
  }, [isSuccess, roomList])

  useEffect(() => {
    async function settingSearchParamChatId(chatId: string) {
      const roomId = await decrypt(chatId);
      console.log(roomId, "roomId");
      console.log(roomList?.data, "roomList");
      const room = roomList?.data?.find((chat: RoomType) => chat.roomIdDec === roomId);
      console.log(room, "room");
      if (room) {
        setSelectedChat(room);
        router.replace(pathname);
      }
    }
    if (chatId && roomList?.data && roomList.data.length > 0) {
      settingSearchParamChatId(chatId);
    }
  }, [chatId, roomList]);

  const handleChatSelect = useCallback((chat: RoomType) => {
    console.log("chat: ", chat)
    setSelectedChat(chat);
  }, [setSelectedChat]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatSearch(event.target.value);
  };

  useEffect(() => {
    if (roomList?.data && selectedChat) {
      const currentRoom = roomList.data.find(
        (chat: RoomType) => chat.roomIdDec === selectedChat.roomIdDec
      );
      if (currentRoom && currentRoom.roomIdEnc !== selectedChat.roomIdEnc) {
        setSelectedChat(currentRoom);

      }
    }
  }, [roomList, selectedChat, setSelectedChat]);

  useEffect(() => {
    if (roomUpdatedReadCount?.roomIdDec && roomList?.data) {
      setFilteredChats(prev =>
        prev.map((chat: RoomType) =>
          chat.roomIdDec === roomUpdatedReadCount.roomIdDec
            ? { ...chat, unreadCount: roomUpdatedReadCount.count }
            : chat,
        ),
      )
    }
  }, [roomUpdatedReadCount])

  useEffect(() => {
    if (!connection) return;

    const onRoomDeleted = (plainRoomId: string) => {
      setFilteredChats(prev => prev.filter(chat => chat.roomIdDec !== plainRoomId))
      if (selectedChat?.roomIdDec === plainRoomId) {
        setSelectedChat(null)
      }
    };

    const onRoomCreated = () => {
      refetch();
    };

    connection.on("OnRoomDeleted", onRoomDeleted);
    connection.on("OnRoomCreated", onRoomCreated);

    return () => {
      connection.off("OnRoomDeleted", onRoomDeleted);
      connection.off("OnRoomCreated", onRoomCreated);
    };
  }, [connection, selectedChat, refetch]);

  useEffect(() => {
    if (isDeleteChatSuccess) {
      setFilteredChats(prev => prev.filter(chat => chat.roomIdDec !== selectedChat?.roomIdDec))
      setSelectedChat(null)
    }
  }, [isDeleteChatSuccess])

  useEffect(() => {
    if (isCreateNewChatSuccess) {
      refetch()
    }
  }, [isCreateNewChatSuccess])

  useEffect(() => {
    if (lastMessageUpdate) {
      setFilteredChats(prev => prev.map(chat =>
        chat.roomIdDec === lastMessageUpdate.roomIdDec
          ? { ...chat, lastMessage: lastMessageUpdate.lastMessage, lastMessageAt: lastMessageUpdate.lastMessageAt }
          : chat
      ));
    }
  }, [lastMessageUpdate]);

  const smallScreensSX = {
    position: "absolute",
    top: 0,
    left: !selectedChat && !isChatBoot ? 0 : "-100%",
    height: "100%",
    width: "100%",
    zIndex: 1,
    transition: "all 0.8s ease-in",
  }

  const handleNewChat = async () => {
    const data = prompt("Enter user ID to start a new chat:");
    if (data) {
      createNewChat(data);
    }
  };

  return (
    <Box
      height={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FFFFFF",
        borderRight: "1px solid",
        borderColor: "divider",
        width: isSmallScreens ? "100%" : 360,
        minWidth: isSmallScreens ? "auto" : 360,
        position: "relative",
        ...(isSmallScreens ? smallScreensSX : {}),
      }}
    >
      {/* Profile Header */}
      <Box
        sx={{
          px: 2.5,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Box
              sx={{
                width: 10,
                height: 10,
                bgcolor: "#22C55E",
                borderRadius: "50%",
                border: "2px solid #FFFFFF",
              }}
            />
          }
        >
          <Avatar
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.profileImageUrl}
            sx={{
              width: 44,
              height: 44,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {user?.firstName?.[0]}
          </Avatar>
        </Badge>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            fontSize={15}
            noWrap
            color="grey.900"
          >
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>
      </Box>

      {/* Search */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <TextField
          placeholder={t('Search conversations...')}
          size="small"
          type="search"
          variant="outlined"
          fullWidth
          value={chatSearch}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="solar:magnifer-line-duotone"
                    width={18}
                    height={18}
                    color="#9CA3AF"
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* AI Assistant - Pinned */}
      <ListItemButton
        onClick={() => setIsChatBoot(true)}
        selected={isChatBoot}
        sx={{
          mx: 1.5,
          mb: 0.5,
          borderRadius: 2,
          py: 0.5,
          px: 1.5,
          gap: 1.5,
          maxHeight: 100,
          "&.Mui-selected": {
            bgcolor: "rgba(27,35,81,0.06)",
            "&:hover": {
              bgcolor: "rgba(27,35,81,0.09)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: 3,
              height: "80%",
              bgcolor: "primary.main",
              borderRadius: "0 4px 4px 0",
            },
          },
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.03)",
          },
        }}
      >
        <ListItemAvatar sx={{ minWidth: 32 }}>
          <Avatar
            alt="Alluvo AI"
            src={'/images/profile/alluvo ai.png'}
            sx={{
              width: 28,
              height: 28,
              boxShadow: "0 2px 8px rgba(71,192,210,0.25)",
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={13}
                color="text.primary"
                component="span"
                sx={{ lineHeight: 1.2 }}
              >
                {t('Alluvo AI')}
              </Typography>
              <Icon
                icon="solar:sparkle-linear"
                width={12}
                height={12}
                color="#9CA3AF"
              />
            </Box>
          }
          sx={{ my: 0, ml: 0.5, flex: "none" }}
        />
      </ListItemButton>

      {/* Section Label */}
      <Box
        sx={{
          px: 2.5,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="caption"
          fontWeight={600}
          fontSize={12}
          color="text.secondary"
          sx={{ letterSpacing: 0.5, textTransform: "uppercase" }}
        >
          {t('Conversations')}
        </Typography>
        <Typography variant="caption" fontSize={11} color="text.disabled">
          {filteredChats.length}
        </Typography>
      </Box>

      {/* Conversation List */}
      <Scrollbar
        sx={{
          flex: 1,
          px: 1.5,
          pb: 8,
        }}
      >
        <List disablePadding>
          {/* Loading Skeletons */}
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <ListItemButton
                key={index}
                sx={{ py: 1.5, px: 2, borderRadius: 2, gap: 1.5 }}
              >
                <ListItemAvatar sx={{ minWidth: 32 }}>
                  <Skeleton variant="circular" width={32} height={32} />
                </ListItemAvatar>
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" height={20} />
                </Box>
              </ListItemButton>
            ))}

          {/* Error State */}
          {isError && (
            <Alert severity="error" sx={{ mx: 1, mt: 1, borderRadius: 2 }}>
              <Typography variant="body2" color="error">
                {error?.message || t('Failed to load conversations')}
              </Typography>
            </Alert>
          )}

          {/* Conversation Items */}
          {filteredChats.length > 0
            ? filteredChats.map((chat: RoomType) => {
              const isSelected = activeChatId === chat.roomIdDec;
              const avatarColor = stringToColor(chat.userName);

              return (
                <ListItemButton
                  key={chat.roomIdEnc}
                  onClick={() => handleChatSelect(chat)}
                  selected={isSelected}
                  sx={{
                    py: 0.5,
                    px: 1.5,
                    mb: 0.25,
                    borderRadius: 2,
                    gap: 1.5,
                    position: "relative",
                    transition: "all 0.15s ease",
                    "&.Mui-selected": {
                      bgcolor: "rgba(27,35,81,0.06)",
                      "&:hover": {
                        bgcolor: "rgba(27,35,81,0.09)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: 24,
                        bgcolor: "primary.main",
                        borderRadius: "0 4px 4px 0",
                      },
                    },
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.03)",
                    },
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: "unset" }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      <Avatar
                        alt={chat.userName}
                        src={chat?.userImageUrl || undefined}
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: avatarColor,
                          fontSize: 12,
                          fontWeight: 600,
                          boxShadow: isSelected
                            ? "0 2px 8px rgba(27,35,81,0.15)"
                            : "0 1px 4px rgba(0,0,0,0.06)",
                        }}
                      >
                        {getInitials(chat.userName)}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Box
                        component="span"
                        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", overflow: "hidden" }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={isSelected ? 600 : 500}
                          fontSize={14}
                          color={isSelected ? "text.primary" : "grey.800"}
                          noWrap
                          sx={{ lineHeight: 1.3, flex: 1, minWidth: 0 }}
                        >
                          {chat.userName}
                        </Typography>
                        {chat.lastMessageAt && (
                          <Typography
                            variant="caption"
                            fontSize={11}
                            color="text.disabled"
                            sx={{ ml: 1, flexShrink: 0 }}
                          >
                            {formatDistanceToNowStrict(new Date(chat.lastMessageAt), { addSuffix: true })}
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ fontSize: "0.75rem", lineHeight: 1.4, mt: 0.25 }}
                      >
                        {chat.lastMessage || ""}
                      </Typography>
                    }
                    sx={{ my: 0, ml: 0.5, minWidth: 0, overflow: "hidden" }}
                  />

                  {chat.unreadCount > 0 && (
                    <Box
                      sx={{
                        minWidth: 20,
                        height: 20,
                        borderRadius: "10px",
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: chat.unreadCount > 9 ? 0.75 : 0,
                        flexShrink: 0,
                        mt: 0.75,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Typography
                        variant="caption"
                        fontSize={11}
                        fontWeight={700}
                        color="white"
                        sx={{ lineHeight: 1 }}
                      >
                        {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                      </Typography>
                    </Box>
                  )}
                </ListItemButton>
              );
            })
            : !isLoading &&
            !isError && (
              <Box sx={{ textAlign: "center", py: 6, px: 3 }}>
                <Icon
                  icon="solar:chat-round-dots-linear"
                  width={40}
                  height={40}
                  color="#D1D5DB"
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1.5 }}
                >
                  {chatSearch
                    ? t('No conversations match your search')
                    : t('No conversations yet')}
                </Typography>
              </Box>
            )}
        </List>
      </Scrollbar>

      {/* Floating New Chat Button */}
      {/* <Fab
        color="primary"
        size="medium"
        onClick={handleNewChat}
        disabled={isCreateNewChatPending}
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 10,
          boxShadow: "0 4px 16px rgba(27,35,81,0.25)",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(27,35,81,0.35)",
          },
        }}
      >
        <Icon icon="solar:chat-round-dots-linear" width={22} height={22} />
      </Fab> */}
    </Box>
  );
};

export default ChatListing;
