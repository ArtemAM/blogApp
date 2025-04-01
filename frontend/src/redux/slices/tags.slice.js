import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
  status: 'idle',
};

export const fetchTags = createAsyncThunk(
  'tags/fetchTags',
  async (_, thunkAPI) => {
    const data = await thunkAPI.extra.api.getTags();
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { tags } = getState().tags;
      if (tags.length > 0) {
        return false;
      }
    },
  },
);

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  selectors: {
    selectTags: (state) => state.tags,
    selectIsFetchTagsIdle: (state) => state.status === 'idle',
    selectIsFetchTagsPending: (state) => state.status === 'pending',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTags.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.status = 'success';
      state.tags = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const tagsReducer = tagsSlice.reducer;
