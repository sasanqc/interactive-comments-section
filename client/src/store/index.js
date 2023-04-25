import { configureStore } from "@reduxjs/toolkit";

import commentSlice from "./comment-slice";
import authSlice, { authActions } from "./auth-slice";
import Cookies from "js-cookie";
import { refresh } from "./auth-slice";
const store = configureStore({
  reducer: { comment: commentSlice.reducer, auth: authSlice.reducer },
});
store.dispatch(
  authActions.setAuthState({
    token: Cookies.get("token") || null,
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    expiresAt: localStorage.getItem("expiresAt") || null,
  })
);

if (localStorage.getItem("userInfo") && localStorage.getItem("expiresAt")) {
  store.dispatch(refresh());
}

export default store;
