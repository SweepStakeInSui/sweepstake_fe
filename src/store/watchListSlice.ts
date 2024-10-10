import { createSlice } from '@reduxjs/toolkit';

import type { TBetItem } from '@/services/markets/types';

export type WatchListState = {
  items: TBetItem[];
  isOpen: boolean;
};
export const watchListSlice = createSlice({
  name: 'watchList',
  initialState: {
    items: [] as TBetItem[],
    isOpen: false,
  },
  reducers: {
    addWatchList: (state, { payload }) => {
      const { item } = payload;
      state.items = Array.from([
        ...state.items.filter((i) => i.id !== item.id),
        item,
      ]);
    },
    removeWatchList: (state, { payload }) => {
      const { id } = payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    reset: (state) => {
      state.items = [];
    },
    setIsOpen: (state, { payload }) => {
      state.isOpen = !!payload;
    },
  },
});
export const { addWatchList, removeWatchList, reset, setIsOpen } =
  watchListSlice.actions;
export const selectWatchList = (state: any): WatchListState => state.watchList;
export default watchListSlice.reducer;
