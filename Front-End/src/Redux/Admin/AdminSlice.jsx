import { createSlice } from "@reduxjs/toolkit";
import {
  adminPasswordUpdateAction,
  adminProfileUpdateAction,
  adminUsersListAction,
  changeUsersStatusAction,
  deleteUserAction,
  notificationsAction,
} from "./AdminAction";
import { userPasswordUpdateAction } from "../User/UserAction";

// Define the initial state
const initialState = {
  error: null,
  message: null,
  profile: {
    loading: false,
    user: null,
  },
  passwordChange: {
    loading: false,
  },
  userList: {
    loading: false,
    users: null,
    page_count: 0,
  },
  notificationList: {
    loading: false,
    notifications: null,
    unreadCount: 0,
    allNotifications: [],
  },
  deleteUser: {
    loading: false,
  },
};

// Create a slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleCheckbox: (state, action) => {
      const itemId = action.payload;
      state.userList.users = state.userList.users.map((item) =>
        item._id === itemId ? { ...item, is_active: !item.is_active } : item
      );
    },
    addNotifications: (state, action) => {
      state.notificationList.allNotifications = [
        ...state.notificationList.allNotifications,
        ...(action.payload.data.data.notificationList || []),
      ];
    },
    clearNotifications: (state, action) => {
      state.notificationList.allNotifications = [];
    },
    addCount: (state, action) => {
      state.notificationList.unreadCount =
        action.payload.data.data.un_read_count;
      // state.notificationList.allNotifications = [
      //   action.payload.data.data.notification,
      //   ...(action.payload.data.data.notificationList || []),
      // ];
    },
    deleteUserReducer: (state, action) => {
      const user_id = action.payload;
      state.userList.users = state.userList.users.filter(
        (item) => item._id !== user_id
      );
    },

    isRead: (state, action) => {
      const notification_id = action.payload;
      // Find the notification by its ID
      const notificationIndex =
        state.notificationList.allNotifications.findIndex(
          (item) => item._id === notification_id
        );

      if (!state.notificationList.allNotifications[notificationIndex].is_read) {
        state.notificationList.unreadCount -= 1;
      }

      // Update the notification to mark it as read
      if (notificationIndex !== -1) {
        state.notificationList.allNotifications[
          notificationIndex
        ].is_read = true;
      }
    },
    isReadAll: (state, action) => {
      state.notificationList.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(adminPasswordUpdateAction.pending, (state) => {
        state.passwordChange.loading = true;
      })
      .addCase(adminPasswordUpdateAction.fulfilled, (state, action) => {
        state.passwordChange.loading = false;
      })
      .addCase(adminPasswordUpdateAction.rejected, (state, action) => {
        state.passwordChange.loading = false;
      })
      .addCase(userPasswordUpdateAction.pending, (state) => {
        state.passwordChange.loading = true;
      })
      .addCase(userPasswordUpdateAction.fulfilled, (state, action) => {
        state.passwordChange.loading = false;
      })
      .addCase(userPasswordUpdateAction.rejected, (state, action) => {
        state.passwordChange.loading = false;
      })
      .addCase(adminUsersListAction.pending, (state) => {
        state.userList.loading = true;
      })
      .addCase(adminUsersListAction.fulfilled, (state, action) => {
        state.userList.users = action.payload.data.data.user_list;
        state.userList.page_count = action.payload.data.data.page_count;
      })
      .addCase(adminUsersListAction.rejected, (state, action) => {
        state.userList.loading = false;
      })
      .addCase(notificationsAction.pending, (state) => {
        state.notificationList.loading = true;
      })
      .addCase(notificationsAction.fulfilled, (state, action) => {
        state.notificationList.loading = false;
        state.notificationList.notifications =
          action.payload.data.data.notificationList;
        const newNotifications =
          action.payload.data.data.notificationList || []; // Check if new data is available, otherwise, use an empty array
        state.notificationList.notifications = [
          ...state.notificationList.notifications,
          ...newNotifications,
        ];
        state.notificationList.unreadCount =
          action.payload.data.data.un_read_count;
      })
      .addCase(notificationsAction.rejected, (state, action) => {
        state.notificationList.loading = false;
      })
      .addCase(deleteUserAction.pending, (state) => {
        state.deleteUser.loading = true;
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.deleteUser.loading = false;
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.deleteUser.loading = false;
      });
  },
});
export const {
  toggleCheckbox,
  addNotifications,
  addCount,
  isRead,
  clearNotifications,
  deleteUserReducer,
  isReadAll,
} = userSlice.actions; // Export the clearError action

export default userSlice.reducer;
