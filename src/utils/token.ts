import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export function getAccessToken() {
  const accessToken = getCookie('accessToken');
  return accessToken;
}
export function getRefreshToken() {
  const refreshToken = getCookie('accessToken');
  return refreshToken;
}
export function setCookieToken(accessToken: string, refreshToken: string) {
  setCookie('accessToken', accessToken);
  setCookie('refreshToken', refreshToken);
}
export function removeCookieToken() {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
}
