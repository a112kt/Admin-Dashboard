"use client";
import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "./helpers/getData";

export default function useNotificationConnection(token: string | null) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (!token) return;

    const userId = getUserIdFromToken(token);
    if (!userId) return;

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:7146';

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${baseUrl}/notificationHub?userId=${userId}`,
        {
          accessTokenFactory: () => token,
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        },
      )
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    const startPromise = connection.start().catch(() => {});
    setConnection(connection);

    return () => {
      if (connection) {
        (startPromise || Promise.resolve()).then(() => connection.stop()).catch(() => {});
      }
    };
  }, [token]);

  return connection;
}
