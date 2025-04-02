import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  postsStatus: 'idle',
  selectedPostStatus: 'idle',
  selectedPost: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { extra }) => {
    const data = await extra.api.getPosts();
    console.log('post');
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { postsStatus } = getState().posts;
      if (postsStatus === 'pending') {
        return false;
      }
    },
  },
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id, { extra }) => {
    const data = await extra.api.getPostById(id);
    return data;
  },
  {
    condition: (id, { getState }) => {
      const { selectedPostStatus, selectedPost } = getState().posts;
      if (
        selectedPostStatus === 'pending' ||
        (selectedPost && selectedPost.id === id)
      ) {
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
    selectPostById: (state) => state.selectedPost,
    selectIsFetchPostsIdle: (state) => state.status === 'idle',
    selectIsFetchPostsPending: (state) => state.status === 'pending',
    selectIsFetchPostByIdPending: (state) => state.status === 'pending',
    selectIsFetchPostByIdIdle: (state) => state.status === 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.postsStatus = 'pending';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.postsStatus = 'success';
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.postsStatus = 'failed';
    });
    builder.addCase(fetchPostById.pending, (state) => {
      state.selectedPostStatus = 'pending';
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.selectedPostStatus = 'success';
      state.selectedPost = action.payload;
    });
    builder.addCase(fetchPostById.rejected, (state) => {
      state.selectedPostStatus = 'failed';
    });
  },
});

export const postsReducer = postsSlice.reducer;
