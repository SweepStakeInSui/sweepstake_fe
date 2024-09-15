import { configureStore } from '@reduxjs/toolkit';

import betReducer from './betSlice';
import profileReducer from './profileSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    bet: betReducer,
  },
});
export default store;
