import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import type { ProfileTypes } from '@/types/profile';

const getUserInfor = async (): Promise<ProfileTypes> => {
  const response = await privateAxiosClient.get(`/user/profile`);
  return response.data.data;
};
export const UserService = {
  getUserInfor,
};
