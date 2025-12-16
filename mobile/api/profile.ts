import client from './client';

export interface Profile {
  _id: string;
  user: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  homeLat?: string;
  homeLng?: string;
  gymName?: string;
  privacy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileData {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  homeLat?: string;
  homeLng?: string;
  gymName?: string;
  privacy?: string;
}

export interface UpdateProfileData {
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  homeLat?: string;
  homeLng?: string;
  gymName?: string;
  privacy?: string;
}

/**
 * Get profile by user ID
 * @param userId - The user ID to fetch profile for
 * @returns Profile data
 */
export const getProfileByUserId = async (userId: string): Promise<Profile> => {
  const response = await client.get(`/profile?userId=${userId}`);
  return response.data.data;
};

/**
 * Get profile by profile ID
 * @param profileId - The profile ID to fetch
 * @returns Profile data
 */
export const getProfileById = async (profileId: string): Promise<Profile> => {
  const response = await client.get(`/profile/${profileId}`);
  return response.data.data;
};

/**
 * Create a new profile
 * @param data - Profile creation data
 * @returns Created profile
 */
export const createProfile = async (data: CreateProfileData): Promise<Profile> => {
  const response = await client.post('/profile', data);
  return response.data.data;
};

/**
 * Update profile by profile ID
 * @param profileId - The profile ID to update
 * @param data - Profile update data
 * @returns Updated profile
 */
export const updateProfile = async (profileId: string, data: UpdateProfileData): Promise<Profile> => {
  const response = await client.put(`/profile/${profileId}`, data);
  return response.data.data;
};

/**
 * Delete profile by profile ID
 * @param profileId - The profile ID to delete
 * @returns Success message
 */
export const deleteProfile = async (profileId: string): Promise<{ success: boolean; message: string }> => {
  const response = await client.delete(`/profile/${profileId}`);
  return response.data;
};
