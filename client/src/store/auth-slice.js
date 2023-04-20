import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token"),
    user: null,
    isAuthenticated: Cookies.get("token") ? true : false,
  },
  reducers: {
    setAuthState(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice;
