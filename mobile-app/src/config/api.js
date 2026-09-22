c// mobile-app/src/config/api.js
import axios from 'axios';

// REPLACE with your local LAN IP (e.g., 'http://192.168.1.15:5000') if using Expo Go on a phone
export const API_BASE_URL = 'http://localhost:5000/api/v1/competitions';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export default apiClient;