import axios, { AxiosResponse } from 'axios';

// Crear una instancia de axios
const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token u otros a las cabeceras de todas las solicitudes
apiClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('authToken'); // Recuperar el token de localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token).access_token}`; // Agregar token a las cabeceras
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas o errores globales
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Aquí puedes manejar errores globales como redireccionar si el token ha expirado
    if (error.response && error.response.status === 401) {
      // Si el token es inválido o expiró, puedes deslogear al usuario y redirigir al login
      localStorage.removeItem('authToken');
      window.location.href = '/login'; // Redirecciona al login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
