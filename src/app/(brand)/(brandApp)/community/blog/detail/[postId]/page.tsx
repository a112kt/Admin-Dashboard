'use client'
import BlogDetail from "@/features/brand/community/components/detail";
import PageContainer from '@/components/ui/container/PageContainer';
import { BlogProvider } from '@/context/blogContext/BlogContext';
import { useTranslation } from 'react-i18next';

const BlogPost = () => {
  const { t } = useTranslation();
  return (
    <BlogProvider>
      <PageContainer title={t('Article Detail')} description="Article detail page">
        <BlogDetail />
      </PageContainer>
    </BlogProvider>
  );
};

export default BlogPost;
