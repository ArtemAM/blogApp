import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  status: 'idle',
};

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (userData, { extra }) => {
    const data = await extra.api.login(userData);
    return data;
  },
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  selectors: {
    selectUserData: (state) => state.userData,
    selectIsLoginPending: (state) => state.status === 'pending',
    selectIsLoginSuccess: (state) => state.status === 'success',
    selectIsLoginRejected: (state) => state.status === 'rejected',
    selectIsAuth: (state) => !!state.userData,
  },
  reducers: {
    resetState: (state) => {
      state.status = 'idle';
    },
    logout: (state) => {
      state.userData = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'success';
        state.userData = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const loginReducer = loginSlice.reducer;
