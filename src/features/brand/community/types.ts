// ─── Request DTOs (matching backend exactly) ───────────────

export interface CreatePostReq {
  title: string;
  content: string;
  status?: string;
  commentsEnabled?: boolean;
}

export interface EditPostReq {
  postId: number;
  title?: string;
  content?: string;
  status?: string;
  commentsEnabled?: boolean;
}

export interface GetCommunityPostsReq {
  status?: string;
  search?: string;
  sort?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface CreatePostCommentReq {
  postId: number;
  content: string;
  parentCommentId?: number;
}

export interface UpdatePostCommentReq {
  commentId: number;
  content: string;
}

// ─── Response DTOs (matching backend exactly) ─────────────

export interface CreatePostRes {
  postId: number;
}

export interface EditPostRes {
  postId: number;
}

export interface GetPostRes {
  title: string;
  slug: string;
  content: string;
  coverImageUrl: string;
  status: string;
  commentsEnabled: boolean;
  createdAt: string;
  brandId: number;
  brandName: string;
  brandOwnerName: string;
  brandLogoUrl: string;
  commentsCount: number;
  likesCount: number;
  isLiked: boolean;
  isByMe: boolean;
}

export interface PostInCommunityPostsRes {
  postId: number;
  title: string;
  slug: string;
  coverImageUrl: string;
  status: string;
  createdAt: string;
  brandId: number;
  brandName: string;
  brandOwnerName: string;
  brandLogoUrl: string;
}

export interface PostCommentRes {
  commentId: number;
  brandId: number;
  brandName: string;
  brandOwnerName: string;
  brandLogoUrl: string;
  brandOwnerImageUrl: string;
  createdAt: string;
  content: string;
  likesCount: number;
  repliesCount: number;
  isliked: boolean;
  replies: PostCommentRes[];
}

export interface CommunityPostsCountsRes {
  all: number;
  published: number;
  draft: number;
}

export interface PaginationRes {
  page: number;
  totalPages: number;
  totalItems: number;
}

export interface PagedResponse<T> {
  data: T[];
  pagination: PaginationRes;
}

export interface GetCommunityPostsRes extends PagedResponse<PostInCommunityPostsRes> {
  counts: CommunityPostsCountsRes;
}

export interface TogglePostLikeRes {
  isLiked: boolean;
  likesCount: number;
}

export interface ToggleCommentLikeRes {
  isLiked: boolean;
  likesCount: number;
}

// ─── Generic API response wrapper ─────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: { en: string; ar: string };
  data: T | null;
  errors: any[] | null;
}
