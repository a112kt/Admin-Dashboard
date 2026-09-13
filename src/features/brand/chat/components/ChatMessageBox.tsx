import { DecryptedMessageType } from "@/features/brand/chat/types";
import { useRef, useEffect, useState } from "react";
import { Box, Typography, Avatar, ListItemAvatar, Skeleton, Stack, IconButton } from "@mui/material";
import { useContext } from "react";
import { ChatContext } from "../chatContext/chatContext";
import { PendingIcon, CheckedIcon } from "@/components/ui/icons/icons";
import { formatDistanceStrict, formatDistanceToNowStrict } from "date-fns";
import ErrorIcon from "@mui/icons-material/Error";
import { useDebounce } from 'use-debounce'
import { CircularProgress } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    IconDotsVertical,
} from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';
import { useDeleteMessage } from "../hooks/chatApiHooks";


export default function ChatMessageBox({ chatMsgList }: { chatMsgList: DecryptedMessageType[] }) {
    const { t } = useTranslation();
    const { selectedChat, page, setPage, hasNextPage, isGetMessagesFetching, isGetMessagesLoading, fetchLockRef, goToBottom, setGoToBottom, setChatMsgList } = useContext(ChatContext)
    const { mutate: deleteMessage, isError: isDeleteMessageError, isSuccess: isDeleteMessageSuccess } = useDeleteMessage()
    const [onDeletedMessageDecId, setOnDeletedMessageDecId] = useState<string>("")
    const [deletingPending, setDeletingPending] = useState<boolean>(false)
    const [debouncedPage, setDebouncedPage] = useDebounce(page, 800)
    const bottomRef = useRef<HTMLDivElement>(null);
    const topSentinelRef = useRef<HTMLDivElement>(null);
    function mapStatus(status: string) {
        switch (status) {
            case "DeliveredToServer":
                return <CheckedIcon />
            case "Delivered":
                return <Box display={"flex"} sx={{ gap: "0px", mb: "5px" }}>
                    <CheckedIcon />
                    <CheckedIcon />
                </Box>
            case "Seen":
                return <Box display={"flex"} sx={{ gap: "0px", mb: "5px" }}>
                    <CheckedIcon color="green" />
                    <CheckedIcon color="green" />
                </Box>
            case "Pending":
                return <PendingIcon />
            case "Failed":
                return <ErrorIcon color="error" sx={{ width: 13, height: 13 }} />
            default:
                return ""
        }
    }
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [now, setNow] = useState<Date>(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date())
        }, 60000)
        return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        if (messageContainerRef.current && page === 1) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [chatMsgList])
    useEffect(() => {
        if (goToBottom && messageContainerRef.current && bottomRef.current) {
            console.log("go to bottom")
            bottomRef.current?.scrollIntoView({
                behavior: "smooth",
            });
            setGoToBottom(false)
        }
    }, [goToBottom])
    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log({
                    intersecting: entry.isIntersecting,
                    scrollTop: messageContainerRef.current?.scrollTop,
                    scrollHeight: messageContainerRef.current?.scrollHeight,
                    clientHeight: messageContainerRef.current?.clientHeight,
                });
                if (
                    entry.isIntersecting &&
                    hasNextPage &&
                    !isGetMessagesFetching
                    && !fetchLockRef.current
                ) {
                    fetchLockRef.current = true
                    // if (debouncedPage !== page) {
                    console.log("Fetching page...");
                    setPage(prev => prev + 1)
                    messageContainerRef.current?.scrollTo({
                        top: 200,
                        behavior: "smooth",
                    });
                    // }
                }
            },
            {
                root: messageContainerRef.current,
                threshold: 0.1,
            }
        );

        if (topSentinelRef?.current) {
            observer.observe(topSentinelRef.current);
        }

        return () => observer.disconnect();


    }, [chatMsgList])
    useEffect(() => {
        if (isDeleteMessageSuccess) {

            const filtered = chatMsgList.filter((m) => m.messageIdDec !== onDeletedMessageDecId)
            console.log(filtered)
            setChatMsgList(filtered)
            setDeletingPending(false)
            handleClose()
        }

    }, [isDeleteMessageSuccess])

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [openedMenuIdMessage, setOpenMenuIdMessage] = useState<string>("")
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, messageId: string) => {
        setOpenMenuIdMessage(messageId)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setOpenMenuIdMessage("")
        setAnchorEl(null);
    };
    const handleDelete = (messageIdDec: string) => {
        setDeletingPending(true)
        deleteMessage(messageIdDec)
        setOnDeletedMessageDecId(messageIdDec)
        // handleClose()
    }

    return (
        <Box width="100%" flex={1} display={"flex"} flexDirection={"column"} minHeight={0}>


            {isGetMessagesLoading && page === 1 && <Box >
                {Array.from(Array(10).keys()).map((index) => (
                    <MessageSkeleton key={index} align={index % 2 == 0 ? "left" : "right"} />
                ))}
            </Box>}
            <Box
                ref={messageContainerRef}
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    minHeight: 0,
                    position: "relative",
                    "scrollbar-width": "none",
                    "&:scrollbar": {
                        display: "none",

                    },
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },

                }}
            >
                <Box height={"10px"} ref={topSentinelRef}></Box>
                <Box p={3}>
                    {isGetMessagesFetching && page > 1 && <Typography sx={{
                        textAlign: "center",
                        my: 2,
                        color: "text.secondary",
                        fontSize: "14px",
                        position: "absolute",
                        top: 40,
                        left: 0,
                        right: 0,
                        zIndex: 1,
                    }}>
                        <CircularProgress size={24} color="inherit" />
                    </Typography>}
                    {chatMsgList.map((message) => {
                        return (
                            <Box key={message.messageIdDec}>
                                {!message.isMyMessage ? (
                                    <Box display="flex">
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={selectedChat?.userName}
                                                src={selectedChat?.userImageUrl}
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
                                                    {selectedChat?.userName},{" "}
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
                                                <Typography variant="body2" color="black" pb={"0px"} px={"0px"} >
                                                    {message.decryptedText}
                                                </Typography>
                                            </Box>


                                            {/* {chat.type === "image" ? (
                                <Box
                                  mb={1}
                                  sx={{
                                    overflow: "hidden",
                                    lineHeight: "0px",
                                  }}
                                >
                                  <Image
                                    src={chat.msg}
                                    alt="attach"
                                    width="150"
                                    height="150"
                                  />
                                </Box>
                              ) : null} */}
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
                                            {message.createdAt && message.status !== "Failed" ? (
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
                                            ) : null}
                                            <Box
                                                mb={1}
                                                sx={{

                                                    p: 1,
                                                    px: 0,
                                                    pt: "5px",
                                                    backgroundColor: "primary.light",
                                                    ml: "auto",
                                                    maxWidth: "320px",
                                                    position: "relative",
                                                    borderRadius: "10px",
                                                    minWidth: "50px",
                                                    border: message.status === "Failed" ? "1px solid red" : "none"

                                                }}
                                            >
                                                <Box>
                                                    <Stack direction={"row"} justifyContent={"flex-end"} borderRadius={"10px"}>
                                                        <IconButton id="basic-button"
                                                            size="small"

                                                            sx={{
                                                                p: "0px !important",
                                                                margin: "0px !important",
                                                                width: "15px",
                                                                height: "15px",
                                                                alignSelf: "flex-end"
                                                            }}
                                                            aria-controls={openedMenuIdMessage === message?.messageIdDec ? "basic-menu" : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={openedMenuIdMessage === message?.messageIdDec ? "true" : undefined}
                                                            onClick={(e) => { handleClick(e, message?.messageIdDec || "") }}>
                                                            <IconDotsVertical stroke={1.5} />
                                                        </IconButton>
                                                        <Menu

                                                            id="basic-menu"
                                                            open={openedMenuIdMessage === message?.messageIdDec}
                                                            anchorEl={anchorEl}
                                                            onClose={handleClose}
                                                        >
                                                            <MenuItem sx={{ width: "150px", display: "flex", justifyContent: "center", alignItems: "center", color: "red" }} onClick={() => {
                                                                handleDelete(message?.messageIdDec || "")
                                                            }}>{deletingPending ? <CircularProgress color="error" size={20} /> : t('Delete Message')}</MenuItem>

                                                        </Menu>
                                                    </Stack>
                                                </Box>
                                                <Typography variant="body2" color="black" textAlign={"left"} pb={"7px"} px={1}>
                                                    {message.decryptedText}
                                                </Typography>

                                                <Box
                                                    position={"absolute"}
                                                    bottom={-9}
                                                    right={5}
                                                    mb={1}
                                                >
                                                    {mapStatus(message.status)}
                                                </Box>
                                            </Box>

                                            {/* {chat.type === "image" ? (
                                <Box
                                  mb={1}
                                  sx={{ overflow: "hidden", lineHeight: "0px" }}
                                >
                                  <Image
                                    src={chat.msg}
                                    alt="attach"
                                    width="250"
                                    height="165"
                                  />
                                </Box>
                              ) : null} */}
                                        </Box>
                                    </Box>
                                )
                                }
                            </Box>
                        );
                    })}
                    <div ref={bottomRef} />
                </Box>
            </Box>
        </Box >
    )
}
function MessageSkeleton({ align = "left" }: { align?: "left" | "right" }) {
    const isRight = align === "right";

    return (
        <Stack
            direction="row"
            spacing={1.5}
            justifyContent={isRight ? "flex-end" : "flex-start"}
            sx={{ p: 1 }}
        // width={"100%"}
        >
            {!isRight && (
                <Skeleton variant="circular" width={36} height={36} animation="wave" />
            )}

            <Box sx={{ maxWidth: "60%" }}>
                <Skeleton variant="rounded" width={200} height={40} animation="wave" />
            </Box>

            {isRight && (
                <Skeleton variant="circular" width={36} height={36} animation="wave" />
            )}
        </Stack>
    );
}