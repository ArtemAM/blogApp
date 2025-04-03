import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  error: null,
};

export const fetchRegister = createAsyncThunk(
  'register/fetchRegister',
  async (userData, { extra, rejectWithValue }) => {
    try {
      const data = await extra.api.register(userData);
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.error || 'Registration failed',
        );
      }
      return rejectWithValue('Registration failed');
    }
  },
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  selectors: {
    selectIsFetchPending: (state) => state.status === 'pending',
    selectError: (state) => state.error,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.status = 'success';
        state.error = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export const registerReducer = registerSlice.reducer;
