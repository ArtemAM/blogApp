import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
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
import { useSelector } from 'react-redux';
import { loginSlice } from '../redux/slices/login.slice';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function CreatePost() {
  const isAuth = useSelector(loginSlice.selectors.selectIsAuth);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('token') && !isAuth) navigate('/');
  }, [isAuth, navigate]);

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

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const postData = {
        title,
        text: content,
        tags,
      };
      const { postId } = await api.createPost(postData);
      navigate(`/posts/${postId}`);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.error('Ошибка сервера:', error.response.data);
        alert(`Ошибка: ${error.response.data.errors[0].msg}`);
      } else if (error.request) {
        console.error('Нет ответа от сервера');
        alert('Сервер не отвечает');
      } else {
        console.error('Ошибка:', error.response.data.errors[0].msg);
      }
      throw error;
    }
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
      <Box type="form">
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
      </Box>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<Send />}
          onClick={handleSubmit}
          disabled={!title || !content || isLoading}
        >
          {isLoading ? 'Publishing...' : 'Publish'}
        </Button>
        <Button
          disabled={isLoading}
          variant="outlined"
          endIcon={<Cancel />}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
}

export default CreatePost;
