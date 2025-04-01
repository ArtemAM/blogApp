import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  status: 'idle',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    const data = await thunkAPI.extra.api.getPosts();
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { posts } = getState().posts;
      if (posts.length > 0) {
        return false;
      }
    },
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  selectors: {
    selectPosts: (state) => state.posts,
    selectIsFetchPostsIdle: (state) => state.status === 'idle',
    selectIsFetchPostsPending: (state) => state.status === 'pending',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'success';
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const postsReducer = postsSlice.reducer;
