import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import type { ProfileTypes } from '@/types/profile';

const getUserInfor = async (): Promise<ProfileTypes> => {
  const response = await privateAxiosClient.get(`/user/profile`);
  return response.data.data;
};
const deposit = async (body: any) => {
  const response = await privateAxiosClient.post(`/user/deposit`, body);
  return response;
};
const withdraw = async (body: any) => {
  const response = await privateAxiosClient.post(`/user/deposit`, body);
  return response;
};
export const UserService = {
  getUserInfor,
  deposit,
  withdraw,
};
