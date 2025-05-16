import axios from 'axios';

const API_URL = 'http://10.0.129.222:3000'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await fetch('http://10.0.129.222:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
  return response.json();
};

export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCart = async () => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/user/profile', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getSavedItems = async () => {
  try {
    const response = await api.get('/user/saved-items');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const saveItem = async (productId) => {
  try {
    const response = await api.post('/user/saved-items', { productId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

