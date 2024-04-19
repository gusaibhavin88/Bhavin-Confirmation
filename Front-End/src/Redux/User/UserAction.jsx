import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSkillListRequest,
  getUserProfile,
  userPasswordChange,
  userProfileUpdate,
} from "../../Api/userRequest";
import { getProfile } from "../Auth/AuthSlice";

// User Profile Get
export const userProfileGetAction = createAsyncThunk(
  "userProfileGet",
  async ({ functions }, { dispatch }) => {
    const { onError } = functions;
    try {
      const response = await getUserProfile();
      dispatch(getProfile(response));

      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// User Profile Update
export const userProfileUpdateAction = createAsyncThunk(
  "userProfileUpdate",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await userProfileUpdate(formData, config);
      onComplete(response, false, "update");
      // dispatch(getProfile(response));
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// User Password change
export const userPasswordUpdateAction = createAsyncThunk(
  "userPasswordUpdate",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    try {
      const response = await userPasswordChange(formData);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// Get skills
export const getSkillListAction = createAsyncThunk(
  "getSkillList",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await getSkillListRequest();
      onComplete(response, true);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
