import React from 'react';
import Link from 'next/link';
import { Stack, Avatar, Box, Typography, Tooltip, Fab, TextField, Button } from '@mui/material';
import { IconArrowBackUp, IconCircle, IconSend } from '@tabler/icons-react';
import { BlogCommentType as BlogType } from '@/context/blogContext/BlogContext';


type BlogCommentProps = {
  comment: BlogType;
  postId: number;
  onReply: (content: string, parentCommentId: number) => Promise<any>;
};

const BlogComment = ({ comment, postId, onReply }: BlogCommentProps) => {
  const [showReply, setShowReply] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");
  const [sending, setSending] = React.useState(false);

  return (
    <>
      <Box mt={2} p={3} sx={{ backgroundColor: 'background.default' }}>
        <Stack direction={'row'} gap={2} alignItems="center">
          <Link href={`/brand-profile/${comment?.profile.brandId}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar
              alt="Remy Sharp"
              src={comment?.profile.avatar}
              sx={{ width: '33px', height: '33px', transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 } }}
            />
            <Typography variant="h6" sx={{ transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 } }}>{comment?.profile.name}</Typography>
          </Link>
          <Typography variant="caption" color="textSecondary">
            <>
              <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
              {comment?.profile.time}
            </>
          </Typography>
        </Stack>
        <Box py={2}>
          <Typography color="textSecondary">{comment?.comment}</Typography>
        </Box>
        <Stack direction="row" gap={1} alignItems="center">
          <Tooltip title="Reply" placement="top">
            <Fab size="small" color="primary" onClick={() => setShowReply(!showReply)}>
              <IconArrowBackUp size="16" />
            </Fab>
          </Tooltip>
        </Stack>
      </Box>
      {comment?.replies ? (
        <>
          {comment?.replies.map((reply: BlogType) => {
            return (
              <Box pl={4} key={reply.comment}>
                <Box mt={2} p={3} sx={{ backgroundColor: 'background.default' }}>
                  <Stack direction={'row'} gap={2} alignItems="center">
                    <Link href={`/brand-profile/${reply.profile.brandId}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar alt="Remy Sharp" src={reply.profile.avatar} sx={{ transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 } }} />
                      <Typography variant="h6" sx={{ transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 } }}>{reply.profile.name}</Typography>
                    </Link>
                    <Typography variant="caption" color="textSecondary">
                      <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
                      {reply.profile.time}
                    </Typography>
                  </Stack>
                  <Box py={2}>
                    <Typography color="textSecondary">{reply.comment}</Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </>
      ) : (
        ''
      )}
      {showReply ? (
        <Box p={2}>
          <Stack direction={'row'} gap={2} alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src={comment?.profile.avatar}
              sx={{ width: '33px', height: '33px' }}
            />
            <TextField
              placeholder="Write a reply..."
              variant="outlined"
              fullWidth
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              multiline
              maxRows={4}
            />
            <Button
              variant="contained"
              disabled={!replyText.trim() || sending}
              onClick={async () => {
                if (!replyText.trim()) return;
                setSending(true);
                try {
                  await onReply(replyText, Number(comment.id));
                  setReplyText("");
                  setShowReply(false);
                } finally {
                  setSending(false);
                }
              }}
              endIcon={<IconSend size={16} />}
            >
              {sending ? "Sending..." : "Reply"}
            </Button>
          </Stack>
        </Box>
      ) : (
        ''
      )}
    </>
  );
};

export default BlogComment;
