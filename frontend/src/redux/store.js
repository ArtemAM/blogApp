import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts.slice';
import { tagsReducer } from './slices/tags.slice';
import api from '../api/api';
import { loginReducer } from './slices/login.slice';
import { registerReducer } from './slices/register.slice';

const extraArgument = {
  api,
};

const store = configureStore({
  reducer: {
    posts: postsReducer,
    tags: tagsReducer,
    login: loginReducer,
    register: registerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument },
    }),
});

export default store;
