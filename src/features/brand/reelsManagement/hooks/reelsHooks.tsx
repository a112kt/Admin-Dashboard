import { AddCommentForReel, addReelService, AddReplyToComment, editReel, getAllReelsService, getCommentReplies, getProductsForBrand, getReelById, getReelComments, toggleLikeComment, toggleLikeReply, toggleLikeReel } from "../services";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { FilterType } from "../types";

export const useAddReel = () => {
    return useMutation({ mutationFn: (data: any) => addReelService(data) });
}
export const useGetAllReels = (filter: FilterType) => {
    return useQuery({
        queryKey: ["all-reels", filter], queryFn: () => getAllReelsService(filter),

    });
}
export const useGetReelById = (id: string) => {
    return useQuery({ queryKey: ["reel-by-id", id], queryFn: () => getReelById(id), enabled: !!id });
}
export const useGetReelComments = (reelId: string, page?: string) => {
    return useQuery({
        queryKey: ["reelsComments", reelId, page],
        queryFn: () => getReelComments(reelId, page),
        retry: true,
        refetchOnWindowFocus: false,
        staleTime: 0,
        gcTime: 0,

    });
};
export const useAddCommentForReel = () => {
    return useMutation({
        mutationFn: ({ reelId, content }: { reelId: number; content: string }) =>
            AddCommentForReel(reelId, content),
    });
};
export const useToggleLikeComment = () => {
    return useMutation({
        mutationFn: (commentId: number) => toggleLikeComment(commentId),
    });
};
export const useAddReplyToComment = () => {
    return useMutation({
        mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
            AddReplyToComment(commentId, content),
    });
};
export const useGetCommentReplies = (commentId: number, page?: number) => {
    return useQuery({
        queryKey: ["commentReplies", commentId, page],
        queryFn: () => getCommentReplies(commentId, page),
        retry: true,
        refetchOnWindowFocus: false,
        staleTime: 0,
        gcTime: 0,

    });
}
export const useToggleLikeReply = () => {
    return useMutation({
        mutationFn: (replyId: number) => toggleLikeReply(replyId),
    });
};
export const useEditReel = () => {
    return useMutation({
        mutationFn: (data: { ReelId: string; Title: string; Status?: string; ProductIds: number[]; ClearProducts: boolean }) => editReel(data),
    })
}
export const useToggleReelLike = () => {
    return useMutation({
        mutationFn: (reelId: number) => toggleLikeReel(reelId),
    });
};
export const useGetProductsForBrand = (params: {
    pageIndex?: number;
    pageSize?: number;
    search?: string;
    selectedProductIds?: number[];
}) => {
    return useQuery({
        queryKey: ["products-for-brand", params],
        queryFn: () => getProductsForBrand(params),
        staleTime: 30000,
    });
};