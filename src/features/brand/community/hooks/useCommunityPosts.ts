import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPosts,
  getPost,
  createPost as createPostService,
  editPost as editPostService,
  deletePost as deletePostService,
  togglePostLike as togglePostLikeService,
  updatePostStatus as updatePostStatusService,
} from "../services";
import type {
  GetCommunityPostsReq,
  GetCommunityPostsRes,
  GetPostRes,
  EditPostReq,
} from "../types";

export const POSTS_KEY = "community-posts";
export const POST_KEY = "community-post";

// ─── Queries ──────────────────────────────────────────────

export function usePosts(params: GetCommunityPostsReq) {
  return useQuery<GetCommunityPostsRes>({
    queryKey: [POSTS_KEY, params],
    queryFn: async () => {
      const res = await getPosts(params);
      return res!.data as GetCommunityPostsRes;
    },
  });
}

export function usePost(postId: number | null) {
  return useQuery<GetPostRes>({
    queryKey: [POST_KEY, postId],
    queryFn: async () => {
      const res = await getPost(postId!);
      return res!.data as GetPostRes;
    },
    enabled: postId !== null && postId !== undefined,
  });
}

// ─── Mutations ────────────────────────────────────────────

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      data,
      coverImage,
    }: {
      data: Parameters<typeof createPostService>[0];
      coverImage: File | null;
    }) => createPostService(data, coverImage),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [POSTS_KEY] });
    },
  });
}

export function useEditPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: EditPostReq) => editPostService(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [POSTS_KEY] });
      qc.invalidateQueries({ queryKey: [POST_KEY] });
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => deletePostService(postId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [POSTS_KEY] });
    },
  });
}

export function useUpdatePostStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, status }: { postId: number; status: string }) =>
      updatePostStatusService(postId, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [POSTS_KEY] });
      qc.invalidateQueries({ queryKey: [POST_KEY] });
    },
  });
}

export function useTogglePostLike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => togglePostLikeService(postId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [POST_KEY] });
    },
  });
}
