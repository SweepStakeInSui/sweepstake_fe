import { createSlice } from '@reduxjs/toolkit';

export const betSlice = createSlice({
  name: 'bet',

  initialState: {
    id: '',
    type: 1,
    yes: 0,
    no: 0,
  },
  reducers: {
    setBet: (state, { payload }) => {
      state.id = payload.id;
      state.type = payload.type;
      state.yes = payload.yes;
      state.no = payload.no;
    },
  },
});

export const { setBet } = betSlice.actions;
export const selectProfile = (state: any): any => state.bet;

export default betSlice.reducer;
