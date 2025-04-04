import { Grid, Box, ButtonGroup, Button } from '@mui/material';
import Tags from '../component/Tags';
import Post from '../component/Post';
import PostSkeleton from '../component/PostSkeleton';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postsSlice } from '../redux/slices/posts.slice';
import { tagsSlice } from '../redux/slices/tags.slice';
import TagsSkeleton from '../component/TagsSkeleton';
import { API_URL } from '../config';

function Home() {
  const [sortType, setSortType] = useState('new');
  const sortedPosts = useSelector((state) =>
    postsSlice.selectors.selectSortedPosts(state, sortType),
  );
  const isLoadingPosts = useSelector(
    postsSlice.selectors.selectIsFetchPostsPending,
  );
  const isLoadingTags = useSelector(
    tagsSlice.selectors.selectIsFetchTagsPending,
  );
  return (
    <Grid container spacing={2} alignItems="flex-start" sx={{ paddingTop: 4 }}>
      <Grid size={9}>
        <Box sx={{ marginBottom: 2 }}>
          <ButtonGroup aria-label="sort buttons">
            <Button
              onClick={() => setSortType('new')}
              variant={sortType === 'new' ? 'contained' : 'text'}
            >
              Newest
            </Button>
            <Button
              onClick={() => setSortType('popular')}
              variant={sortType === 'popular' ? 'contained' : 'text'}
            >
              Popular
            </Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {isLoadingPosts
            ? [...Array(5)].map((_, index) => <PostSkeleton key={index} />)
            : sortedPosts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  image={
                    post.imageUrl
                      ? `${API_URL}${post.imageUrl}`
                      : '../../public/post.png'
                  }
                  title={post.title}
                  text={post.text}
                  author={post.author}
                  date={post.createdAt}
                  tags={post.tags}
                  views={post.viewsCount}
                  avatar={post.avatar}
                  authorId={post.authorId}
                />
              ))}
        </Box>
      </Grid>
      <Grid size={3} sx={{ alignSelf: 'flex-start' }}>
        {isLoadingTags ? <TagsSkeleton /> : <Tags />}
      </Grid>
    </Grid>
  );
}

export default Home;
