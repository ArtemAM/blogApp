import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

const initialState = {
  posts: {},
  ids: [],
  postsStatus: 'idle',
  selectedPostStatus: 'idle',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { extra }) => {
    const data = await extra.api.getPosts();
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

export const fetchDeletePost = createAsyncThunk(
  'posts/fetchDeletePost',
  async (id, { extra }) => {
    const data = await extra.api.deletePost(id);
    return data;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  selectors: {
    selectSortedPosts: createSelector(
      (state) => state.posts,
      (state) => state.ids,
      (_, sortType) => sortType,
      (posts, ids, sortType) => {
        return ids
          .map((id) => posts[id])
          .sort((a, b) => {
            if (sortType === 'new') {
              return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortType === 'popular') {
              return b.viewsCount - a.viewsCount;
            }
          });
      },
    ),
    selectPostById: (state, id) => state.posts[id],
    selectIsFetchPostsIdle: (state) => state.status === 'idle',
    selectIsFetchPostsPending: (state) => state.status === 'pending',
    selectIsFetchPostByIdPending: (state) => state.status === 'pending',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.postsStatus = 'pending';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const posts = action.payload;
      state.posts = posts.reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
      }, {});
      state.ids = posts.map((post) => post.id);
      state.postsStatus = 'success';
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.postsStatus = 'failed';
    });
    builder.addCase(fetchPostById.pending, (state) => {
      state.selectedPostStatus = 'pending';
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      const data = action.payload;
      state.selectedPostStatus = 'success';
      state.posts[data.id] = data;
    });
    builder.addCase(fetchPostById.rejected, (state) => {
      state.selectedPostStatus = 'failed';
    });
    builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
      const id = action.meta.arg;
      delete state.posts[id];
      state.ids = state.ids.filter((postId) => postId !== id);
    });
  },
});

export const postsReducer = postsSlice.reducer;
