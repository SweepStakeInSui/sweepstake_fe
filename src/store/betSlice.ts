import { createSlice } from '@reduxjs/toolkit';

import { BetOutcomeType, EBetStatusOption } from '@/enums/bet-status';

// export type BetState = {
//   id: string;
//   outcomeYesId: string;
//   outcomeNoId: string;
//   type: BetOutcomeType;
//   bidPriceYes: number;
//   bidPriceNo: number;
//   askPriceYes: number;
//   askPriceNo: number;
// };

export const betSlice = createSlice({
  name: 'bet',

  initialState: {
    id: '',
    outcomeYesId: '',
    outcomeNoId: '',
    type: BetOutcomeType.YES,
    side: EBetStatusOption.BID,
    isBid: true,
    bidPriceYes: 0,
    bidPriceNo: 0,
    askPriceYes: 0,
    askPriceNo: 0,
  },
  reducers: {
    setBet: (state, { payload }) => {
      state.id = payload.id;
      state.outcomeYesId = payload.outcomeYesId;
      state.outcomeNoId = payload.outcomeNoId;
      state.type = payload.type;
      state.isBid = payload.isBid;
      state.bidPriceYes = payload.bidPriceYes;
      state.bidPriceNo = payload.bidPriceNo;
      state.askPriceYes = payload.askPriceYes;
      state.askPriceNo = payload.askPriceNo;
    },
  },
});

export const { setBet } = betSlice.actions;
export const selectBet = (state: any) => state.bet;

export default betSlice.reducer;
