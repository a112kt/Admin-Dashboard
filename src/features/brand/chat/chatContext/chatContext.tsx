"use client"

import { createContext, useCallback, useEffect, useMemo, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { RoomType, MessageType, DecryptedMessageType, ChatBootMessageType } from "../types";
import { encrypt, decrypt, getCurrentUserId } from "@/utils/helpers/chatHelpers";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useGetMessages, useSendMessage, useMarkAsRead, useUnreadCount, useDeleteChat, useDeleteMessage, useChatBootMessaging } from "../hooks/chatApiHooks";
import { useQueryClient } from "@tanstack/react-query";

export const ChatContext = createContext<{
    connection: signalR.HubConnection | null,
    chatSearch: string,
    setChatSearch: (search: string) => void,
    selectedChat: RoomType | null,
    setSelectedChat: (chat: RoomType | null) => void,
    activeChatId: string | null,
    setActiveChatId: (id: string) => void,
    setEncryptedChatId: (id: string | null) => void,
    encryptedChatId: string | null,
    sendMessage: (msg: string) => void,
    chatMsgList: DecryptedMessageType[],
    isGetMessagesLoading: boolean,
    isGetMessagesFetching: boolean,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
    hasNextPage: boolean,
    userId: string | null,
    isSendMessagePending: boolean,
    roomUpdatedReadCount: { roomIdDec: string | null; count: number } | null,
    deleteChat: (roomIdEnc: string) => Promise<void>,
    isDeleteChatSuccess: boolean,
    lastMessageUpdate: { roomIdDec: string; lastMessage: string; lastMessageAt: string } | null,
    fetchLockRef: any,
    goToBottom: boolean,
    setGoToBottom: React.Dispatch<React.SetStateAction<boolean>>,
    setChatMsgList: React.Dispatch<React.SetStateAction<DecryptedMessageType[]>>,
    isChatBoot: boolean,
    setIsChatBoot: React.Dispatch<React.SetStateAction<boolean>>,
    sendQueryToChatBoot: (query: string) => void,
    chatBootMessages: ChatBootMessageType[],
    setChatBootMessages: React.Dispatch<React.SetStateAction<ChatBootMessageType[]>>,
    isSendQueryPending: boolean,
    isSendQuerySuccess: boolean,
    // setRoomUpdatedReadCount: React.Dispatch<React.SetStateAction<{ roomIdEncr: string; count: number }[]>>,
}>({
    connection: null,
    chatSearch: "",
    setChatSearch: () => { },
    selectedChat: null,
    setSelectedChat: () => { },
    activeChatId: null,
    setActiveChatId: () => { },
    sendMessage: () => { },
    chatMsgList: [],
    isGetMessagesLoading: false,
    isGetMessagesFetching: false,

    page: 1,
    setPage: () => { },
    hasNextPage: false,
    userId: null,
    setEncryptedChatId: () => { },
    encryptedChatId: null,
    isSendMessagePending: false,
    roomUpdatedReadCount: null,
    deleteChat: () => Promise.resolve(),
    isDeleteChatSuccess: false,
    lastMessageUpdate: null,
    fetchLockRef: { current: false },
    goToBottom: false,
    setGoToBottom: () => { },
    setChatMsgList: () => { },
    isChatBoot: false,
    setIsChatBoot: () => { },
    sendQueryToChatBoot: () => { },
    chatBootMessages: [],
    setChatBootMessages: () => { },
    isSendQueryPending: false,
    isSendQuerySuccess: false,
})


export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();
    const [goToBottom, setGoToBottom] = useState(false)
    const { token } = useContext(AuthContext);
    const { mutate: sendMessageMutate, data: sendMessageData, error: sendMessageError, isSuccess: isSendMessageSuccess, isPending: isSendMessagePending, isError: isSendMessageError } = useSendMessage()
    const { mutate: markAsReadMutate, data: markAsReadData, error: markAsReadError, isSuccess: isMarkAsReadSuccess, isPending: isMarkAsReadPending, isError: isMarkAsReadError } = useMarkAsRead()

    const [unReadCountRoomId, setUnreadCountRoomId] = useState<string | null>(null)
    const { data: unreadCount, isSuccess: isUnreadCountSuccess, isError: isUnreadCountError, refetch: unReadCountRefetch } = useUnreadCount(unReadCountRoomId)
    const { mutateAsync: deleteChat, isPending: isDeleteChatPending, isSuccess: isDeleteChatSuccess } = useDeleteChat();
    const [chatSearch, setChatSearch] = useState("");
    const [selectedChat, setSelectedChat] = useState<RoomType | null>(null);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [encryptedChatId, setEncryptedChatId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [isChatBoot, setIsChatBoot] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [lastMessageId, setLastMessageId] = useState<string | null>(null);
    const [roomUpdatedReadCount, setRoomUpdatedReadCount] = useState<{ roomIdDec: string | null; count: number } | null>(null);
    const [lastMessageUpdate, setLastMessageUpdate] = useState<{
        roomIdDec: string;
        lastMessage: string;
        lastMessageAt: string;
    } | null>(null);
    const [onGoingMessageQueue, setOnGoingMessageQueue] = useState<{
        roomIdEncr: string;
        textEncr: string;
        plainText: string;
        optimisticId: string;
    }[]>([])
    const [pendingMessage, setPendingMessage] = useState<{
        roomIdEncr: string;
        textEncr: string;
        plainText: string;
    } | null>(null)
    // const token = useMemo(() => {
    //     return localStorage.getItem("BrandToken") || "";
    // }, []);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [chatMsgList, setChatMsgList] = useState<DecryptedMessageType[]>([]);
    const fetchLockRef = useRef(false);
    const activeChatIdRef = useRef<string | null>(null);
    const selectedChatRef = useRef<RoomType | null>(null);
    const userIdRef = useRef<string | null>(null);

    activeChatIdRef.current = activeChatId;
    selectedChatRef.current = selectedChat;
    userIdRef.current = userId;


    // Reset state immediately during render when the active chat room changes.
    // This prevents race conditions and multiple page fetches during transition.
    const [prevActiveChatId, setPrevActiveChatId] = useState<string | null>(null);
    if (activeChatId !== prevActiveChatId) {
        setPrevActiveChatId(activeChatId);
        setPage(1);
        setChatMsgList([]);
    }
    const { data: roomMessages, isSuccess, isLoading: isGetMessagesLoading, isError, error, isFetching: isGetMessagesFetching } = useGetMessages({
        roomIdEncr: encryptedChatId,
        page,
        unreadOnly: false,
    })



    async function startConnection(connection: signalR.HubConnection | null) {
        try {
            if (connection) {
                await connection.start();
            }
        } catch (error) {
            console.error("Error starting connection:", error);
        }
    }
    //  connection events listeners
    useEffect(() => {
        console.log(unReadCountRoomId)
    }, [unReadCountRoomId])
    useEffect(() => {
        if (!connection) return;

        const onReceiveMessage = async (encryptedMsg: any) => {

            console.log("message recieved !")
            const decryptedRoomId = await decrypt(encryptedMsg?.roomIdEncr)
            const msg =
                { ...encryptedMsg, messageIdDec: await decrypt(encryptedMsg?.messageIdEncr), decryptedText: await decrypt(encryptedMsg?.textEncr) }
            if (decryptedRoomId === activeChatIdRef.current && !document.hidden) {
                console.log("i am pushing now ")
                setChatMsgList(prev => {
                    if (prev.some(m => m.messageIdDec === msg.messageIdDec)) return prev;
                    return [...prev, msg];
                })
                setGoToBottom(true)
                markAsReadMutate({
                    messageIds: [encryptedMsg?.messageIdEncr],
                    roomId: selectedChatRef.current?.roomIdEnc || "",
                    status: "Seen",
                });
            } else {
                setUnreadCountRoomId(encryptedMsg.roomIdEncr)
                unReadCountRefetch()
                markAsReadMutate({
                    messageIds: [encryptedMsg?.messageIdEncr],
                    roomId: encryptedMsg?.roomIdEncr || "",
                    status: "Delivered",
                });

            }

            setLastMessageUpdate({
                roomIdDec: decryptedRoomId,
                lastMessage: msg.decryptedText,
                lastMessageAt: encryptedMsg.createdAt,
            });

        };

        async function MarkMessagesAs(messageIds: string[], status = "Seen") {
            if (!messageIds || !Array.isArray(messageIds) || messageIds.length === 0) return;
            console.log(messageIds)
            setChatMsgList(prev =>
                prev.map(msg => {
                    if (messageIds.includes(msg?.messageIdDec || "")) {
                        return { ...msg, status: status };
                    }
                    return msg;
                })
            )

        }


        connection.on("OnReceiveMessage", onReceiveMessage);
        // connection.on("OnRoomDeleted", (plainRoomId) => {
        //     console.log("OnRoomDeleted received:", plainRoomId);
        //     // Remove the room from the local list

        // });



        connection.on("OnMessageSeen", (messageIds) => {
            console.log(messageIds, "on message seen")
            MarkMessagesAs(messageIds)
        });
        return () => {
            connection.off("OnReceiveMessage", onReceiveMessage);
            connection.off("OnMessageSeen", MarkMessagesAs);
        };
    }, [connection, encryptedChatId]);
    // end of connection events listeners

    useEffect(() => {
        if (!token) return;
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(
                `${process.env.NEXT_PUBLIC_APP_URL}/chatHub`,
                {
                    accessTokenFactory: () => token,
                    // i skipped the negotiation to avoid the cors issues on the /    negotiate POST request
                    // this requires using websockets only
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                },
            )
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        /// starting connection 
        const startPromise = connection.start().catch(() => { });
        setConnection(connection);

        return () => {
            if (connection) {
                (startPromise || Promise.resolve()).then(() => connection.stop()).catch(() => { });
            }
        };



    }, [token])
    useEffect(() => {
        if (isSuccess && roomMessages?.data?.data && userId) {
            const messages: MessageType[] = roomMessages.data.data;
            setHasNextPage(roomMessages.data?.meta?.hasNextPage)
            // Pre-decrypt all messages so components don't call async decrypt() during render
            Promise.all(
                messages.map(async (msg) => ({
                    ...msg,
                    messageIdDec: await decrypt(msg.messageIdEncr),
                    decryptedText: await decrypt(msg.textEncr),
                    isMyMessage: await decrypt(msg.senderIdEncr) === userId,
                    createdAt: msg.createdAt + "Z"
                }))
            ).then((decrypted) => {
                setChatMsgList((prev) => {
                    const newMessages = decrypted.filter(d => !prev.some(p => p.messageIdDec === d.messageIdDec));
                    const combined = [...prev, ...newMessages];
                    return combined.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                });
                const unreadMessageIds = decrypted.filter(msg => !msg.isMyMessage && msg.status !== "Seen").map(msg => msg.messageIdEncr);
                if (unreadMessageIds.length > 0) {
                    markAsReadMutate({
                        messageIds: unreadMessageIds,
                        roomId: selectedChat?.roomIdEnc || "",
                        status: "Seen",
                    });
                    queryClient.refetchQueries({ queryKey: ["roomList"] });
                }
                console.log("Messages added");
            }).finally(() => {
                fetchLockRef.current = false;
            })
            // console.log(roomMessages.data)
        }
        if (isError) {
            // toast.error(error?.data?.message)
            fetchLockRef.current = false;

        }
    }, [isSuccess, isError, roomMessages, userId])
    useEffect(() => {
        if (!token) return;
        const userId = getCurrentUserId(token)
        setUserId(userId)
    }, [])
    useEffect(() => {
        if (!selectedChat) {
            setActiveChatId(null)
            setEncryptedChatId(null)
        } else {
            setIsChatBoot(false)
            setActiveChatId(selectedChat?.roomIdDec)
            setEncryptedChatId(selectedChat?.roomIdEnc)
            setRoomUpdatedReadCount({
                roomIdDec: selectedChat?.roomIdDec,
                count: 0
            })
        }

    }, [selectedChat])
    useEffect(() => {
        if (isChatBoot) {
            setSelectedChat(null)
        }
    }, [isChatBoot])

    useEffect(() => {
        async function updateRoomUpdatedReadCount() {
            const roomId = await decrypt(unReadCountRoomId!)
            setRoomUpdatedReadCount({
                roomIdDec: roomId,
                count: unreadCount?.data
            })
        }
        if (isUnreadCountSuccess && unreadCount) {
            // console.log(unreadCount.data, "unreadCount.data")
            updateRoomUpdatedReadCount()
        }
    }, [isUnreadCountSuccess, unreadCount])






    const [chatBootMessages, setChatBootMessages] = useState<ChatBootMessageType[]>([])
    const { mutate: sendQuery, data: chatBootResponse, isPending: isSendQueryPending, isError: isSendQueryError, error: sendQueryError, isSuccess: isSendQuerySuccess } = useChatBootMessaging()


    function sendQueryToChatBoot(query: string) {
        setChatBootMessages(prev => ([...prev, {
            id: crypto.randomUUID(),
            text: query,
            isQuery: true,
            createdAt: new Date().toISOString()
        }]))
        setGoToBottom(true)
        sendQuery(query)

    }
    useEffect(() => {
        if (isSendQuerySuccess && chatBootResponse) {
            setChatBootMessages((prev) => [...prev, {
                id: crypto.randomUUID(),
                text: chatBootResponse.answer,
                isQuery: false,
                createdAt: new Date().toISOString()
            }])
            setGoToBottom(true)
        }
    }, [isSendQuerySuccess, chatBootResponse])


    const sendMessage = async (message: string) => {
        const textEncr = await encrypt(message)
        const roomIdEncr = selectedChat?.roomIdEnc;
        if (roomIdEncr) {
            // alert("adding");
            setOnGoingMessageQueue((prev) => [...prev, { textEncr, roomIdEncr, plainText: message, optimisticId: crypto.randomUUID(), }])
        }
    }
    useEffect(() => {
        if (
            onGoingMessageQueue.length === 0 ||
            isSendMessagePending
        ) {
            // alert("nothing to send" + onGoingMessageQueue.length + isSendMessagePending)
            return;
        }

        const nextMessage = onGoingMessageQueue[0];
        // const lastMessageID = crypto.randomUUID()
        setLastMessageId(nextMessage.optimisticId)

        const optimisticMessage: DecryptedMessageType = {
            createdAt: new Date().toISOString(),
            messageIdDec: nextMessage.optimisticId,
            textEncr: nextMessage.textEncr,
            messageIdEncr: "",
            decryptedText: nextMessage.plainText,
            isMyMessage: true,
            status: "Pending",
            roomIdEncr: selectedChat?.roomIdEnc || "",
            senderIdEncr: userId || "",
            imageUrlEncr: null,

        }
        setChatMsgList((prev) => {

            const exists = prev.some(
                m => m.messageIdDec === nextMessage.optimisticId
            );

            if (exists) return prev;

            return [...prev, optimisticMessage]
        })
        setGoToBottom(true)
        sendMessageMutate(nextMessage, {
            onSuccess: () => {
                setOnGoingMessageQueue(prev =>
                    prev.slice(1)
                );
            },
        });
    }, [onGoingMessageQueue, isSendMessagePending]);



    useEffect(() => {
        async function appendNewMessage() {
            const myNewMesssage: DecryptedMessageType = {
                ...sendMessageData.data,
                messageIdDec: await decrypt(sendMessageData.data.messageIdEncr),
                decryptedText: await decrypt(sendMessageData.data.textEncr),
                isMyMessage: await decrypt(sendMessageData.data.senderIdEncr) === userId
            }
            setChatMsgList(prev => prev.map((m) => {
                if (m.messageIdDec === lastMessageId) {
                    return myNewMesssage
                }
                return m
            }))

            setLastMessageUpdate({
                roomIdDec: await decrypt(sendMessageData.data.roomIdEncr),
                lastMessage: myNewMesssage.decryptedText,
                lastMessageAt: sendMessageData.data.createdAt,
            });

        }
        if (isSendMessageSuccess) {
            appendNewMessage()
        }



    },
        [isSendMessageSuccess])
    useEffect(() => {

        if (isSendMessageError && onGoingMessageQueue.length > 0) {
            // alert("catch error")

            setOnGoingMessageQueue(prev =>
                prev.slice(1)
            );
            // alert("removed from queue error")
            setChatMsgList(prev => prev.map((m) => {
                if (m.messageIdDec === lastMessageId) {
                    return { ...m, status: "Failed" }
                }
                return m
            }))
            // alert("marked as error")
            // setOnGoingMessageQueue(prev =>
            //     prev.slice(1)
            // );
        }
    }, [isSendMessageError])






    return (
        <ChatContext.Provider value={{ connection, chatSearch, setChatSearch, selectedChat, setSelectedChat, activeChatId, setActiveChatId, sendMessage, chatMsgList, setChatMsgList, page, setPage, userId, hasNextPage, setEncryptedChatId, encryptedChatId, isSendMessagePending, roomUpdatedReadCount, lastMessageUpdate, deleteChat, isDeleteChatSuccess, isGetMessagesLoading, isGetMessagesFetching, fetchLockRef, goToBottom, setGoToBottom, isChatBoot, setIsChatBoot, sendQueryToChatBoot, chatBootMessages, setChatBootMessages, isSendQueryPending, isSendQuerySuccess }}>
            {children}
        </ChatContext.Provider>
    )

}