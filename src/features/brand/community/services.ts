import { apiCall } from "@/API/apiClient";
import type {
  CreatePostReq,
  EditPostReq,
  GetCommunityPostsReq,
  CreatePostCommentReq,
  UpdatePostCommentReq,
  GetPostRes,
  PostCommentRes,
  GetCommunityPostsRes,
  TogglePostLikeRes,
  ToggleCommentLikeRes,
  CreatePostRes,
  EditPostRes,
  ApiResponse,
} from "./types";

// ─── Post endpoints ───────────────────────────────────────

export async function getPosts(params: GetCommunityPostsReq) {
  const query: Record<string, string> = {};
  if (params.status && params.status !== "all") query.Status = params.status;
  if (params.search) query.Search = params.search;
  if (params.sort) query.Sort = params.sort;
  query.PageIndex = String(params.pageIndex ?? 1);
  query.PageSize = String(params.pageSize ?? 12);

  const qs = new URLSearchParams(query).toString();
  const res = await apiCall.get<ApiResponse<GetCommunityPostsRes>>(`/Community/Posts?${qs}`);
  return res.data;
}

export async function getPost(postId: number) {
  const res = await apiCall.get<ApiResponse<GetPostRes>>(`/Community/${postId}`);
  return res.data;
}

export async function createPost(data: CreatePostReq, coverImage: File | null) {
  const formData = new FormData();
  formData.append("Title", data.title);
  formData.append("Content", data.content ?? "");
  if (data.status) formData.append("Status", data.status);
  formData.append("CommentsEnabled", String(data.commentsEnabled ?? true));
  if (coverImage) formData.append("CoverImage", coverImage);

  const res = await apiCall.post<ApiResponse<CreatePostRes>>("/Community", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function editPost(data: EditPostReq) {
  const params: Record<string, string> = {};
  params.PostId = String(data.postId);
  if (data.title !== undefined) params.Title = data.title;
  if (data.content !== undefined) params.Content = data.content;
  if (data.status !== undefined) params.Status = data.status;
  if (data.commentsEnabled !== undefined) params.CommentsEnabled = String(data.commentsEnabled);

  const res = await apiCall.patch<ApiResponse<EditPostRes>>("/Community", null, { params });
  return res.data;
}

export async function updatePostStatus(postId: number, status: string) {
  const res = await apiCall.patch<ApiResponse<EditPostRes>>("/Community/Status", null, {
    params: { postId, status },
  });
  return res.data;
}

export async function deletePost(postId: number) {
  const res = await apiCall.delete<ApiResponse<boolean>>(`/Community/${postId}`);
  return res.data;
}

export async function togglePostLike(postId: number) {
  const res = await apiCall.get<ApiResponse<TogglePostLikeRes>>(`/Community/${postId}/PostLike`);
  return res.data;
}

// ─── Comment endpoints ─────────────────────────────────────

export async function getPostComments(postId: number) {
  const res = await apiCall.get<ApiResponse<PostCommentRes[]>>(`/PostComment/Post/${postId}`);
  return res.data;
}

export async function createComment(data: CreatePostCommentReq) {
  const res = await apiCall.post<ApiResponse<number>>("/PostComment", data);
  return res.data;
}

export async function updateComment(data: UpdatePostCommentReq) {
  const res = await apiCall.patch<ApiResponse<boolean>>("/PostComment", data);
  return res.data;
}

export async function deleteComment(commentId: number) {
  const res = await apiCall.delete<ApiResponse<boolean>>(`/PostComment/${commentId}`);
  return res.data;
}

export async function toggleCommentLike(commentId: number) {
  const res = await apiCall.get<ApiResponse<ToggleCommentLikeRes>>(`/PostComment/${commentId}/Like`);
  return res.data;
}
