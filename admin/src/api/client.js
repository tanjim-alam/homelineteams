import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: config.DEFAULTS.TIMEOUT.API_REQUEST,
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    // Handle FormData properly
    if (config.data instanceof FormData) {
      console.log('FormData detected - Request details:');
      console.log('- Method:', config.method?.toUpperCase());
      console.log('- URL:', config.url);
      console.log('- Data type: FormData');
      console.log('- FormData entries:');
      for (let [key, value] of config.data.entries()) {
        console.log(`  ${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value);
      }
      
      // For FormData, let the browser set the Content-Type with boundary
      // Remove any manually set Content-Type to avoid conflicts
      delete config.headers['Content-Type'];
      console.log('- Content-Type header removed for FormData boundary handling');
    }
    
    if (config.FEATURES?.DEBUG_MODE) {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
      console.log('Request data type:', config.data instanceof FormData ? 'FormData' : typeof config.data);
      console.log('Request headers:', config.headers);
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging and error handling
api.interceptors.response.use(
  (response) => {
    if (config.FEATURES?.DEBUG_MODE) {
      console.log('API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      message: error.message,
      response: error.response?.data
    });

    // Handle CORS errors specifically
    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      console.error('CORS or Network Error - Check backend CORS configuration');
      console.error('Backend URL:', config.API_BASE_URL);
      console.error('Frontend Origin:', window.location.origin);
    }

    // Handle specific HTTP status codes
    if (error.response?.status === 401) {
      console.error('Unauthorized - Check authentication');
    } else if (error.response?.status === 403) {
      console.error('Forbidden - Check permissions');
    } else if (error.response?.status === 404) {
      console.error('Not Found - Check endpoint URL');
    } else if (error.response?.status >= 500) {
      console.error('Server Error - Check backend logs');
    }

    return Promise.reject(error);
  }
);

export default api;


