export const setToken = (token: string) => {
  return localStorage.setItem("access_token", JSON.stringify(token));
}

export const getToken = (): string => {
  const token = localStorage.getItem("access_token");
  return token ? JSON.parse(token) : '';
}

export const removeToken = () => {
  return localStorage.removeItem("access_token");
}
