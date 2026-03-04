"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface LogoState {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: LogoState = {
  loading: false,
  data: null,
  error: null,
};

export const generateLogo = createAsyncThunk(
  "logo/generate",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/logo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const logoSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {
    setBusinessName: (state, action) => {
      state.data = { ...state.data, name: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateLogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateLogo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(generateLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBusinessName } = logoSlice.actions;
export default logoSlice.reducer;