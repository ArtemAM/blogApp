import React, { useRef, useMemo, useCallback, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { usePostForm } from '../hooks/usePostForm';
import { API_URL } from '../config';
import { postsSlice } from '../redux/slices/posts.slice';

function CreatePost() {
  const isAuth = useSelector(loginSlice.selectors.selectIsAuth);
  const navigate = useNavigate();
  const { id } = useParams();
  const post = useSelector((state) =>
    postsSlice.selectors.selectPostById(state, id),
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const {
    formData,
    currentTag,
    setCurrentTag,
    isLoading,
    handleChange,
    handleTagAdd,
    handleTagDelete,
    handleFileChange,
    handleSubmit,
    resetForm,
  } = usePostForm(id, post);

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

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileChange(file);
    }
  };
  const handleCancelImage = () => {
    handleChange('imageUrl')('');
    handleChange('file')(null);
  };

  const handleContentChange = useCallback(
    (value) => {
      handleChange('text')(value);
    },
    [handleChange],
  );

  const handleCancel = () => {
    navigate('/');
    resetForm();
  };

  const isSubmitDisabled = !formData.title || !formData.text || isLoading;

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit post' : 'Create new post'}
      </Typography>
      {formData.imageUrl && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 2 }}>
          <img
            src={`${API_URL}${formData.imageUrl}`}
            alt="Uploaded"
            height="300px"
          />
        </Box>
      )}
      <Box type="form">
        <TextField
          label="Title"
          variant="standard"
          fullWidth
          value={formData.title}
          onChange={(e) => handleChange('title')(e.target.value)}
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
          {formData.tags.map((tag) => (
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
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
          <Button
            startIcon={<CloudUpload />}
            variant="outlined"
            onClick={() => fileInputRef.current.click()}
          >
            {formData.file || 'Upload image'}
          </Button>
          {formData.file && (
            <IconButton
              onClick={handleCancelImage}
              disabled={isLoading}
              sx={{ ml: 1 }}
            >
              <Cancel />
            </IconButton>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
        <SimpleMDE
          value={formData.text}
          onChange={handleContentChange}
          options={options}
        />
      </Box>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<Send />}
          onClick={() => handleSubmit(!!id)}
          disabled={isSubmitDisabled}
        >
          {isLoading
            ? id
              ? 'Updating...'
              : 'Publishing...'
            : id
              ? 'Update'
              : 'Publish'}
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
