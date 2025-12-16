import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL for the API - change this when deploying to production
// Use your computer's IP address instead of localhost for mobile devices
// For Android Emulator: use 10.0.2.2
// For iOS Simulator: localhost works
// For Physical Device: use your computer's IP (run 'ipconfig' to find it)
const BASE_URL = 'http://192.168.1.201:5000/api';   // Choose appropriate IP

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds JWT token to every request
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      // Handle 401 Unauthorized - token expired or invalid
      if (error.response.status === 401) {
        await AsyncStorage.removeItem('jwt_token');
        await AsyncStorage.removeItem('user_id');
        // You can trigger navigation to login screen here if needed
      }
      
      // Get clean error message from backend
      const errorMessage = error.response.data?.message || 'An error occurred';
      
      return Promise.reject({
        status: error.response.status,
        message: errorMessage,
        data: error.response.data,
      });
    } else if (error.request) {
      // Network error - no response received
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
      });
    } else {
      // Something else happened
      return Promise.reject({
        status: -1,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }
);

export default apiClient;
