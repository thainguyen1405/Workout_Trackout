import client from './client';

export interface Preference {
  _id: string;
  user: string;
  types: string[];
  goals: string[];
  preferredTimes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePreferenceData {
  userId: string;
  types?: string[];
  goals?: string[];
  preferredTimes?: string[];
}

export interface UpdatePreferenceData {
  types?: string[];
  goals?: string[];
  preferredTimes?: string[];
}

/**
 * Get preference by user ID
 * @param userId - The user ID to fetch preference for
 * @returns Preference data
 */
export const getPreferenceByUserId = async (userId: string): Promise<Preference> => {
  const response = await client.get(`/preference?userId=${userId}`);
  return response.data.data;
};

/**
 * Get preference by preference ID
 * @param preferenceId - The preference ID to fetch
 * @returns Preference data
 */
export const getPreferenceById = async (preferenceId: string): Promise<Preference> => {
  const response = await client.get(`/preference/${preferenceId}`);
  return response.data.data;
};

/**
 * Create a new preference
 * @param data - Preference creation data
 * @returns Created preference
 */
export const createPreference = async (data: CreatePreferenceData): Promise<Preference> => {
  const response = await client.post('/preference', data);
  return response.data.data;
};

/**
 * Update preference by preference ID
 * @param preferenceId - The preference ID to update
 * @param data - Preference update data
 * @returns Updated preference
 */
export const updatePreference = async (preferenceId: string, data: UpdatePreferenceData): Promise<Preference> => {
  const response = await client.put(`/preference/${preferenceId}`, data);
  return response.data.data;
};

/**
 * Delete preference by preference ID
 * @param preferenceId - The preference ID to delete
 * @returns Success message
 */
export const deletePreference = async (preferenceId: string): Promise<{ success: boolean; message: string }> => {
  const response = await client.delete(`/preference/${preferenceId}`);
  return response.data;
};
