import api from "./api";
export const register = async (email, password) => {
  const response = await api.post("/auth/register", {
    email,
    password,
  });
  return response.data;
};
export const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};
