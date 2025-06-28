// API configuration for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  MENU: `${API_BASE_URL}/api/menu/today`,
  ORDERS: `${API_BASE_URL}/api/orders`,
};

export default API_BASE_URL; 