import publicAxiosClient from '@/app/configs/httpClient/publicAxiosClient';
import store from '@/store';
import { updateCookieToken } from '@/store/profileSlice';
import { setCookieToken } from '@/utils/token';

export default class TokenServices {
  static async updateRefreshToken() {
    try {
      const response = await publicAxiosClient.get(`auth/refresh`);
      const { accessToken, refreshToken } = response.data;
      if (accessToken && refreshToken) {
        setCookieToken(accessToken, refreshToken);
        store.dispatch(
          updateCookieToken({
            accessToken,
            refreshToken,
            isLoggedIn: true,
          }),
        );
      } else throw new Error('JWT is null');
    } catch (e) {
      throw new Error('Refresh Token is expired');
    }
  }
}
