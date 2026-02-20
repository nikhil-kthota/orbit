import axios from 'axios';
import { getToken } from '../utils/tokenHelpers';

// --- Axios Instance ---
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
});

// --- Request Interceptor ---
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// --- Response Interceptor ---
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message =
            error.response?.data?.error || error.message || 'Something went wrong';
        return Promise.reject(new Error(message));
    }
);

export default api;
