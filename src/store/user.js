import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "Initial user ID value",
    username: "Initial username value",
    token: "Initial token value",
  },
  reducers: {
    createUser(state, action) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    userLogout(state, action) {
      state.userId = "";
      state.username = "";
      state.token = "";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
