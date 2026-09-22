import axios from 'axios';

export const API_BASE_URL = 'http://10.78.55.113:5000/api/v1/competitions';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export default apiClient;