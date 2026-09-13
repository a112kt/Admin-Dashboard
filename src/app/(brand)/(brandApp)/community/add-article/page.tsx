'use client'
import React, { useState, useCallback } from 'react'
import { Button, Stack, Typography, Box, Switch, Breadcrumbs, Alert, Divider } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BlankCard from '@/components/shared/BlankCard';
import CustomFormLabel from "@/components/ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/ui/forms/theme-elements/CustomTextField";
import dynamic from "next/dynamic";
import { useDropzone } from "react-dropzone";
import { IconCloudUpload } from "@tabler/icons-react";
import PageContainer from '@/components/ui/container/PageContainer';
import { useCreatePost } from '@/features/brand/community/hooks/useCommunityPosts';
import { useTranslation } from 'react-i18next';

const TiptapEditor = dynamic(
  () => import("@/components/ui/forms/form-tiptap/TiptapEditor"),
  { ssr: false }
);

function BlogCreatePage() {
  const router = useRouter();
  const { mutateAsync: createPost, isPending } = useCreatePost();
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [enableComments, setEnableComments] = useState(true);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const handlePublish = async (status: 'published' | 'draft') => {
    if (!title.trim()) {
      setError(t('Title is required.'));
      return;
    }
    setError('');
    try {
      await createPost({
        data: { title, content, status, commentsEnabled: enableComments },
        coverImage: coverFile,
      });
      router.push('/community/blog');
    } catch (err: any) {
      setError(err?.response?.data?.message?.en || t('Failed to create post.'));
    }
  };

  return (
    <PageContainer title="Blog" description="Create blog post">
      <Box
        sx={{
          bgcolor: '#1b2351',
          borderRadius: '20px',
          px: '30px',
          py: '16px',
          my: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            sx={{ fontFamily: '"Onest", sans-serif', fontWeight: 600, fontSize: '20px', color: 'white', mb: 0.5 }}
          >
            {t('Blog')}
          </Typography>
          <Breadcrumbs
            separator={
              <Typography sx={{ fontFamily: '"Onest", sans-serif', fontWeight: 500, fontSize: '16px', color: 'rgba(255,255,255,0.1)' }}>
                /
              </Typography>
            }
          >
            <Link href="/home" passHref>
              <Typography sx={{ fontFamily: '"Onest", sans-serif', fontWeight: 500, fontSize: '16px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                {t('Home')}
              </Typography>
            </Link>
            <Typography sx={{ fontFamily: '"Onest", sans-serif', fontWeight: 500, fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>
              {t('Create Article')}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ width: 147, height: 40 }} />
      </Box>

      {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

      <BlankCard>
        <Box sx={{ p: 3 }}>
          <Typography
            sx={{
              fontFamily: '"Onest", sans-serif',
              fontWeight: 600,
              fontSize: '28px',
              color: '#030e09',
              mb: '20px',
            }}
          >
            {t('Post Details')}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Stack direction="row" gap="24px" alignItems="center">
              <CustomFormLabel htmlFor="post-title" sx={{ width: '249px', mt: 0, mb: 0, flexShrink: 0, fontFamily: '"Onest", sans-serif', fontWeight: 500, fontSize: '14px', color: '#030e09' }}>
                {t('Title')}
              </CustomFormLabel>
              <CustomTextField
                id="post-title"
                placeholder={t('Write your post title main heading')}
                fullWidth
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    height: '40px',
                    '& fieldset': { borderColor: 'rgba(3,14,9,0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(3,14,9,0.3)' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                  '& input::placeholder': {
                    fontFamily: '"Onest", sans-serif',
                    fontSize: '14px',
                    color: 'rgba(3,14,9,0.6)',
                    opacity: 1,
                  },
                }}
              />
            </Stack>

            <Stack direction="row" gap="24px" alignItems="flex-start">
              <CustomFormLabel sx={{ width: '249px', mt: 0, mb: 0, flexShrink: 0, fontFamily: '"Onest", sans-serif', fontWeight: 500, fontSize: '14px', color: '#030e09' }}>
                {t('Content')}
              </CustomFormLabel>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <TiptapEditor value={content} onChange={setContent} />
              </Box>
            </Stack>

            <Stack direction="row" gap="24px" alignItems="flex-start">
              <CustomFormLabel sx={{ width: '249px', mt: 0, mb: 0, flexShrink: 0, fontFamily: '"Onest", sans-serif', fontWeight: 500, fontSize: '14px', color: '#030e09' }}>
                {t('Image / Cover')}
              </CustomFormLabel>
              <Box
                {...getRootProps()}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  border: '2px dashed',
                  borderColor: '#1b2351',
                  borderRadius: '10px',
                  bgcolor: isDragActive ? '#e8e8e8' : '#f5f5f5',
                  p: coverPreview ? 1 : '40px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: '#1b2351', bgcolor: '#e8e8e8' },
                }}
              >
                <input {...getInputProps()} />
                {coverPreview ? (
                  <Box
                    component="img"
                    src={coverPreview}
                    sx={{ maxHeight: 200, mx: 'auto', borderRadius: 1 }}
                  />
                ) : (
                  <>
                    <IconCloudUpload size={40} color="#1b2351" />
                    <Typography
                      sx={{
                        fontFamily: '"Onest", sans-serif',
                        fontWeight: 500,
                        fontSize: '18px',
                        color: '#030e09',
                        mt: '15px',
                      }}
                    >
                      {t('Drop or select file')}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Onest", sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: 'rgba(3,14,9,0.8)',
                        mt: '5px',
                      }}
                    >
                      Drop your image here or click to{' '}
                      <Box
                        component="span"
                        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                      >
                        browse
                      </Box>
                      {' '}through your machine.
                    </Typography>
                  </>
                )}
              </Box>
            </Stack>

            <Stack direction="row" gap="24px" alignItems="center" sx={{ py: '12px' }}>
              <CustomFormLabel sx={{ width: '249px', mt: 0, mb: 0, flexShrink: 0, fontFamily: '"Onest", sans-serif', fontWeight: 500, fontSize: '14px', color: '#030e09' }}>
                Comments
              </CustomFormLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Switch
                  checked={enableComments}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEnableComments(e.target.checked)}
                  sx={{
                    width: 40,
                    height: 24,
                    padding: 0,
                    '& .MuiSwitch-switchBase': {
                      padding: '2px',
                      '&.Mui-checked': {
                        transform: 'translateX(16px)',
                        color: 'white',
                        '& + .MuiSwitch-track': {
                          backgroundColor: '#47c0d2',
                          opacity: 1,
                          border: 'none',
                        },
                      },
                    },
                    '& .MuiSwitch-thumb': {
                      width: 20,
                      height: 20,
                      boxShadow: 'none',
                    },
                    '& .MuiSwitch-track': {
                      borderRadius: 12,
                      backgroundColor: '#e0e0e0',
                      opacity: 1,
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: '"Onest", sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: 'rgba(3,14,9,0.6)',
                  }}
                >
                  {t('Enable comments')}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </BlankCard>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          variant="outlined"
          onClick={() => handlePublish("draft")}
          disabled={isPending}
          sx={{
            fontFamily: '"Onest", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            color: '#030e09',
            borderColor: 'rgba(3,14,9,0.2)',
            borderRadius: '10px',
            px: '16px',
            py: '10px',
            textTransform: 'none',
            '&:hover': {
              borderColor: 'rgba(3,14,9,0.4)',
              bgcolor: 'rgba(3,14,9,0.04)',
            },
          }}
        >
          {t('Save as Draft')}
        </Button>
        <Button
          variant="contained"
          onClick={() => handlePublish("published")}
          disabled={isPending}
          sx={{
            fontFamily: '"Onest", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            color: 'white',
            bgcolor: '#47c0d2',
            borderRadius: '10px',
            px: '16px',
            py: '10px',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#3aabb8',
            },
          }}
        >
          {isPending ? t('Saving...') : t('Save & Publish')}
        </Button>
      </Stack>
    </PageContainer>
  )
}

export default BlogCreatePage
