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

export const adminProfileUpdate = (formData, config) =>
  api.put("/admin/update-profile", formData, config);

export const getAdminProfile = (config) =>
  api.get("/admin/get-profile", config);

export const adminPasswordChange = (formData) =>
  api.post("/admin/change-password", formData);

export const adminUserList = (formData) =>
  api.post("/admin/get-users", formData);

export const changeUsersStatus = (formData, id) =>
  api.post(`/admin/update-user-status/${id}`, formData);

export const notification = (formData, id) =>
  api.get(
    `/admin/notification?skip=${!formData?.skip ? 0 : formData?.skip}&limit=${
      !formData?.limit ? 5 : formData?.limit
    }`,
    formData
  );
export const notificationRead = (formData) =>
  api.post(`/admin/notification`, formData);
export const deleteUserRequest = (formData) =>
  api.delete(`/admin/user/${formData.userId}`, formData);
