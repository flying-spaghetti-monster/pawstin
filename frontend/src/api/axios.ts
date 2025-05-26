import axios from 'axios';
import { getToken } from '../helper/localSorageHelper';

export const instance = axios.create({
  baseURL: import.meta.env.SERVER_API_URL,
  headers: {
    'Authorization': `Bearer ${getToken()}`
  },
});