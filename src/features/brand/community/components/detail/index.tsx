"use client";

import React, { useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Stack,
  Avatar,
  Typography,
  CardMedia,
  Chip,
  Box,
  Divider,
  TextField,
  Button,
  IconButton,
  Popover,
  Skeleton,
  Select,
  MenuItem,
} from "@mui/material";
import {
  IconHeart,
  IconHeartFilled,
  IconMessage2,
  IconPoint,
  IconEdit,
  IconEyeFilled,
  IconMoodSmile,
  IconSend,
} from "@tabler/icons-react";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import BlogComment from "./BlogComment";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import BlankCard from "@/components/shared/BlankCard";
import { usePost, useTogglePostLike, useUpdatePostStatus } from "@/features/brand/community/hooks/useCommunityPosts";
import { usePostComments, useCreateComment } from "@/features/brand/community/hooks/usePostComments";
import type { PostCommentRes } from "@/features/brand/community/types";
import type { BlogCommentType } from "@/context/blogContext/BlogContext";

function mapComment(item: PostCommentRes): BlogCommentType {
  return {
    id: String(item.commentId),
    profile: {
      avatar: item.brandOwnerImageUrl || item.brandLogoUrl || "",
      name: item.brandOwnerName,
      time: item.createdAt ? format(new Date(item.createdAt), "MMM d, yyyy") : "",
      brandId: String(item.brandId),
    },
    comment: item.content,
    replies: item.replies?.map(mapComment),
  };
}

const BlogDetail = () => {
  const params = useParams();
  const postId = Number(params.postId);

  const { data: post, isLoading } = usePost(postId);
  const { data: commentsData } = usePostComments(postId);
  const { mutateAsync: createCommentMut, isPending: isSending } = useCreateComment();
  const { mutateAsync: toggleLike } = useTogglePostLike();
  const { mutateAsync: updateStatusMut, isPending: isEditingStatus } = useUpdatePostStatus();

  const [replyTxt, setReplyTxt] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [emojiAnchor, setEmojiAnchor] = useState<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [cursorPos, setCursorPos] = useState<number | null>(null);

  const comments: BlogCommentType[] = (commentsData ?? []).map(mapComment);
  const status = post?.status ?? "draft";
  const isByMe = post?.isByMe ?? false;
  const showAdmin = isByMe && !previewMode;

  const onSubmit = async () => {
    if (!replyTxt.trim()) return;
    try {
      await createCommentMut({ postId, content: replyTxt });
      setReplyTxt("");
    } catch {
      // error handled by react query
    }
  };

  const handleEmojiSelect = (emojiData: any) => {
    const emoji = emojiData.emoji || emojiData.native || "";
    const pos = cursorPos ?? replyTxt.length;
    setReplyTxt(replyTxt.slice(0, pos) + emoji + replyTxt.slice(pos));
    setCursorPos(null);
    setEmojiAnchor(null);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.selectionEnd = pos + emoji.length;
      }
    }, 0);
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatusMut({ postId, status: newStatus });
    } catch {
      // error handled by react query
    }
  };

  return (
    <Box sx={{ pt: 3 }}>
      <BlankCard sx={{ overflow: 'hidden' }}>
        {isLoading ? (
          <Skeleton animation="wave" variant="rectangular" width="100%" height={440} />
        ) : (
          <CardMedia component="img" height="440" image={post?.coverImageUrl} alt={post?.title} sx={{ objectFit: 'cover' }} />
        )}

        {showAdmin && (
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, py: 2 }}>
            <Select
              size="small"
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isEditingStatus}
              sx={{ minWidth: 120, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } }}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </Select>
            <Stack direction="row" spacing={1}>
              <Button component={Link} href={`/community/blog/edit?postId=${postId}`} size="small" variant="outlined" startIcon={<IconEdit size={16} />}>
                Edit
              </Button>
              <Button size="small" variant="contained" onClick={() => setPreviewMode(true)} startIcon={<IconEyeFilled size={16} />}>
                Preview
              </Button>
            </Stack>
          </Stack>
        )}

        {previewMode && isByMe && (
          <Stack direction="row" justifyContent="center" sx={{ px: 3, py: 1 }}>
            <Button size="small" variant="text" onClick={() => setPreviewMode(false)}>
              Exit Preview
            </Button>
          </Stack>
        )}

        <Box sx={{ px: 3, pb: 1 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
            <Link href={`/brand-profile/${post?.brandId}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar src={post?.brandOwnerName ? undefined : ""} sx={{ width: 36, height: 36, transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 } }} />
              <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 } }}>
                {post?.brandOwnerName}
              </Typography>
            </Link>
            <IconPoint size="14" />
            <Typography variant="caption" color="text.secondary">
              {post?.createdAt ? format(new Date(post.createdAt), "MMM d, yyyy") : ""}
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Chip label={status === "published" ? "Published" : "Draft"} size="small" variant="outlined" sx={{ height: 22 }} />
          </Stack>

          <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
            {post?.title}
          </Typography>

          {post?.slug && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
              /{post.slug}
            </Typography>
          )}

          <Stack direction="row" spacing={2} alignItems="center" color="text.secondary" mb={2}>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{ cursor: 'pointer' }}
              onClick={() => toggleLike(postId)}
            >
              {post?.isLiked ? <IconHeartFilled size="18" color="#e53e3e" /> : <IconHeart size="18" />}
              <Typography variant="caption">{post?.likesCount ?? 0}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconMessage2 size="18" />
              <Typography variant="caption">{post?.commentsCount ?? 0}</Typography>
            </Stack>
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ px: 3, py: 3 }}>
          {post?.content ? (
            <Box
              sx={{ '& p': { mb: 2 }, '& img': { maxWidth: '100%', borderRadius: 1 } }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <>
              <Typography variant="h5" fontWeight={600} mb={2}>
                Building a Resilient Brand in the Digital Era
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                In today&apos;s fast-paced e-commerce landscape, brand loyalty is more than just repeat purchases; it&apos;s about creating a community around your products.
              </Typography>
            </>
          )}
        </Box>
      </BlankCard>

      {post?.commentsEnabled !== false && (
      <BlankCard sx={{ mt: 3 }}>
        <Box sx={{ px: 3, py: 2.5 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={2.5}>
            <Typography variant="h6" fontWeight={600}>
              Post Comments
            </Typography>
            <Box sx={{ px: 1.2, py: 0.3, borderRadius: 1, bgcolor: 'primary.light', color: 'primary.main' }}>
              <Typography variant="caption" fontWeight={700}>
                {post?.commentsCount ?? 0}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
            <Stack direction="row" spacing={0.5} sx={{ px: 1.5, py: 0.5, borderBottom: 1, borderColor: 'divider', bgcolor: 'action.hover' }}>
              <IconButton
                size="small"
                sx={{ p: 0.5 }}
                onClick={(e) => setEmojiAnchor(e.currentTarget)}
              >
                <IconMoodSmile size={18} />
              </IconButton>
            </Stack>
            <TextField
              multiline rows={3} fullWidth
              placeholder="Write some of your comments..."
              value={replyTxt}
              onChange={(e) => setReplyTxt(e.target.value)}
              variant="standard"
              slotProps={{
                htmlInput: {
                  ref: inputRef,
                  onSelect: (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
                    setCursorPos(e.currentTarget.selectionStart);
                  },
                  onFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => {
                    setCursorPos(e.currentTarget.selectionStart);
                  },
                },
              }}
              sx={{
                '& .MuiInputBase-root': { px: 2, py: 1.5 },
                '& .MuiInputBase-input': { fontSize: '0.875rem' },
                '& .MuiInput-underline:before': { display: 'none' },
                '& .MuiInput-underline:after': { display: 'none' },
              }}
            />
            <Popover
              open={!!emojiAnchor}
              anchorEl={emojiAnchor}
              onClose={() => setEmojiAnchor(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </Popover>
            <Box sx={{ px: 2, py: 1, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained" size="small"
                endIcon={<IconSend size={16} />}
                onClick={onSubmit}
                disabled={!replyTxt.trim() || isSending}
              >
                {isSending ? "Sending..." : "Send"}
              </Button>
            </Box>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" mb={2} mt={4}>
            <Typography variant="h6" fontWeight={600}>Comments</Typography>
            <Box sx={{ px: 1.2, py: 0.3, borderRadius: 1, bgcolor: 'primary.light', color: 'primary.main' }}>
              <Typography variant="caption" fontWeight={700}>{comments.length}</Typography>
            </Box>
          </Stack>

          <Box>
            {comments.map((comment) => (
              <BlogComment
                comment={comment}
                key={comment.id}
                postId={postId}
                onReply={async (content, parentCommentId) => {
                  await createCommentMut({ postId, content, parentCommentId });
                }}
              />
            ))}
            {comments.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                No comments yet. Be the first to comment!
              </Typography>
            )}
          </Box>
        </Box>
      </BlankCard>
      )}
    </Box>
  );
};

export default BlogDetail;
