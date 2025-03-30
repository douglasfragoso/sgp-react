import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});


// Interceptor para adicionar o token às requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });
  
  // Interceptor para tratar erros de autenticação
  api.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response.status === 401) {
      // Token expirado ou inválido - redirecionar para login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  });