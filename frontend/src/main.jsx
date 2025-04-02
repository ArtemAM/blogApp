import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './index.css';
import { fetchPosts } from './redux/slices/posts.slice.js';
import { fetchTags } from './redux/slices/tags.slice.js';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';

store.dispatch(fetchPosts());
store.dispatch(fetchTags());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
