import { Avatar, Box, Stack, Typography, Button, Card, IconButton } from "@mui/material";
import { CommentType, ReplyType } from "../types";
import { formatDistanceStrict } from "date-fns"
import { useEffect, useState } from "react";
import { HeartIcon } from "@/components/ui/icons/icons";
import { useToggleLikeComment, useGetCommentReplies, useToggleLikeReply } from "../hooks/reelsHooks";
import { IconSend, IconArrowAutofitContent, IconChevronDown } from "@tabler/icons-react";
import { useAddReplyToComment } from "../hooks/reelsHooks";
import CommentReply from "./commentReply";
import { CircularProgress } from "@mui/material";
import { CloseIcon } from "@/components/ui/icons/icons";

export default function CommentBox({ comment, isMobile = false }: { comment: CommentType, isMobile?: boolean }) {
    const [repliesPage, setRepliesPage] = useState<number>(1)
    const { mutateAsync: addReplyToComment } = useAddReplyToComment();
    const { data: replies, refetch, isFetching } = useGetCommentReplies(comment.id, repliesPage)
    const { mutateAsync: toggleLikeReply } = useToggleLikeReply();
    const [now, setNow] = useState<Date>(new Date())
    const [liked, setLiked] = useState<boolean>(comment.isLovedByCurrentUser)
    const { mutateAsync: toggleLikeComment } = useToggleLikeComment();
    const [replying, setReplying] = useState<boolean>(false)
    const [showReplies, setShowReplies] = useState<boolean>(false)
    const [allReplies, setAllReplies] = useState<ReplyType[]>(replies?.data.data || [])
    const handleLike = () => {
        const prevoius = liked
        setLiked(!liked)
        toggleLikeComment(comment.id, {
            onError: () => {
                setLiked(prevoius)
            }
        })
    }
    useEffect(() => {
        if (replies) {
            setAllReplies((prev) => [...prev, ...replies?.data.data.filter((reply: ReplyType) => !prev.some((p) => p.id === reply.id))])
        }
    }, [replies])
    const handleCloseReply = () => {
        setReplying(false)
        setRepliesPage(1)
        setShowReplies(true)
        refetch()
    }
    return (
        <Box px={{ xs: 1, sm: 2 }} my={1}>
            <Stack
                direction="row"
                gap={1.5}
                borderRadius={"12px"}
                padding={{ xs: "8px", sm: "12px" }}
                sx={{
                    borderBottom: "1px solid #f0f0f0",
                    transition: "background 0.2s",
                    "&:hover": { bgcolor: "#f8f9fa" }
                }}
            >
                <Avatar alt={comment.userName} src={comment.userImage} sx={{ width: 36, height: 36, bgcolor: "#e0e0e0" }} />
                <Stack direction="column" spacing={0.5} flex={1}>
                    <Stack direction="row" justifyContent={"space-between"} alignItems={"flex-start"}>
                        <Stack direction="column" spacing={0.5} minWidth={0}>
                            <Typography variant="body2" color="#1B2351" fontWeight={700} fontSize={13} sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: { xs: "120px", sm: "200px" } }}>
                                {comment.userName}
                            </Typography>
                            <Typography variant="body2" color="#333" fontSize={13} lineHeight={1.4}>
                                {comment.content}
                            </Typography>
                        </Stack>
                        <Box sx={{ cursor: "pointer", flexShrink: 0, ml: 1 }} onClick={handleLike}>
                            <HeartIcon fill={liked ? "#e74c3c" : "#ccc"} width={"18px"} height={"18px"} />
                        </Box>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} gap={0} >
                        <Typography variant="body2" fontSize={11} color="#999" width={"fit-content"}>
                            {formatDistanceStrict(
                                new Date(comment.createdAt),
                                now,
                                { addSuffix: true }
                            )}
                        </Typography>
                        {!replying && <Button variant="text" sx={{ color: "#1B2351", textTransform: "none", fontWeight: 500, width: "fit-content", borderRadius: 20 }} color="primary" size="small" onClick={() => setReplying(!replying)}>Reply</Button>}
                    </Stack>
                    {replying &&
                        <Stack direction="row" position={"relative"} width={"100%"}>
                            <ReplyOnCommentField commentId={comment.id} callBackOnAddingReplySuccess={handleCloseReply} />
                            <IconButton onClick={() => {
                                setReplying(false)
                            }} sx={{ color: "#1B2351", mx: 1 }}><CloseIcon fill="#1B2351" width={"20px"} height={"20px"} /></IconButton>
                        </Stack>
                    }

                    {allReplies.length > 0 && (
                        <Stack direction="row">
                            {showReplies && <Box sx={{ width: 4, flexShrink: 0, display: "flex", justifyContent: "center" }}>
                                <Box sx={{ width: "2px", bgcolor: "#d0d0d0", borderRadius: "2px", height: "100%" }} />
                            </Box>}
                            <Stack direction="column" flex={1}>
                                {replies?.data.data.length > 0 && !showReplies && <Button variant="outlined" onClick={() => setShowReplies(!showReplies)} sx={{ color: "#1B2351", textTransform: "none", fontWeight: 500, width: "fit-content", borderRadius: 20, fontSize: 11 }} color="primary" size="small">show replies ({replies?.data.data.length}) <IconChevronDown size={16} /></Button>}
                                {
                                    showReplies && allReplies.map((reply: ReplyType) => (
                                        <Box key={reply.id}>
                                            <CommentReply reply={reply} />
                                        </Box>
                                    ))
                                }
                                {
                                    replies?.data?.meta?.hasNextPage && showReplies && !isFetching && <Button variant="text" onClick={() => {
                                        setRepliesPage(repliesPage + 1)
                                    }} sx={{ color: "#1B2351", textTransform: "none", fontWeight: 500, width: "fit-content", borderRadius: 20, fontSize: 11 }} color="primary" size="small" > show more... </Button>
                                }
                                {
                                    isFetching && <CircularProgress size={16} />
                                }
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Box>
    )
}
function ReplyOnCommentField({ commentId, callBackOnAddingReplySuccess }: { commentId: number, callBackOnAddingReplySuccess: () => void }) {
    const [commentText, setCommentText] = useState<string>("");
    const { mutateAsync: addReplyToComment } = useAddReplyToComment();
    function handleReply() {
        addReplyToComment({ commentId, content: commentText }, {
            onSuccess: () => {
                setCommentText("");
                callBackOnAddingReplySuccess()

            }
        });
    }
    return (<Card
        elevation={0}
        sx={{
            bgcolor: "#f5f6fa",
            borderRadius: "12px",
            border: "1px solid #e8e8e8",
            display: "flex",
            alignItems: "center",
            flex: 1
        }}
    >
        <input
            type="text"
            placeholder="Reply..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && commentText.trim()) {

                    handleReply()
                }
            }}
            style={{
                width: "100%",
                border: "none",
                outline: "none",
                padding: "12px 14px",
                fontSize: "14px",
                fontFamily: "inherit",
                boxSizing: "border-box",
                background: "transparent",
                color: "#333",
                flex: 1
            }}
        />
        <IconButton
            onClick={() => {
                if (commentText.trim()) {
                    handleReply()
                }
            }}
            disabled={!commentText.trim()}
            sx={{

                opacity: commentText.trim() ? 1 : 0.5,
                cursor: commentText.trim() ? "pointer" : "",
                color: "white",
                p: "8px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
        >
            <IconSend size={20} color="gray" />
        </IconButton>
    </Card>)
}

