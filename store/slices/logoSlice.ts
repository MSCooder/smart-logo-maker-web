import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const generateLogosAction = createAsyncThunk(
  'logo/generateLogos',
  async (userData: any, { rejectWithValue }) => {
    try {
      const resolvedName = String(userData?.name ?? userData?.businessName ?? '').trim();
      const resolvedSlogan = String(userData?.slogan ?? '').trim();

      const response = await axios.post('/api/generate', {
        name: resolvedName || "BRAND",
        slogan: resolvedSlogan,
        industryId: userData.industryId || 23,
        fontId: userData.fontId || "1",
        colorId: userData.colorId || "1",
        p: 2,
      });
      // API response return karein
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

interface LogoState {
  formData: any;
  results: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LogoState = {
  formData: { name: '', slogan: '', industryId: 23, fontId: '1', colorId: '1' },
  results: [],
  status: 'idle',
  error: null,
};

const logoSlice = createSlice({
  name: 'logo',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<any>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateEditedLogo: (
      state,
      action: PayloadAction<{ index: number; updates: Record<string, any> }>
    ) => {
      const { index, updates } = action.payload;
      if (typeof index !== 'number' || index < 0 || index >= state.results.length) return;
      state.results[index] = {
        ...state.results[index],
        ...updates,
      };
    },
    resetLogoProcess: (state) => {
      state.results = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateLogosAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(generateLogosAction.fulfilled, (state, action) => {
        console.log("API Success, Payload received:", action.payload);
        state.status = 'succeeded';

        const payload = action.payload;
        const extractedResults = payload?.data ?? payload?.logos ?? payload?.results ?? payload?.logo_list ?? [];
        state.results = Array.isArray(extractedResults) ? extractedResults : [];
      })
      .addCase(generateLogosAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { updateFormData, updateEditedLogo, resetLogoProcess } = logoSlice.actions;
export default logoSlice.reducer;