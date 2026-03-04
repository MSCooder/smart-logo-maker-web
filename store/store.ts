"use client";
import { configureStore } from "@reduxjs/toolkit";
import logoReducer from "./logoSlice";

export const store = configureStore({
  reducer: {
    logo: logoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;