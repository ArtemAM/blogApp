import { Grid, Box } from '@mui/material';
import Tags from '../component/Tags';
import Post from '../component/Post';
import PostSkeleton from '../component/PostSkeleton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, postsSlice } from '../redux/slices/posts.slice';
import { fetchTags, tagsSlice } from '../redux/slices/tags.slice';
import TagsSkeleton from '../component/TagsSkeleton';
import { loginSlice } from '../redux/slices/login.slice';

function Home() {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState('new');
  const sortedPosts = useSelector((state) =>
    postsSlice.selectors.selectSortedPosts(state, sortType),
  );
  const userData = useSelector(loginSlice.selectors.selectUserData);
  const isLoadingPosts = useSelector(
    postsSlice.selectors.selectIsFetchPostsPending,
  );
  const tags = useSelector(tagsSlice.selectors.selectTags);
  const isLoadingTags = useSelector(
    tagsSlice.selectors.selectIsFetchTagsPending,
  );
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);
  return (
    <Grid container spacing={2} alignItems="flex-start" sx={{ paddingTop: 4 }}>
      <Grid size={9}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {isLoadingPosts
            ? Array.from(new Array(5)).map((_, index) => (
                <PostSkeleton key={index} />
              ))
            : sortedPosts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  image={
                    post.imageUrl
                      ? `http://localhost:8000${post.imageUrl}`
                      : '../../public/post.png'
                  }
                  title={post.title}
                  text={post.text}
                  author={post.author}
                  date={post.createdAt}
                  tags={post.tags}
                  views={post.viewsCount}
                  avatar={post.avatar}
                  isOwner={post.authorId === userData?.id ? true : false}
                />
              ))}
        </Box>
      </Grid>
      <Grid size={3} sx={{ alignSelf: 'flex-start' }}>
        {isLoadingTags ? <TagsSkeleton /> : <Tags tags={tags} />}
      </Grid>
    </Grid>
  );
}

export default Home;
