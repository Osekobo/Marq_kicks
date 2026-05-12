import apiClient from '../client';

export const fetchProducts = async (params = {}) => {
  const response = await apiClient.get('/products', { params });
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const fetchProductsByCategory = async (category) => {
  const response = await apiClient.get(`/products/category/${category}`);
  return response.data;
};