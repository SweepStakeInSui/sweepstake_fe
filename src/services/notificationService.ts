import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import type { NotificationData } from '@/types/notification';

const getNotification = async (
  params: PaginationType,
): Promise<NotificationData> => {
  const response = await privateAxiosClient.get(`/notification`, { params });
  return response.data.data;
};
type NotificationBody = {
  notificationIds: string[];
};
const notificationSeen = async (body: NotificationBody) => {
  const response = await privateAxiosClient.post(`/notification/seen`, body);
  return response.data;
};
export const notificationService = {
  getNotification,
  notificationSeen,
};
