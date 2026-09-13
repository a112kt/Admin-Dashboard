"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from 'react-i18next';
import { ChatContext } from "../chatContext/chatContext";
import { useContext, useEffect, useRef } from "react";
import { Badge } from "@mui/material";
import ChatMessageBox from "./ChatMessageBox";
import ChatMsgSent from "./ChatMsgSent";
import { ChatBootMessageType } from "../types";
import { formatDistanceStrict } from "date-fns";
import ChatBotWelcome from "./chatBotWelcome";
import ReactMarkdown from "react-markdown";

export default function ChatBootRoom({ isSmallScreen }: { isSmallScreen: boolean }) {
    const { t } = useTranslation();
    const { chatMsgList, setIsChatBoot, chatBootMessages, isSendQueryPending, goToBottom, setGoToBottom } = useContext(ChatContext)
    const bottomRef = useRef<HTMLDivElement>(null);
    const now = new Date();
    useEffect(() => {
        if (goToBottom && bottomRef.current) {
            bottomRef.current?.scrollIntoView({
                behavior: "smooth",
            });
            setGoToBottom(false)
        }
    }, [goToBottom])
    return (
        <Box display={"flex"} flexDirection={"column"} flexGrow={1} >
            {/* ------------------------------------------- */}
            {/* Header Part */}
            {/* ------------------------------------------- */}
            <Box flexShrink={0}>
                <Box display="flex" alignItems="center" p={2}>

                    <ListItem disableGutters>
                        <ListItemAvatar>
                            <Badge
                            >
                                <Avatar
                                    alt={"Alluvo AI"}
                                    src={'/images/profile/alluvo ai.png'}
                                    sx={{ width: 40, height: 40 }}
                                />
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="h5">{t('Alluvo AI')}</Typography>
                            }
                        // secondary={selectedChat.userStatus}
                        />
                    </ListItem>
                    <Box display={isSmallScreen ? "block" : "none"}>
                        <IconButton
                            onClick={() => {
                                setIsChatBoot(false)
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
            </Box>
            {/* ------------------------------------------- */}
            {/* Chat Content */}
            {/* ------------------------------------------- */}


            {/* ------------------------------------------- */}
            {/* Chat msges */}
            {/* ------------------------------------------- */}



            <Box width="100%" flex={1} display={"flex"} flexDirection={"column"} minHeight={0} p={2} justifyContent={"center"}>
                {chatBootMessages.length === 0 ? <ChatBotWelcome /> : <Box sx={{
                    flex: 1,
                    overflowY: "auto",
                    minHeight: 0,
                    position: "relative",
                    "&:scrollbar": {
                        display: "none",
                    },
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },

                }}>




                    {chatBootMessages.length > 0 && chatBootMessages.map((message: ChatBootMessageType) => (
                        <Box key={message.id}>
                            {!message.isQuery ? (
                                <Box display="flex">
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={"Alluvo AI"}
                                            src={'/images/profile/avtar.png'}
                                            sx={{ width: 40, height: 40 }}
                                        />
                                    </ListItemAvatar>
                                    <Box>
                                        {message.createdAt ? (
                                            <Typography
                                                variant="body2"
                                                color="grey.400"
                                                mb={1}
                                            >
                                                {t('Alluvo AI')},{" "}
                                                {formatDistanceStrict(
                                                    new Date(message.createdAt),
                                                    now,
                                                    {
                                                        addSuffix: true,
                                                    }
                                                )}
                                            </Typography>
                                        ) : null}
                                        <Box
                                            mb={1}
                                            sx={{
                                                p: 1,
                                                pt: "5px",
                                                backgroundColor: "primary.light",
                                                // ml: "auto",
                                                maxWidth: "320px",
                                                borderRadius: "10px",
                                                minWidth: "20px",
                                                width: "fit-content",

                                            }}
                                        >
                                            <ReactMarkdown>
                                                {message.text}
                                            </ReactMarkdown>
                                        </Box>

                                    </Box>
                                </Box>
                            ) : (
                                <Box
                                    mb={1}
                                    display="flex"
                                    alignItems="flex-end"
                                    flexDirection="row-reverse"
                                >
                                    <Box
                                        alignItems="flex-end"
                                        display="flex"
                                        flexDirection={"column"}

                                    >
                                        {message.createdAt &&
                                            <Typography
                                                variant="body2"
                                                color="grey.400"
                                                mb={1}
                                            >
                                                {formatDistanceStrict(
                                                    new Date(message.createdAt),
                                                    now,
                                                    {
                                                        addSuffix: true,
                                                    }
                                                )}
                                            </Typography>
                                        }
                                        <Box
                                            mb={1}
                                            sx={{

                                                p: 1,
                                                // px: 0,
                                                pt: "5px",
                                                backgroundColor: "primary.light",
                                                ml: "auto",
                                                maxWidth: "320px",
                                                position: "relative",
                                                borderRadius: "10px",
                                                minWidth: "50px",

                                            }}
                                        >

                                            <ReactMarkdown>
                                                {message.text}
                                            </ReactMarkdown>

                                        </Box>
                                    </Box>
                                </Box>
                            )
                            }
                            <div ref={bottomRef} />
                        </Box>

                    ))}

                    {isSendQueryPending && <Box display="flex">
                        <ListItemAvatar>
                            <Avatar
                                alt={"Alluvo AI"}
                                src={'/images/profile/avtar.png'}
                                sx={{ width: 40, height: 40 }}
                            />
                        </ListItemAvatar>
                        <Box>
                            <Box
                                mt={2}
                                sx={{
                                    p: 0,
                                    pt: "10px",
                                }}
                            >
                                <CircularProgress
                                    size={20}
                                    color="primary"
                                    variant="indeterminate"
                                />

                            </Box>

                        </Box>
                    </Box>}
                </Box>}

            </Box>



            {/* ------------------------------------------- */}
            {/* REMOVED Chat right sidebar Content REMOVED */}
            {/* ------------------------------------------- */}

            <Box flexShrink={0}>
                <Divider />
                <ChatMsgSent />
            </Box>
        </Box>
    )
}