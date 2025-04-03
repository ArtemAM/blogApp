import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  Box,
  Button,
  TextField,
  Chip,
  Stack,
  IconButton,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import { CloudUpload, Cancel, Send } from '@mui/icons-material';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '250px',
      autoFocus: true,
      placeholder: 'Enter your text...',
      status: false,
    }),
    [],
  );

  // Обработчики
  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleContentChange = useCallback((value) => {
    setContent(value);
  }, []);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    tags.forEach((tag) => formData.append('tags', tag));
    if (file) formData.append('image', file);

    console.log('Отправка данных:', { title, content, tags, file });
    // Здесь будет запрос на API
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setTags([]);
    setFile(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create new post
      </Typography>
      <TextField
        label="Title"
        variant="standard"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Tags"
        variant="standard"
        fullWidth
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={handleTagAdd}
        sx={{ mb: 1 }}
        helperText="Press Enter to add a tag"
      />
      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleTagDelete(tag)}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
      <Box sx={{ mb: 2 }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <Button
          startIcon={<CloudUpload />}
          variant="outlined"
          onClick={() => fileInputRef.current.click()}
        >
          {file ? file.name : 'Upload image'}
        </Button>
        {file && (
          <IconButton onClick={() => setFile(null)} sx={{ ml: 1 }}>
            <Cancel />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ mb: 2 }} />
      <SimpleMDE
        value={content}
        onChange={handleContentChange}
        options={options}
      />
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<Send />}
          onClick={handleSubmit}
          disabled={!title || !content}
        >
          Publish
        </Button>
        <Button variant="outlined" endIcon={<Cancel />} onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
}

export default CreatePost;
