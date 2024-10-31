import { createSlice } from '@reduxjs/toolkit';

export const orderbookSlice = createSlice({
  name: 'orderbook',

  initialState: {
    isClickOn: false,
    price: 0,
  },
  reducers: {
    setOrderInput: (state, { payload }) => {
      state.isClickOn = payload.isClickOn;
      state.price = payload.price;
    },
  },
});

export const { setOrderInput } = orderbookSlice.actions;
export const selectOrderbook = (state: any) => state.orderbook;

export default orderbookSlice.reducer;
