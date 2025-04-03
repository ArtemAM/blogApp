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

export const fetchAuthUser = createAsyncThunk(
  'login/fetchAuth',
  async (_, { extra }) => {
    const data = await extra.api.getAuthUser();
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { login } = getState();
      if (login.status === 'pending' || login.userData) {
        return false;
      }
    },
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
      state.userData = null;
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
      })
      .addCase(fetchAuthUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.userData = action.payload;
      })
      .addCase(fetchAuthUser.rejected, (state) => {
        state.status = 'idle';
      });
  },
});

export const loginReducer = loginSlice.reducer;
