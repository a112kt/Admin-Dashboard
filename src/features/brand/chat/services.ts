import { apiCall } from "@/API/apiClient";
import axios from "axios";
const chatBootUrl =
  process.env.NEXT_PUBLIC_CHAT_BOT_URL || "https://chatbot.ai.alluvo.life";
export async function getRoomList() {
  const res = await apiCall.get("/chat/rooms");
  return res.data;
}
export async function getRoomMessages(data: {
  roomIdEncr: string | null;
  page: number;
  unreadOnly?: boolean;
  afterMessageId?: string;
}) {
  const { roomIdEncr, page, unreadOnly, afterMessageId } = data;
  const res = await apiCall.get(
    `/Chat/rooms/${encodeURIComponent(roomIdEncr || "")}/messages`,
    {
      params: {
        page,
        unreadOnly,
        //   afterMessageId: afterMessageId ?? "",
        pageSize: 30,
      },
    },
  );
  return res.data;
}
export async function sendMessgae(data: {
  roomIdEncr: string;
  textEncr: string;
}) {
  const res = await apiCall.post("/Chat/message", data);
  return res.data;
}
export async function markAsRead(data: {
  messageIds: string[];
  roomId: string;
  status: string;
}) {
  const res = await apiCall.post("/Chat/status", data);
  return res.data;
}
export async function getUnReadCount(roomIdEncr: string) {
  const res = await apiCall.get(
    "/Chat/rooms/unreadCount/" + encodeURIComponent(roomIdEncr || ""),
  );
  return res.data;
}
export async function DeleteChat(roomIdEnc: string) {
  const res = await apiCall.delete(
    `/Chat/room/${encodeURIComponent(roomIdEnc)}`,
  );
  return res.data;
}
export async function createNewChat(userI: string) {
  const res = await apiCall.post(`/Chat/room/test?userId=${userI}`);
  return res.data;
}
export async function DeleteMessage(messageIdEncr: string) {
  const res = await apiCall.delete(
    `/Chat/message/${encodeURIComponent(messageIdEncr)}`,
  );
  return res.data;
}
export async function ChatBootMessaging(query: string) {
  const res = await axios.post(
    "/api/chat",
    { query },
    { baseURL: chatBootUrl, timeout: 60000 },
  );
  return res.data;
}
export async function getBrandOwnerId(brandId: number) {
  const res = await apiCall.get(`/BrandOwner/${brandId}`);
  return res.data;
}
