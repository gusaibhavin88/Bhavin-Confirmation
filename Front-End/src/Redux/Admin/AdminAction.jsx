import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminPasswordChange,
  adminProfileUpdate,
  adminUserList,
  changeUsersStatus,
  deleteUserRequest,
  getAdminProfile,
  notification,
  notificationRead,
} from "../../Api/adminRequest";
import { addCount, addNotifications, isRead } from "./AdminSlice";
import { getProfile } from "../Auth/AuthSlice";

// Admin Profile Update
export const adminProfileGetAction = createAsyncThunk(
  "adminProfileGet",
  async ({ functions }, { dispatch }) => {
    const { onError, onComplete } = functions;
    try {
      const response = await getAdminProfile();
      dispatch(getProfile(response));
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// Admin Profile Update
export const adminProfileUpdateAction = createAsyncThunk(
  "adminProfileUpdate",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await adminProfileUpdate(formData, config);
      onComplete(response, false, "update");
      // dispatch(getProfile(response));

      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
// Admin Password change
export const adminPasswordUpdateAction = createAsyncThunk(
  "adminPasswordUpdate",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    try {
      const response = await adminPasswordChange(formData);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
// User list
export const adminUsersListAction = createAsyncThunk(
  "adminUserList",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    try {
      const response = await adminUserList(formData);
      onComplete(response);

      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
// CHange user status
export const changeUsersStatusAction = createAsyncThunk(
  "changeUserStatus",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    try {
      const response = await changeUsersStatus(formData, formData.itemId);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// CHange user status
export const notificationsAction = createAsyncThunk(
  "notifications",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    try {
      const response = await notification(formData);
      if (formData.type === "count") {
        dispatch(addCount(response));
      } else {
        dispatch(addNotifications(response));
      }
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// CHange user status
export const notificationReadAction = createAsyncThunk(
  "notificationRead",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await notificationRead(formData);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// Delete User
export const deleteUserAction = createAsyncThunk(
  "deleteUser",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    try {
      const response = await deleteUserRequest(formData);
      onComplete(response, "delete");
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
