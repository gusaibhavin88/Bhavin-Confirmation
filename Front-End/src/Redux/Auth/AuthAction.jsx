import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminForgotPassword,
  adminResetPassword,
  logInAdmin,
  logInUser,
  registerUser,
  userForgotPassword,
  userResetPassword,
  verifyUser,
} from "../../Api/AuthRequest";

// Admin Login
export const loginAdminAction = createAsyncThunk(
  "loginUser",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await logInAdmin(formData); // Call your API function here
      onComplete(response);
      return response; // Assuming the response contains data field with posts
    } catch (error) {
      onError(error.response);
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);

// User  login
export const loginUserAction = createAsyncThunk(
  "loginUser",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await logInUser(formData); // Call your API function here
      onComplete(response);
      return response; // Assuming the response contains data field with posts
    } catch (error) {
      onError(error.response);
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);

// User  Sign Up
export const signupUserAction = createAsyncThunk(
  "signupUser",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await registerUser(formData, config); // Call your API function here
      onComplete(response);
      return response; // Assuming the response contains data field with posts
    } catch (error) {
      onError(error.response);
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);

// Admin Forgot Password
export const adminForgotPasswordAction = createAsyncThunk(
  "adminForgotPassword",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    try {
      const response = await adminForgotPassword(formData);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// User Forgot Password
export const userForgotPasswordAction = createAsyncThunk(
  "userForgotPassword",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    try {
      const response = await userForgotPassword(formData);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// Admin Reset Password
export const adminResetPasswordAction = createAsyncThunk(
  "adminResetPassword",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    try {
      const response = await adminResetPassword(formData);

      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// User Reset Password
export const userResetPasswordAction = createAsyncThunk(
  "userResetPassword",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    try {
      const response = await userResetPassword(formData);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// User Reset Password
export const verifyUserAction = createAsyncThunk(
  "verifyUser",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await verifyUser(formData);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
