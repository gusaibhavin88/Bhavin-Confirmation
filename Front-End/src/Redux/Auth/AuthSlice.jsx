import { createSlice } from "@reduxjs/toolkit";
import {
  adminForgotPasswordAction,
  adminResetPasswordAction,
  loginUserAction,
  signupUserAction,
  userForgotPasswordAction,
  userResetPasswordAction,
} from "./AuthAction";
import { userProfileGetAction } from "../User/UserAction";
import { adminProfileGetAction } from "../Admin/AdminAction";

// Define the initial state
const initialState = {
  error: null,
  message: null,
  isAuthenticated: null,
  user: localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : null,
  loading: false,

  loginUser: {
    loading: false,
  },
  signupUser: {
    loading: false,
  },
  profile: {
    loading: false,
  },
  forgotPassword: {
    loading: false,
  },
  resetPassword: {
    loading: false,
  },
};

// Create a slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null; // Clear the error by returning null or an empty string
    },
    clearMessage: (state) => {
      state.message = null; // Clear the error by returning null or an empty string
    },
    logOut: (state) => {
      state.user = null;
      localStorage.clear();
    },
    clearUser: (state) => {
      state.user = null;
    },
    getProfile: (state, action) => {
      state.user = action.payload.data.data;
      localStorage.setItem("profile", JSON.stringify(action.payload.data.data));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.data.user;

        localStorage.setItem(
          "profile",
          JSON.stringify(action.payload.data.data.user)
        );
        localStorage.setItem(
          "token",
          JSON.stringify(action?.payload.data.data.token)
        );
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(signupUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.data;
      })
      .addCase(signupUserAction.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(userProfileGetAction.pending, (state) => {
        state.profile.loading = true;
      })
      .addCase(userProfileGetAction.fulfilled, (state, action) => {
        state.profile.loading = false;
        state.user = action.payload.data.data;
        state.isAuthenticated = true;
      })
      .addCase(userProfileGetAction.rejected, (state, action) => {
        state.profile.loading = false;
        state.isAuthenticated = false;
      })

      .addCase(adminProfileGetAction.pending, (state) => {
        state.profile.loading = true;
      })
      .addCase(adminProfileGetAction.fulfilled, (state, action) => {
        state.profile.loading = false;
        state.user = action.payload.data.data;
      })
      .addCase(adminProfileGetAction.rejected, (state, action) => {
        state.profile.loading = false;
      })
      .addCase(adminForgotPasswordAction.pending, (state) => {
        state.forgotPassword.loading = true;
      })
      .addCase(adminForgotPasswordAction.fulfilled, (state, action) => {
        state.forgotPassword.loading = false;
      })
      .addCase(adminForgotPasswordAction.rejected, (state, action) => {
        state.forgotPassword.loading = false;
      })
      .addCase(userForgotPasswordAction.pending, (state) => {
        state.forgotPassword.loading = true;
      })
      .addCase(userForgotPasswordAction.fulfilled, (state, action) => {
        state.forgotPassword.loading = false;
      })
      .addCase(userForgotPasswordAction.rejected, (state, action) => {
        state.forgotPassword.loading = false;
      })
      .addCase(adminResetPasswordAction.pending, (state) => {
        state.resetPassword.loading = true;
      })
      .addCase(adminResetPasswordAction.fulfilled, (state, action) => {
        state.resetPassword.loading = false;
      })
      .addCase(adminResetPasswordAction.rejected, (state, action) => {
        state.resetPassword.loading = false;
      })
      .addCase(userResetPasswordAction.pending, (state) => {
        state.resetPassword.loading = true;
      })
      .addCase(userResetPasswordAction.fulfilled, (state, action) => {
        state.resetPassword.loading = false;
      })
      .addCase(userResetPasswordAction.rejected, (state, action) => {
        state.resetPassword.loading = false;
      });
  },
});

export default authSlice.reducer;
export const { clearError, logOut, getProfile, clearUser } = authSlice.actions; // Export the clearError action
// Export the async thunks to use in components
