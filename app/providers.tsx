// import { configureStore } from '@reduxjs/toolkit';
// import logoReducer from '../store/slices/logoSlice'; // Path check kar lein

// export const store = configureStore({
//   reducer: {
//     logo: logoReducer,
//   },
// });

// // Types for TypeScript (Inki zaroorat useLogoFlow hook mein paregi)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

"use client"; // Ye zaroori hai Next.js App Router mein

import { Provider } from "react-redux";
import { store } from "@/store/store"; 

// Named export karein (export function)
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}