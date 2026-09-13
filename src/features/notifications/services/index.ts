import { apiCall } from "@/API/apiClient";
import { NotificationType } from "../types";

export async function getUnreadNotificationsCount() {
  const res = await apiCall.get('/Notification/unread-count');
  return res.data;
}

export async function getNotifications() {
  const res = await apiCall.get('/Notification?take=20');
  return res.data;
}

export async function markAsRead(id: string | number) {
  const res = await apiCall.patch(`/Notification/${id}/read`);
  return res.data;
}

export async function markAllAsRead() {
  const res = await apiCall.put('/Notification/mark-all-read');
  return res.data;
}

export async function clearAll() {
  const res = await apiCall.delete('/Notification/clear-all');
  return res.data;
}

export async function remove(id: string | number) {
  const res = await apiCall.delete(`/Notification/${id}`);
  return res.data;
}
