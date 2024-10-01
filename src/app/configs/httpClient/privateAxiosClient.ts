import type { AxiosHeaders } from 'axios';
import axios from 'axios';

import TokenServices from '@/services/tokenService';
import store from '@/store';
import { updateCookieToken } from '@/store/profileSlice';
import { getAccessToken, removeCookieToken } from '@/utils/token';

const privateAxiosClient = axios.create({
  // withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

privateAxiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      (config.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${accessToken}`,
      );
    }
    return config;
  },
  (error) => Promise.reject(error),
);

privateAxiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error?.config;
    if (
      error?.response?.status === 401 &&
      originalConfig &&
      !originalConfig.sent
    ) {
      try {
        originalConfig.sent = true;
        await TokenServices.updateRefreshToken();
        return await privateAxiosClient(originalConfig);
      } catch (_error) {
        console.log(_error);

        store.dispatch(
          updateCookieToken({
            accessToken: '',
            refreshToken: '',
            isLoggedIn: false,
          }),
        );
        removeCookieToken();
        return Promise.reject(_error);
      }
    }
    store.dispatch(updateCookieToken({ accessToken: null, isLoggedIn: false }));
    removeCookieToken();
    return Promise.reject(error);
  },
);

export default privateAxiosClient;
