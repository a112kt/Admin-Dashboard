type attachType = {
  icon?: string;
  file?: string;
  fileSize?: string;
};

export interface ChatsType {
  id: number | string;
  name: string;
  status: string;
  thumb: string;
  recent: boolean;
  excerpt: string;
  messages: MessageType[];
}

export type RoomType = {
  roomIdEnc: string;
  roomIdDec: string;
  userName: string;
  userImageUrl: string;
  unreadCount: number;
  lastMessage: string | null;
  lastMessageAt: string | null;
};
export type MessageType = {
  messageIdEncr: string;
  roomIdEncr: string;
  senderIdEncr: string;
  textEncr: string;
  imageUrlEncr: string | null;
  status: string;
  createdAt: string;
};

export type DecryptedMessageType = MessageType & {
  decryptedText: string;
  messageIdDec?: string;
  isMyMessage: boolean;
};
export type ChatBootMessageType = {
  id: string;
  text: string;
  isQuery: boolean;
  createdAt: string;
};
