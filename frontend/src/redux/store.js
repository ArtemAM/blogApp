import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts.slice';
import api from '../api/api';

const extraArgument = {
  api,
};

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument },
    }),
});

export default store;
