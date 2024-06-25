import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Authorization: `Bearer ${getCurrentUserToken()}`,
  },
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
export function getCurrentUserToken() {
  return localStorage.getItem("AUTH_TOKEN") || null;
}
export function getCartItems() {
  if (
    localStorage.getItem("CART_ITEMS") &&
    localStorage.getItem("CART_ITEMS")?.length > 20
  ) {
    return JSON.parse(localStorage.getItem("CART_ITEMS")) || [];
  }
  return [];
}
export function setCartItems(items) {
  if (items) {
    return localStorage.setItem("CART_ITEMS", JSON.stringify(items));
  }else{
    localStorage.removeItem('CART_ITEMS')
  }
}

export async function getDishes() {
  const response = await instance.get("/dishes");
  return response.data.content || [];
}

export async function getMyOrders() {
  const response = await instance.get("/orders")
  return response.data
}
