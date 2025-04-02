import axios from 'axios';

const API_URL = 'http://localhost:8000';
const instance = axios.create({
  baseURL: API_URL,
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
};

export default api;
