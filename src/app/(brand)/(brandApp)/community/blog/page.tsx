'use client'
import { Box, Button, TextField, Stack, Typography, Chip, Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import PageContainer from '@/components/ui/container/PageContainer';
import BlogListing from '@/features/brand/community/components/BlogListing';
import { BlogProvider } from '@/context/blogContext/BlogContext';
import { useContext } from 'react';
import { BlogContext } from '@/context/blogContext/BlogContext';
import { useTranslation } from 'react-i18next';

const BlogContent = () => {
  const { t } = useTranslation();
  const { sortBy, setSortBy, filter, setFilter, search, setSearch, counts, isLoading } = useContext(BlogContext);

  return (
    <PageContainer title="Community" description="Community page">
      <Box
        sx={{
          bgcolor: '#1b2351',
          borderRadius: 2,
          p: '20px 30px',
          my: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 90,
        }}
      >
        <Box>
          <Typography variant="h4" color="white" fontWeight={600} sx={{ mb: 0.5 }}>
            {t('Community')}
          </Typography>
          <Breadcrumbs
            separator={<Typography variant="caption" color="rgba(255,255,255,0.5)">/</Typography>}
          >
            <Link href="/home" passHref>
              <Typography variant="body2" color="rgba(255,255,255,0.6)" sx={{ cursor: 'pointer' }}>
                {t('Home')}
              </Typography>
            </Link>
            <Typography variant="body2" color="rgba(255,255,255,0.6)">
              {t('Community')}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Button
          component={Link}
          href="/community/add-article"
          variant="contained"
          sx={{
            bgcolor: '#47c0d2',
            color: 'white',
            borderRadius: 1,
            px: 3,
            py: 1,
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'none',
            whiteSpace: 'nowrap',
            '&:hover': {
              bgcolor: '#3aadbe',
            },
          }}
          startIcon={<IconPlus size={18} />}
        >
          {t('Create Article')}
        </Button>
      </Box>

      <Box
        sx={{
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          bgcolor: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '100px',
          p: '8px 12px',
          mb: 4,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.04)',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: { xs: '100%', md: '320px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '100px',
                bgcolor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                height: 40,
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
              },
            }}
            InputProps={{
              startAdornment: <IconSearch size={18} style={{ marginRight: '8px', opacity: 0.4 }} />,
            }}
          />

          <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1, justifyContent: { md: 'center' } }}>
            {[
              { label: t('All Posts'), value: 'all', count: counts.all },
              { label: t('Published'), value: 'published', count: counts.published },
              { label: t('Draft'), value: 'draft', count: counts.draft },
            ].map((item) => (
              <Chip
                key={item.value}
                label={`${item.label} (${item.count})`}
                onClick={() => setFilter(item.value)}
                variant={filter === item.value ? 'filled' : 'outlined'}
                sx={{
                  borderRadius: '100px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  height: 34,
                  px: 1.5,
                  bgcolor: filter === item.value ? '#6366f1' : 'rgba(255,255,255,0.08)',
                  color: filter === item.value ? 'white' : 'rgba(3,14,9,0.6)',
                  borderColor: filter === item.value ? '#6366f1' : 'rgba(255,255,255,0.15)',
                  backdropFilter: filter === item.value ? 'none' : 'blur(8px)',
                  boxShadow: filter === item.value ? '0px 2px 8px rgba(99,102,241,0.25)' : 'none',
                  '&:hover': {
                    bgcolor: filter === item.value ? '#6366f1' : 'rgba(255,255,255,0.15)',
                  },
                }}
              />
            ))}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              select
              size="small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              SelectProps={{ native: true }}
              sx={{
                minWidth: 120,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '100px',
                  height: 34,
                  bgcolor: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  '& fieldset': { borderColor: 'transparent' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                },
              }}
            >
              <option value="newest">{t('Latest')}</option>
              <option value="oldest">{t('Oldest')}</option>
              <option value="popular">{t('Popular')}</option>
            </TextField>
          </Stack>
        </Stack>
      </Box>

      <BlogListing />
    </PageContainer>
  );
};

const Blog = () => {
  return (
    <BlogProvider>
      <BlogContent />
    </BlogProvider>
  );
};

export default Blog;
