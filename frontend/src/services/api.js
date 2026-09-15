import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach auth tokens if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('resqnet_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Graceful fallback indicator
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend is unavailable (e.g. ECONNREFUSED), provide structured mock fallback notice
    if (!error.response) {
      console.warn('[ResQNet API] Backend server unreachable at ' + API_BASE_URL + '. Operating in standalone mock demo mode.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
