import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPostComments,
  createComment as createCommentService,
  updateComment as updateCommentService,
  deleteComment as deleteCommentService,
  toggleCommentLike as toggleCommentLikeService,
} from "../services";
import type { PostCommentRes } from "../types";
import { POST_KEY } from "./useCommunityPosts";

const COMMENTS_KEY = "post-comments";

// ─── Queries ──────────────────────────────────────────────

export function usePostComments(postId: number | null) {
  return useQuery<PostCommentRes[]>({
    queryKey: [COMMENTS_KEY, postId],
    queryFn: async () => {
      const res = await getPostComments(postId!);
      return res.data as PostCommentRes[];
    },
    enabled: postId !== null && postId !== undefined,
  });
}

// ─── Mutations ────────────────────────────────────────────

export function useCreateComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof createCommentService>[0]) => createCommentService(data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: [COMMENTS_KEY, variables.postId] });
      qc.invalidateQueries({ queryKey: [POST_KEY, variables.postId] });
    },
  });
}

export function useUpdateComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof updateCommentService>[0]) => updateCommentService(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [COMMENTS_KEY] });
    },
  });
}

export function useDeleteComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, postId }: { commentId: number; postId: number }) =>
      deleteCommentService(commentId),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: [COMMENTS_KEY, variables.postId] });
    },
  });
}

export function useToggleCommentLike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => toggleCommentLikeService(commentId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [COMMENTS_KEY] });
    },
  });
}
