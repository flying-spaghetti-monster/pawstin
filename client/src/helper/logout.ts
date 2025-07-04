import { removeToken } from '../helper/localSorageHelper';

export const logout = () => {
  // Clear token from local storage
  removeToken();

  // Redirect to the login page or home page
  window.location.href = '/signin';
};