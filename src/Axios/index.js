import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 5000,
});

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${getCurrentUserToken()}`;
  return config;
});

export default instance;

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("CURRENT_USER")) || {};
}

export function setCurrentUser(user) {
  return localStorage.setItem("CURRENT_USER", JSON.stringify(user));
}

export function setCurrentUserToken(token) {
  return localStorage.setItem("AUTH_TOKEN", token) || null;
}
export function getCurrentUserToken(token) {
  return localStorage.getItem("AUTH_TOKEN") || null;
}

export async function getDishes() {
  const response = await instance.get('/dishes')
  return response.data.content
}