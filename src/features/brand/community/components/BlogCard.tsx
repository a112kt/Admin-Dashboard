import { format } from "date-fns";
import NextLink from "next/link";

import {
  Stack,
  Avatar,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { BlogPostType } from "@/context/blogContext/BlogContext";


interface Btype {
  post: BlogPostType;
}

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  published: { label: 'Published', bg: '#10b981', color: 'white' },
  draft: { label: 'Draft', bg: '#6b7280', color: 'white' },
};

const BlogCard = ({ post }: Btype) => {
  const { coverImg, title, status, author, createdAt, id, category } = post;

  const statusInfo = statusConfig[status] || statusConfig.draft;

  return (
    <Box
      sx={{
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: 1,
        bgcolor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: `
          0px 4px 16px rgba(0,0,0,0.04),
          0px 1px 3px rgba(0,0,0,0.02),
          inset 0px 1px 0px rgba(255,255,255,0.3)
        `,
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.01)',
          bgcolor: 'rgba(255,255,255,0.14)',
          borderColor: 'rgba(255,255,255,0.22)',
          boxShadow: `
            0px 16px 32px rgba(0,0,0,0.06),
            0px 6px 12px rgba(0,0,0,0.04),
            inset 0px 1px 0px rgba(255,255,255,0.4)
          `,
          '& .blog-card-image': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <NextLink href={`/community/blog/detail/${id}`} style={{ textDecoration: 'none' }}>
          <Box
            className="blog-card-image"
            component="img"
            src={coverImg}
            alt={title}
            sx={{
              width: 1,
              height: 270,
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </NextLink>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.25), transparent)',
            pointerEvents: 'none',
          }}
        />
        <Chip
          label={statusInfo.label}
          size="small"
          sx={{
            position: 'absolute',
            top: 14,
            right: 14,
            bgcolor: statusInfo.bg,
            color: statusInfo.color,
            borderRadius: '100px',
            height: 26,
            fontSize: '12px',
            fontWeight: 600,
            '& .MuiChip-label': { px: '10px' },
          }}
        />
      </Box>
      <Stack spacing={1.5} sx={{ p: '24px 28px 28px', flex: 1 }}>
        <NextLink href={`/brand-profile/${author?.brandId}`} style={{ textDecoration: 'none' }}>
          <Chip
            label={category}
            size="small"
            sx={{
              alignSelf: 'flex-start',
              borderRadius: '100px',
              height: 22,
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              color: '#6366f1',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 0.8 },
              '& .MuiChip-label': { px: '10px' },
            }}
          />
        </NextLink>
        <Typography
          sx={{
            fontFamily: '"Onest", sans-serif',
            fontWeight: 700,
            fontSize: '22px',
            lineHeight: 1.3,
            color: '#030e09',
            textDecoration: 'none',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          component={NextLink}
          href={`/community/blog/detail/${id}`}
        >
          {title}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 'auto', pt: 2 }}>
          <NextLink href={`/brand-profile/${author?.brandId}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar
              src={author?.avatar}
              sx={{
                width: 32,
                height: 32,
                flexShrink: 0,
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.8 },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#030e09',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.8 },
              }}
            >
              {author?.name}
            </Typography>
          </NextLink>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(3, 14, 9, 0.45)',
              fontSize: '12px',
            }}
          >
            {format(new Date(createdAt ?? new Date()), "MMM d, yyyy")}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BlogCard;
