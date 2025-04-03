import React, { useEffect } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import AuthorInfo from '../component/AuthorInfo';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, postsSlice } from '../redux/slices/posts.slice';

function PostView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(
    postsSlice.selectors.selectIsFetchPostByIdPending,
  );
  const post = useSelector(postsSlice.selectors.selectPostById);
  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);
  if (isLoading && !post) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;
  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: 2 }}>
      <Box
        component="img"
        src={
          post.imageUrl
            ? `http://localhost:8000${post.imageUrl}`
            : '../../public/post.png'
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
    </Box>
  );
}

export default PostView;
