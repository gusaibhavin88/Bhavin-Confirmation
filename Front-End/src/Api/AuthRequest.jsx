import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_URL;

const baseURL = `${apiUrl}/api/v1/`;

const api = axios.create({
  baseURL,
});

export const logInUser = (formData) => api.post("/user/login", formData);
export const logInAdmin = (formData) => api.post("/admin/login", formData);
export const registerUser = (formData) =>
  api.post("/user/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const adminForgotPassword = (formData) =>
  api.post("/admin/forgot-password", formData);
export const userForgotPassword = (formData) =>
  api.post("/user/forgot-password", formData);
export const adminResetPassword = (formData) =>
  api.post("/admin/reset-password", formData);
export const userResetPassword = (formData) =>
  api.post("/user/reset-password", formData);
export const verifyUser = (formData) => api.post("/user/verify-user", formData);
