import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import type { NotificationData } from '@/types/notification';

const getNotification = async (
  params: PaginationType,
): Promise<NotificationData> => {
  const response = await privateAxiosClient.get(`/notification`, { params });
  return response.data.data;
};

export const notificationService = {
  getNotification,
};
