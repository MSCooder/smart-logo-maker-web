import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const generateLogosAction = createAsyncThunk(
  'logo/generateLogos',
  async (userData: any, { rejectWithValue }) => {
    try {
      const payload = {
        name: userData.name || "BRAND",
        slogan: userData.slogan || "",
        industry: userData.industryId || 23,
        font: userData.fontId || "1",
        color: userData.colorId || "1",
        // ... baaki aapka sara static payload yahan aayega jo pehle tha
        p: 2,
        select: "55540,55014,54795,54792,54558,54559,54553...", 
        selectlog: "54559,48016,47543...",
      };

      // CALLING YOUR OWN API ROUTE INSTEAD OF EXTERNAL URL
      const response = await axios.post('/api/generate', payload);
      
      // LogoAI templates return karta hai
      return response.data.templates || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

interface LogoState {
  formData: {
    name: string;
    slogan: string;
    industryId: number;
    fontId: string;
    colorId: string;
  };
  results: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Added Status
  error: string | null;
}

const initialState: LogoState = {
  formData: {
    name: '',
    slogan: '',
    industryId: 23,
    fontId: '1',
    colorId: '1',
  },
  results: [],
  status: 'idle',
  error: null,
};

const logoSlice = createSlice({
  name: 'logo',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<LogoState['formData']>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetLogoProcess: (state) => {
      state.results = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateLogosAction.pending, (state) => {
        state.status = 'loading'; // Status update
        state.error = null;
      })
      .addCase(generateLogosAction.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Status update
        state.results = action.payload; 
      })
      .addCase(generateLogosAction.rejected, (state, action) => {
        state.status = 'failed'; // Status update
        state.error = action.payload as string;
      });
  },
});

export const { updateFormData, resetLogoProcess } = logoSlice.actions;
export default logoSlice.reducer;