import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import betReducer from './betSlice';
import orderbookReducer from './orderbookSlice';
import profileReducer from './profileSlice';
import watchListReducer from './watchListSlice';

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(value: any) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();
const persistConfig = {
  key: 'root_watchlist',
  storage,
};
const persistedReducerWatchlist = persistReducer(
  persistConfig,
  watchListReducer,
);
const store = configureStore({
  reducer: {
    profile: profileReducer,
    bet: betReducer,
    watchList: persistedReducerWatchlist,
    orderbook: orderbookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
export const persistor = persistStore(store);
