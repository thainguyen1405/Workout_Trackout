import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './client';

// Types for authentication
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    email: string;
    emailVerifiedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
  token?: string;
}

/**
 * Register a new user
 * @param credentials - email and password
 * @returns Promise with user data and token
 */
export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/user/register', credentials);
    
    // Store token and user ID if returned
    if (response.data.token) {
      await AsyncStorage.setItem('jwt_token', response.data.token);
    }
    if (response.data.user._id) {
      await AsyncStorage.setItem('user_id', response.data.user._id);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Login an existing user
 * @param credentials - email and password
 * @returns Promise with user data and token
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/user/login', credentials);
    
    // Store token and user ID
    if (response.data.token) {
      await AsyncStorage.setItem('jwt_token', response.data.token);
    }
    if (response.data.user._id) {
      await AsyncStorage.setItem('user_id', response.data.user._id);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout current user
 * Clears JWT token and user data from storage
 */
export const logout = async (): Promise<void> => {
  try {
    // Call logout endpoint to clear server-side session/cookies
    await apiClient.post('/user/logout');
    
    // Clear local storage
    await AsyncStorage.multiRemove(['jwt_token', 'user_id']);
  } catch (error) {
    // Even if API call fails, clear local storage
    await AsyncStorage.multiRemove(['jwt_token', 'user_id']);
    throw error;
  }
};

/**
 * Get current JWT token
 * @returns Promise with token string or null
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('jwt_token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

/**
 * Get current user ID
 * @returns Promise with user ID string or null
 */
export const getUserId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('user_id');
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns Promise with boolean
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    return !!token;
  } catch (error) {
    return false;
  }
};
