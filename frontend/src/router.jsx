import { createBrowserRouter } from 'react-router-dom';
import PostView from './pages/PostView';
import Home from './pages/Home';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';

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
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/create-post',
        element: <CreatePost />,
      },
      {
        path: '/posts/:id/edit',
        element: <CreatePost />,
      },
    ],
  },
]);

export default router;
