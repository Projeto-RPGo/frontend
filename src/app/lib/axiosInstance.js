// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", // URL base da API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores para requisições e respostas
axiosInstance.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação, se existir
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratar erros globais, como redirecionar para login se o token expirar
    if (error.response.status === 401) {
      // Redirecionar para a página de login
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;