import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Debug logging
console.log('API Base URL:', import.meta.env.VITE_API_URL || 'http://localhost:3001/api');

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data, error.message);
    if (error.response?.status === 401) {
      // Token is invalid, clear storage and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Authentication API endpoints
export const authAPI = {
  signIn: (credentials: { email: string; password: string }) =>
    api.post('/auth/signin', credentials),
  
  signUp: (userData: { name: string; email: string; password: string }) =>
    api.post('/auth/signup', userData),
  
  signOut: () => api.post('/auth/signout'),
  
  getCurrentUser: () => api.get('/auth/me'),
  
  googleAuth: () => api.get('/auth/google'),
  
  refreshToken: () => api.post('/auth/refresh'),
};

// Resume API endpoints
export const resumeAPI = {
  getResumes: () => api.get('/resumes'),
  
  getResume: (id: string) => api.get(`/resumes/${id}`),
  
  createResume: (data: any) => api.post('/resumes', data),
  
  updateResume: (id: string, data: any) => api.put(`/resumes/${id}`, data),
  
  deleteResume: (id: string) => api.delete(`/resumes/${id}`),
  
  saveResume: (id: string, data: any) => api.post(`/resumes/${id}/save`, data),
};

// User API endpoints
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  
  updateProfile: (data: any) => api.put('/user/profile', data),
  
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/user/password', data),
  
  deleteAccount: () => api.delete('/user/account'),
};

export default api; 