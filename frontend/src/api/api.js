import axios from 'axios';

const API_URL = 'http://localhost:8000';
const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

const api = {
  getPosts: async () => {
    try {
      const response = await instance.get('/posts');
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  getTags: async () => {
    try {
      const response = await instance.get('/tags');
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  getPostById: async (id) => {
    try {
      const response = await instance.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },
  login: async (userData) => {
    try {
      const response = await instance.post('auth/login', userData);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  getAuthUser: async () => {
    try {
      const response = await instance.get('/user');
      return response.data;
    } catch (error) {
      console.error('Not auth:', error);
      throw error;
    }
  },
};

export default api;
