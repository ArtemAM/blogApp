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

function Post({ image, avatar, author, date, title, tags, views }) {
  const handleDelete = () => {};
  const handleEdit = () => {};
  return (
    <Card
      sx={{
        maxWidth: '100%',
        position: 'relative',
        '&:hover .post-actions': { opacity: 1 },
      }}
    >
      {image && (
        <CardMedia component="img" height="250" image={image} alt={title} />
      )}
      <AuthorInfo avatar={avatar} author={author} date={date} />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
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
      <CardActions
        className="post-actions"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
      >
        <IconButton color="primary" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Post;
