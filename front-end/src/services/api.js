import axios from 'axios';
import { toast } from 'react-toastify';
import axiosRetry from 'axios-retry';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',  // Use environment variable or fallback
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

// Configure retry logic for handling rate limits or transient failures
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
});

// Response interceptor for error handling and rate limit management
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 429) {
        const retryAfter = error.response.headers['retry-after'] || 1;
        console.warn(`Rate limit hit, retrying after ${retryAfter}s`);
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        return api(error.config);
      } else if (status === 404) {
        toast.error('Resource not found');
      } else if (status >= 500) {
        toast.error('Server error, please try again later');
      } else {
        toast.error(`An error occurred: ${error.response.data?.message || 'Unknown error'}`);
      }
    } else {
      toast.error('Network error, please check your connection');
    }
    console.error(`API request failed: ${error.message}`);
    return Promise.reject(error);
  }
);

// Fetch models from Civitai API
export const fetchCivitaiModels = async (params = {}) => {
  const response = await api.get('/civitai/models', {
    params: { query: params.query, sort: params.sort, tag: params.tag, limit: params.limit, page: params.page }
  });
  return response.data;
};

// Fetch model details from Civitai API
export const fetchCivitaiModelDetails = async (modelId) => {
  const response = await api.get(`/civitai/models/${modelId}`);
  return response.data;
};

// Fetch models from Hugging Face API
export const fetchHuggingFaceModels = async (params = {}) => {
  const response = await api.get('/huggingface/models', {
    params: { search: params.query, limit: params.limit }
  });
  return response.data;
};

// Initiate a download task
export const initiateDownload = async (data) => {
  const response = await api.post('/download', {
    ...data,
    path: localStorage.getItem('downloadPath') || '/workspace/models'  // Use configurable path
  });
  return response.data;
};

// Default export of the configured axios instance
export default api;