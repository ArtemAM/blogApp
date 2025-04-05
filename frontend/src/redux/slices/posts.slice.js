import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

const initialState = {
  posts: {},
  ids: [],
  postsStatus: 'idle',
  postByIdStatus: 'idle',
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
    condition: (_, { getState }) => {
      const { postByIdStatus } = getState().posts;
      if (postByIdStatus === 'pending') return false;
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
    selectIsFetchPostsIdle: (state) => state.postsStatus === 'idle',
    selectIsFetchPostsPending: (state) => state.postsStatus === 'pending',
    selectIsFetchPostByIdPending: (state) => state.postByIdStatus === 'pending',
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
      state.postByIdStatus = 'pending';
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      const post = action.payload;
      state.postByIdStatus = 'success';
      state.posts[post.id] = post;
    });
    builder.addCase(fetchPostById.rejected, (state) => {
      state.postByIdStatus = 'failed';
    });
    builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
      const id = action.meta.arg;
      delete state.posts[id];
      state.ids = state.ids.filter((postId) => postId !== id);
    });
  },
});

export const postsReducer = postsSlice.reducer;
