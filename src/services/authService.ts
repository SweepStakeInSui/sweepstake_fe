import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import publicAxiosClient from '@/app/configs/httpClient/publicAxiosClient';

const getNonce = async (address: string) => {
  const response = await publicAxiosClient.post(`/auth/nonce`, { address });
  return response.data.data.nonce;
};
const login = async (address: string, signature: string) => {
  const body = {
    payload: {
      address,
      signature,
    },
    type: 'wallet',
  };
  const response = await publicAxiosClient.post(`/auth/login`, body);
  return response.data.data;
};
const refresh = async () => privateAxiosClient.get(`/auth/refresh`);
export const AuthService = {
  getNonce,
  login,
  refresh,
};
