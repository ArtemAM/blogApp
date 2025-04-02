import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts.slice';
import { tagsReducer } from './slices/tags.slice';
import api from '../api/api';

const extraArgument = {
  api,
};

const store = configureStore({
  reducer: {
    posts: postsReducer,
    tags: tagsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument },
    }),
});

export default store;
