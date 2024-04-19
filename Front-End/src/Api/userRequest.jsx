import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_URL;

const baseURL = `${apiUrl}/api/v1/`;
const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const userProfileUpdate = (formData) =>
  api.put("/user/update-profile", formData);

export const getUserProfile = (config) => api.get("/user/get-profile", config);
export const userPasswordChange = (formData) =>
  api.post("/user/change-password", formData);
export const getSkillListRequest = (formData) =>
  api.post("/user/get-skills", formData);
