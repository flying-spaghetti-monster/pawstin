import axios from 'axios';
import { getToken } from '../helper/localSorageHelper';
import { logout } from '../helper/logout';

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Authorization': `Bearer ${getToken()}`
  },
});

// Response interceptor: ловим ошибки
instance.interceptors.response.use(
  response => response,
  error => {
    // если 401 — делаем logout
    console.log(error)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // logout();
    }
    // дальше прокидываем ошибку обработчикам
    return Promise.reject(error);
  }
);