import { configureStore } from '@reduxjs/toolkit';
import logoReducer from './slices/logoSlice';

export const store = configureStore({
  reducer: {
    logo: logoReducer,
  },
});

// TypeScript ke liye types exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;