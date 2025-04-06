import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useDispatch } from 'react-redux';
import { fetchCreatePost } from '../redux/slices/posts.slice';

const initialState = {
  title: '',
  text: '',
  tags: [],
  imageUrl: '',
  file: null,
};

export const usePostForm = (id, post) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [currentTag, setCurrentTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id && !post) return;
    const fillForm = () => {
      setIsLoading(true);
      try {
        const { title, text, tags, imageUrl } = post;
        setFormData({ title, text, tags, imageUrl, file: imageUrl });
      } catch (err) {
        console.error('Error filling form:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fillForm();
  }, [id, navigate, post]);

  const handleChange = (field) => (value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const handleFileChange = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsLoading(true);
      const { imageUrl } = await api.uploadImage(formData);
      setFormData((prevData) => ({
        ...prevData,
        imageUrl,
        file: file.name,
      }));
    } catch (error) {
      console.warn('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleSubmit = async (isUpdate = false) => {
    try {
      setIsLoading(true);
      const postData = {
        title: formData.title,
        text: formData.text,
        tags: formData.tags,
        imageUrl: formData.imageUrl,
      };

      let postId;

      if (isUpdate) {
        const { updatedId } = await api.updatePost(postId, postData);
        postId = updatedId;
      } else {
        const { payload } = await dispatch(fetchCreatePost(postData));
        postId = payload.postId;
      }

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error('Error submitting post:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setCurrentTag('');
  };

  return {
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
  };
};
