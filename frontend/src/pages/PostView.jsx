import React, { useEffect } from 'react';
import { Box, Typography, Chip, Paper } from '@mui/material';
import AuthorInfo from '../component/AuthorInfo';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, postsSlice } from '../redux/slices/posts.slice';
import { API_URL } from '../config';

function PostView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(
    postsSlice.selectors.selectIsFetchPostByIdPending,
  );
  const post = useSelector((state) =>
    postsSlice.selectors.selectPostById(state, id),
  );
  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);
  if (isLoading && !post) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;
  return (
    <Paper elevation={3} sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
      <Box
        component="img"
        src={
          post.imageUrl ? `${API_URL}${post.imageUrl}` : '../../public/post.png'
        }
        alt={post.title}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 2,
        }}
      />
      <AuthorInfo avatar={post.avatar} author={post.author} date={post.date} />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {post.title}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {post.text}
        </Typography>

        <Box
          sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginBottom: 2 }}
        >
          {post.tags.map((tag) => (
            <Chip key={tag} label={`#${tag}`} size="small" />
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {post.viewsCount}
          </Typography>
          <VisibilityIcon fontSize="small" />
        </Box>
      </Box>
    </Paper>
  );
}

export default PostView;
