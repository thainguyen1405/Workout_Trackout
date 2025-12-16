import apiClient from './client';

// Types for user data
export interface User {
  _id: string;
  email: string;
  emailVerifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  email?: string;
  password?: string;
}

/**
 * Get user by ID
 * @param userId - The user's ID
 * @returns Promise with user data
 */
export const getUserById = async (userId: string): Promise<User> => {
  try {
    const response = await apiClient.get<User>(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user information
 * @param userId - The user's ID
 * @param data - Fields to update (email, password)
 * @returns Promise with updated user data
 */
export const updateUser = async (userId: string, data: UpdateUserData): Promise<User> => {
  try {
    const response = await apiClient.put<User>(`/user/${userId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete user account
 * @param userId - The user's ID
 * @returns Promise that resolves when deletion is complete
 */
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await apiClient.delete(`/user/${userId}`);
  } catch (error) {
    throw error;
  }
};

/**
 * Change user password
 * @param userId - The user's ID
 * @param newPassword - The new password
 * @returns Promise with updated user data
 */
export const changePassword = async (userId: string, newPassword: string): Promise<User> => {
  try {
    return await updateUser(userId, { password: newPassword });
  } catch (error) {
    throw error;
  }
};

/**
 * Update user email
 * @param userId - The user's ID
 * @param newEmail - The new email address
 * @returns Promise with updated user data
 */
export const updateEmail = async (userId: string, newEmail: string): Promise<User> => {
  try {
    return await updateUser(userId, { email: newEmail });
  } catch (error) {
    throw error;
  }
};
