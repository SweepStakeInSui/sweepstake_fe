import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';

const getNotification = async (
  params: PaginationType,
): Promise<NotificationData> => {
  const response = await privateAxiosClient.get(`/notification`, { params });
  return response.data.data;
};

export const notificationService = {
  getNotification,
};
