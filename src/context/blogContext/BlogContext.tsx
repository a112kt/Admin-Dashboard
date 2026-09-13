'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { usePosts } from '@/features/brand/community/hooks/useCommunityPosts';
import { useCreateComment } from '@/features/brand/community/hooks/usePostComments';
import type { PostInCommunityPostsRes } from '@/features/brand/community/types';

export interface BlogCommentType {
  id: string;
  profile: {
    avatar: string;
    name: string;
    time: string;
    brandId?: string;
  };
  comment: string;
  replies?: BlogCommentType[] | any[];
}

export interface BlogPostType {
  id: string;
  title: string;
  slug: string;
  coverImg: string;
  author: {
    name: string;
    avatar: string;
    brandId: string;
  };
  createdAt: string;
  view: number;
  comments: BlogCommentType[];
  category: string;
  featured: boolean;
  status: 'published' | 'draft';
  content?: string;
  brandId?: string;
  brandLogoUrl?: string;
}

export interface BlogContextProps {
  posts: BlogPostType[];
  sortBy: string;
  setSortBy: (sort: string) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  addComment: (postId: string, comment: BlogCommentType) => void;
  filter: string;
  setFilter: (filter: string) => void;
  search: string;
  setSearch: (search: string) => void;
  pageIndex: number;
  setPageIndex: (page: number) => void;
  totalPages: number;
  totalPosts: number;
  counts: { all: number; published: number; draft: number };
  error: string | null;
  refresh: () => void;
}

const noop = () => {};

export const BlogContext = createContext<BlogContextProps>({
  posts: [],
  sortBy: 'newest',
  setSortBy: noop,
  isLoading: false,
  setLoading: noop,
  addComment: noop,
  filter: 'all',
  setFilter: noop,
  search: '',
  setSearch: noop,
  pageIndex: 1,
  setPageIndex: noop,
  totalPages: 1,
  totalPosts: 0,
  counts: { all: 0, published: 0, draft: 0 },
  error: null,
  refresh: noop,
});

// ─── Mapper ───────────────────────────────────────────────

function mapListItem(item: PostInCommunityPostsRes): BlogPostType {
  return {
    id: String(item.postId),
    title: item.title,
    slug: item.slug,
    coverImg: item.coverImageUrl,
    author: { name: item.brandOwnerName, avatar: item.brandLogoUrl, brandId: String(item.brandId) },
    createdAt: item.createdAt,
    view: 0,
    comments: [],
    category: item.brandName,
    featured: false,
    status: item.status as 'published' | 'draft',
  };
}

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 12;

  const handleSetFilter = (f: string) => {
    setFilter(f);
    setPageIndex(1);
  };
  const handleSetSearch = (s: string) => {
    setSearch(s);
    setPageIndex(1);
  };
  const handleSetSortBy = (s: string) => {
    setSortBy(s);
    setPageIndex(1);
  };

  const { data: pagedPosts, isLoading, error, refetch } = usePosts({
    status: filter,
    search: search || undefined,
    sort: sortBy === 'newest' ? 'latest' : sortBy,
    pageIndex,
    pageSize,
  });

  const { mutateAsync: createCommentMutation } = useCreateComment();

  const posts: BlogPostType[] = (pagedPosts?.data ?? []).map(mapListItem);

  const addComment = async (_postId: string, _comment: BlogCommentType) => {
    try {
      await createCommentMutation({
        postId: Number(_postId),
        content: _comment.comment,
      });
    } catch {
      // handled by detail page directly
    }
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        sortBy,
        setSortBy: handleSetSortBy,
        isLoading,
        setLoading: noop,
        addComment,
        filter,
        setFilter: handleSetFilter,
        search,
        setSearch: handleSetSearch,
        pageIndex: pagedPosts?.pagination?.page ?? 1,
        setPageIndex,
        totalPages: pagedPosts?.pagination?.totalPages ?? 1,
        totalPosts: pagedPosts?.pagination?.totalItems ?? 0,
        counts: pagedPosts?.counts ?? { all: 0, published: 0, draft: 0 },
        error: error?.message ?? null,
        refresh: refetch,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
