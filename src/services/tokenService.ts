import publicAxiosClient from '@/app/configs/httpClient/publicAxiosClient';
import store from '@/store';
import { updateCookieToken } from '@/store/profileSlice';
import { getRefreshToken, setCookieToken } from '@/utils/token';

export default class TokenServices {
  static async updateRefreshToken() {
    try {
      const refreshToken = getRefreshToken();
      const response = await publicAxiosClient.get(`auth/refresh`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;
      if (accessToken && newRefreshToken) {
        setCookieToken(accessToken, newRefreshToken);
        store.dispatch(
          updateCookieToken({
            accessToken,
            refreshToken: newRefreshToken,
            isLoggedIn: true,
          }),
        );
      } else throw new Error('JWT is null');
    } catch (e) {
      throw new Error('Refresh Token is expired');
    }
  }
}
