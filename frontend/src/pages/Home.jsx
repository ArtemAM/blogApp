import { Grid, Box } from '@mui/material';
import Tags from '../component/Tags';
import Post from '../component/Post';
import PostSkeleton from '../component/PostSkeleton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, postsSlice } from '../redux/slices/posts.slices';
function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(postsSlice.selectors.selectPosts);
  const isLoading = useSelector(postsSlice.selectors.selectIsFetchPostsPending);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <Grid container spacing={2} alignItems="flex-start" sx={{ paddingTop: 4 }}>
      <Grid size={9}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {isLoading
            ? Array.from(new Array(5)).map((_, index) => (
                <PostSkeleton key={index} />
              ))
            : posts.map((post) => (
                <Post
                  key={post.id}
                  image={post.imageUrl || '../../public/post.png'}
                  title={post.title}
                  text={post.text}
                  author={post.author}
                  date={post.createdAt}
                  tags={post.tags}
                  views={post.viewsCount}
                  avatar={post.avatar}
                />
              ))}
        </Box>
      </Grid>
      <Grid size={3} sx={{ alignSelf: 'flex-start' }}>
        <Tags tags={['react', 'mui', 'mern']} />
      </Grid>
    </Grid>
  );
}

export default Home;
