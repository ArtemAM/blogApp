import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AuthorInfo from './AuthorInfo';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDeletePost } from '../redux/slices/posts.slice';

function PostActions({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    try {
      if (window.confirm('Are you sure you want to delete this post?')) {
        dispatch(fetchDeletePost(id));
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const handleEdit = () => {};

  return (
    <CardActions
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        opacity: 0,
        transition: 'opacity 0.3s',
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      <IconButton color="primary" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </CardActions>
  );
}

function Post({
  id,
  image,
  avatar,
  author,
  date,
  title,
  tags,
  views,
  isOwner,
}) {
  return (
    <Card
      sx={{
        maxWidth: '100%',
        position: 'relative',
        '&:hover .post-actions': { opacity: 1 },
      }}
    >
      <CardMedia component="img" height="250" image={image} alt={title} />
      <AuthorInfo avatar={avatar} author={author} date={date} />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Link to={`posts/${id}`} className="link-secondary">
            {title}
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <Chip key={tag} label={`#${tag}`} size="small" />
          ))}
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: 'flex', gap: 0.5, marginTop: 1 }}
        >
          {views}
          <VisibilityIcon fontSize="small" />
        </Typography>
      </CardContent>
      {isOwner && <PostActions id={id} />}
    </Card>
  );
}

export default Post;
