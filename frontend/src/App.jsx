import { Container } from '@mui/material';
import Header from './component/Header';
import Home from './pages/Home';
import PostView from './component/PostView';

function App() {
  const post = {
    image: '../public/post.png',
    avatar: 'https://via.placeholder.com/40',
    author: 'John Doe',
    date: 'April 1, 2025',
    title: 'Sample Post Title',
    tags: ['react', 'javascript', 'webdev'],
    text: 'This is the full text of the post. It contains detailed information about the topic.',
    views: 123,
  };
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        {/* <Home /> */}
        <PostView {...post} />
      </Container>
    </>
  );
}

export default App;
