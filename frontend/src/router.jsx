import { createBrowserRouter } from 'react-router-dom';
import PostView from './pages/PostView';
import Home from './pages/Home';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'posts/:id',
        element: <PostView />,
      },
    ],
  },
]);

export default router;
