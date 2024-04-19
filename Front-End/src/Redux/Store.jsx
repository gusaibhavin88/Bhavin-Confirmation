import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./Auth/AuthSlice";
import UserSlice from "./User/UserSlice";
import AdminSlice from "./Admin/AdminSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice,
    admin: AdminSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { store };
