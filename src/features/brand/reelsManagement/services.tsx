import { apiCall } from "@/API/apiClient";
import type { FilterType } from "./types";
export async function addReelService(data: any) {
    const productIds = (data.products || []).join(',');
    const form = new FormData();
    form.append('Title', data.title);
    form.append('Video', data.video);
    form.append('Status', data.status || 'draft');
    form.append('ProductIds', productIds);
    const response = await apiCall.post('/ReelManagement', form, {
        headers: { "Content-Type": undefined },
    })
    return response
}
export async function getAllReelsService(filter: FilterType) {
    const params = new URLSearchParams()
    if (filter.Search) params.append('Search', filter.Search)
    if (filter.Status) params.append('Status', filter.Status)
    if (filter.Sort) params.append('Sort', filter.Sort)
    if (filter.Page) params.append('PageIndex', filter.Page.toString())

    const response = await apiCall.get(`/ReelManagement/Reels?${params}`)
    return response.data
}
export async function getReelById(id: string) {
    const response = await apiCall.get(`/ReelManagement/${id}`)
    return response.data
}
export async function getReelComments(reelId: string, page?: string) {
    const params = new URLSearchParams();
    if (page) {
        params.set("pageNumber", page);
    }
    params.set("pageSize", "10");
    const response = await apiCall.get(`/ReelComment/${reelId}?${params.toString()}`);
    return response.data;
}
export async function AddCommentForReel(reelId: number, content: string) {
    const response = await apiCall.post(`/ReelComment/AddComment`, { content, reelId: reelId });
    return response.data;
}
export async function toggleLikeComment(commentId: number) {
    const response = await apiCall.post(`/ReelComment/toggle-like`, { commentId });
    return response.data;
}
export async function AddReplyToComment(commentId: number, content: string) {
    const response = await apiCall.post(`/CommentReply/reply`, { content, commentId: commentId });
    return response.data;
}
export async function getCommentReplies(commentId: number, page?: number) {
    const params = new URLSearchParams();
    if (page) {
        params.set("pageNumber", page.toString());
    }
    params.set("pageSize", "5");
    const response = await apiCall.get(`/CommentReply/${commentId}?${params.toString()}`);
    return response.data;
}
export async function toggleLikeReply(replyId: number) {
    const response = await apiCall.post(`/CommentReply/toggle-reply-like`, { replyId });
    return response.data;
}
export async function editReel(data: any) {
    const form = new FormData();
    form.append("ReelId", data.ReelId);
    form.append("Title", data.Title);
    form.append("Status", data.Status || 'draft');
    form.append("ProductIds", data.ProductIds.length > 0 ? data.ProductIds.join(',') : '');
    form.append("ClearProducts", data.ClearProducts);
    const response = await apiCall.patch(`/ReelManagement`, form, {
        headers: { "Content-Type": undefined },
    });
    return response.data;

}
export async function toggleLikeReel(reelId: number) {
    const response = await apiCall.post(`/Reel/toggle-like/${reelId}`);
    return response.data;
}
export async function getProductsForBrand(params: {
    pageIndex?: number;
    pageSize?: number;
    search?: string;
    selectedProductIds?: number[];
}) {
    const searchParams = new URLSearchParams();
    if (params.pageIndex) searchParams.append('PageIndex', params.pageIndex.toString());
    if (params.pageSize) searchParams.append('PageSize', params.pageSize.toString());
    if (params.search) searchParams.append('Search', params.search);
    if (params.selectedProductIds?.length) {
        params.selectedProductIds.forEach(id => searchParams.append('SelectedProductIds', id.toString()));
    }
    const response = await apiCall.get(`/ReelManagement/Products?${searchParams}`);
    return response.data;
}
export async function deleteReel(reelId: number) {
    const response = await apiCall.delete(`/ReelManagement?reelId=${reelId}`);
    return response.data;

}