import api from './axiosInstance';

// --- Profile API ---
export const fetchProfile = () => api.get('/profile');
export const updateProfile = (data) => api.put('/profile', data);
export const deleteAccount = () => api.delete('/profile');
