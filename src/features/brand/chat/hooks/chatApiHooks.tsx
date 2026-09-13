import { useQuery, useMutation } from "@tanstack/react-query"
import { getRoomList, getRoomMessages, sendMessgae, markAsRead, getUnReadCount, DeleteChat, createNewChat, DeleteMessage, ChatBootMessaging, getBrandOwnerId } from "../services"
import { decrypt } from "@/utils/helpers/chatHelpers"

export function useRoomList() {
    return useQuery({
        queryKey: ["roomList"],
        queryFn: async () => {
            const res = await getRoomList();
            if (res && Array.isArray(res.data)) {
                const decryptedRooms = await Promise.all(
                    res.data.map(async (room: any) => {
                        const roomIdDec = await decrypt(room.roomIdEnc);
                        const lastMessage = room.lastMessage
                            ? await decrypt(room.lastMessage)
                            : null;
                        return { ...room, roomIdDec, lastMessage };
                    })
                );
                return { ...res, data: decryptedRooms };
            }
            return res;
        },
        refetchOnWindowFocus: true,
        // refetchOnReconnect: false,
    })
}
export function useGetMessages(data: {
    roomIdEncr: string | null;
    page: number;
    unreadOnly?: boolean;
    afterMessageId?: string;
}) {
    // console.log(data.roomIdEncr)
    return useQuery({
        queryKey: ["messages", data.roomIdEncr, data.page],
        queryFn: () => getRoomMessages(data),
        enabled: !!data.roomIdEncr
    })
}
export function useSendMessage() {
    return useMutation({
        mutationFn: (message: {
            roomIdEncr: string;
            textEncr: string;
        }) => sendMessgae(message),
        onSuccess: () => {
            // alert("Message sent successfully");
        },
        onError: (error) => {
            // console.log("Error sending message", error);
        }
    })
}
export function useMarkAsRead() {
    return useMutation({
        mutationFn: (data: {
            messageIds: string[],
            roomId: string,
            status: string
        }) => markAsRead(data),
        onSuccess: () => {
            // alert("Message sent successfully");
        },
        onError: (error) => {
            // console.log("Error sending message", error);
        }
    })
}
export function useUnreadCount(roomIdEncr: string | null) {
    return useQuery({
        queryKey: ["unreadCount", roomIdEncr],
        queryFn: () => getUnReadCount(roomIdEncr || ""),
        enabled: !!roomIdEncr
    })
}
export function useDeleteChat() {
    return useMutation({
        mutationFn: (roomIdEnc: string) => DeleteChat(roomIdEnc),
    })
}
export function useCreateNewChat() {
    return useMutation({
        mutationFn: (userId: string) => createNewChat(userId),
    })
}
export function useDeleteMessage() {
    return useMutation({
        mutationFn: (messageIdEncr: string) => DeleteMessage(messageIdEncr),

    })
}
export function useChatBootMessaging() {
    return useMutation({
        mutationFn: (query: string) => ChatBootMessaging(query),
    })
}
export function useGetBrandOwnerId(brandId: number) {
    return useQuery({
        queryKey: ["brandOwnerId", brandId],
        queryFn: () => getBrandOwnerId(brandId),
        enabled: !!brandId
    })
}