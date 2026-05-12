import apiClient from '../client';

export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  window.location.href = '/login';
};

export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};