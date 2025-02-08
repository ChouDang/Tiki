// axiosConfig.ts
import axios from 'axios';

export const API_URL = 'http://localhost:8080'; 
export const API_URL_IMG = 'http://localhost:3001'; 
// export const API_URL = 'http://api-gateway:8080'; 
// export const API_URL_IMG = 'http://product-service:3001'; 

const getToken = () => {
  return localStorage.getItem('token');
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
