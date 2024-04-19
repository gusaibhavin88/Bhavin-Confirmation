import { createSlice } from "@reduxjs/toolkit";
import { getSkillListAction, userProfileUpdateAction } from "./UserAction";
import { adminProfileUpdateAction } from "../Admin/AdminAction";

// Define the initial state
const initialState = {
  error: null,
  message: null,
  profile: {
    loading: false,
    // user: null,
  },
  skillList: {
    loading: false,
    skills: null,
  },
};

// Create a slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(userProfileUpdateAction.pending, (state) => {
        state.profile.loading = true;
      })
      .addCase(userProfileUpdateAction.fulfilled, (state, action) => {
        state.profile.loading = false;
      })
      .addCase(userProfileUpdateAction.rejected, (state, action) => {
        state.profile.loading = false;
      })

      .addCase(adminProfileUpdateAction.pending, (state) => {
        state.profile.loading = true;
      })
      .addCase(adminProfileUpdateAction.fulfilled, (state, action) => {
        state.profile.loading = false;
        // state.profile.user = action.payload.data.data;
      })
      .addCase(adminProfileUpdateAction.rejected, (state, action) => {
        state.profile.loading = false;
      })

      .addCase(getSkillListAction.pending, (state) => {
        state.skillList.loading = true;
      })
      .addCase(getSkillListAction.fulfilled, (state, action) => {
        state.skillList.loading = false;
        state.skillList.skills = action.payload.data.data;
      })
      .addCase(getSkillListAction.rejected, (state, action) => {
        state.skillList.loading = false;
      });
  },
});

export default userSlice.reducer;
