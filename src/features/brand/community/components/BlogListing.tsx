'use client'
import { useContext } from 'react';
import { Grid, Pagination, Box, Typography, Button, Skeleton, Stack } from '@mui/material';
import Link from 'next/link';
import { motion } from "motion/react";
import { IconPlus } from '@tabler/icons-react';
import BlogCard from './BlogCard';
import { BlogContext } from "@/context/blogContext/BlogContext";

const BlogCardSkeleton = () => (
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
    }}
  >
    <Skeleton variant="rectangular" width="100%" height={270} animation="wave" sx={{ bgcolor: 'rgba(0,0,0,0.04)' }} />
    <Box sx={{ p: '24px 28px 28px' }}>
      <Skeleton variant="rounded" width={80} height={22} sx={{ mb: 1.5 }} animation="wave" />
      <Skeleton variant="text" width="90%" sx={{ mb: 0.5, fontSize: '22px' }} animation="wave" />
      <Skeleton variant="text" width="60%" sx={{ mb: 2, fontSize: '22px' }} animation="wave" />
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="circular" width={32} height={32} animation="wave" />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="40%" sx={{ fontSize: '14px' }} animation="wave" />
          <Skeleton variant="text" width="30%" sx={{ fontSize: '12px' }} animation="wave" />
        </Box>
      </Stack>
    </Box>
  </Box>
);

const BlogListing = () => {
  const { posts, pageIndex, setPageIndex, totalPages, isLoading } = useContext(BlogContext);

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '32px',
        p: { xs: 3, md: 5 },
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.03) 0%, rgba(255,255,255,0.5) 50%, rgba(16,185,129,0.02) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-8%',
          left: '-5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      {isLoading ? (
        <Grid container spacing={4}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
              <BlogCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography
            sx={{
              fontFamily: '"Onest", sans-serif',
              fontWeight: 600,
              fontSize: '22px',
              color: '#030e09',
              mb: 1,
            }}
          >
            No Articles Yet
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Onest", sans-serif',
              fontSize: '14px',
              color: 'rgba(3,14,9,0.5)',
              maxWidth: 400,
              mx: 'auto',
              mb: 3,
            }}
          >
            Get started by creating your first article. Share your knowledge with the community.
          </Typography>
          <Button
            component={Link}
            href="/community/add-article"
            variant="contained"
            startIcon={<IconPlus size={18} />}
            sx={{
              background: 'linear-gradient(135deg, #6366f1, #10b981)',
              color: 'white',
              borderRadius: '100px',
              px: 4,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5, #059669)',
              },
            }}
          >
            Create Article
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {posts.map((post, index) => (
              <Grid
                size={{ xs: 12, md: 6, lg: 4 }}
                key={post.id}
                display="flex"
                alignItems="stretch"
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  sx={{ width: 1 }}
                >
                  <BlogCard post={post} />
                </Box>
              </Grid>
            ))}
          </Grid>
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination
                count={totalPages}
                page={pageIndex}
                onChange={(_, page) => setPageIndex(page)}
                color="primary"
                shape="rounded"
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: '10px',
                    fontWeight: 500,
                    fontSize: '14px',
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BlogListing;
