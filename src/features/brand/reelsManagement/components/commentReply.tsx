import { Avatar, Box, Stack, Typography, Button, Card, IconButton } from "@mui/material";
import { ReplyType } from "../types";
import { formatDistanceStrict } from "date-fns"
import { useState } from "react";
import { HeartIcon } from "@/components/ui/icons/icons";
import { useToggleLikeComment, useGetCommentReplies, useToggleLikeReply } from "../hooks/reelsHooks";
import { IconSend, IconArrowDown } from "@tabler/icons-react";
import { useAddReplyToComment } from "../hooks/reelsHooks";


export default function CommentReply({ reply }: { reply: ReplyType }) {
    const { mutateAsync: toggleLikeReply } = useToggleLikeReply();
    const [now, setNow] = useState<Date>(new Date())
    const [liked, setLiked] = useState<boolean>(reply.isLovedByCurrentUser)
    const handleLike = () => {
        const prevoius = liked
        setLiked(!liked)
        toggleLikeReply(reply.id, {
            onError: () => {
                setLiked(prevoius)
            }
        })
    }
    return (
        <Box px={{ xs: 1, sm: 2 }} my={{ xs: 0.5, sm: 1 }}>
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
                <Avatar alt={reply.userName} src={reply.userImage} sx={{ width: 36, height: 36, bgcolor: "#e0e0e0" }} />
                <Stack direction="column" spacing={0.5} flex={1}>
                    <Stack direction="row" justifyContent={"space-between"} alignItems={"flex-start"}>
                        <Stack direction="column" spacing={0.5} minWidth={0}>
                            <Typography variant="body2" color="#1B2351" fontWeight={700} fontSize={13} sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: { xs: "100px", sm: "180px" } }}>
                                {reply.userName}
                            </Typography>
                            <Typography variant="body2" color="#333" fontSize={13} lineHeight={1.4}>
                                {reply.content}
                            </Typography>
                        </Stack>
                        <Box sx={{ cursor: "pointer", flexShrink: 0, ml: 1 }} onClick={handleLike}>
                            <HeartIcon fill={liked ? "#e74c3c" : "#ccc"} width={"18px"} height={"18px"} />
                        </Box>
                    </Stack>

                    <Typography variant="subtitle1" fontSize={11} color="#999" width={"fit-content"}>
                        {formatDistanceStrict(
                            new Date(reply.createdAt),
                            now,
                            { addSuffix: true }
                        )}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

