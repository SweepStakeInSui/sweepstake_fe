/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { getAccessToken, getRefreshToken, removeCookieToken, setCookieToken } from '@/utils/token';
import { ProfileTypes } from '@/types/profile';
export type ProfileState = {
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
  profile: ProfileTypes;
};
const accessToken = getAccessToken();
const isLoggedIn = Boolean(accessToken);

export const profileSlice = createSlice({
  name: 'profile',
  
  initialState: {
    accessToken: accessToken,
    refreshToken: getRefreshToken(),
    isLoggedIn: isLoggedIn,
    profile: {},
  },
  reducers: {
    login: (state, { payload }) => {
      const { accessToken, refreshToken } = payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoggedIn = true;
      setCookieToken(accessToken, refreshToken);
    },
    logout: (state) => {
      removeCookieToken();
      state.accessToken = '';
      state.refreshToken = '';
      state.isLoggedIn = false;
    },
    updateCookieToken(state, { payload }) {
      const { accessToken, refreshToken } = payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoggedIn = true;
    },
    userData: (state, { payload }) => {
      const { profile } = payload;
      state.profile = profile;
    },
  },
});

export const { login, logout, userData, updateCookieToken } =
  profileSlice.actions;
export const selectProfile = (state: any): ProfileState => state.profile;

export default profileSlice.reducer;
