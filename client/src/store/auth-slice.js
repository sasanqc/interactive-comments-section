import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as api from "../lib/api";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userInfo: null,
    expiresAt: null,
    isAuthenticated: false,
  },
  reducers: {
    setAuthState(state, action) {
      const { token, userInfo, expiresAt } = action.payload;
      console.log("authState: ", token, userInfo, expiresAt);
      state.token = token;
      state.userInfo = userInfo;
      state.expiresAt = expiresAt;
      if (!token || !expiresAt) {
        state.isAuthenticated = false;
      } else {
        // console.log(
        //   "diff:",
        //   new Date().getTime() - new Date(expiresAt).getTime()
        // );
        state.isAuthenticated =
          new Date().getTime() < new Date(expiresAt).getTime();
      }
    },
    resetAuthState(state, action) {
      console.log("resetAuthState");
      state.token = null;
      state.userInfo = {};
      state.expiresAt = null;
      state.isAuthenticated = false;
    },
  },
});
export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const {
        expiresAt,
        token,
        data: { user: userInfo },
      } = await api.login(credentials);

      dispatch(authActions.setAuthState({ expiresAt, token, userInfo }));

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("expiresAt", expiresAt);
    } catch (error) {
      //dispatch(commentActions.setStatus("ERROR"));
    }
  };
};
export const signup = (credentials) => {
  return async (dispatch) => {
    try {
      const {
        expiresAt,
        token,
        data: { user: userInfo },
      } = await api.signup(credentials);

      dispatch(authActions.setAuthState({ expiresAt, token, userInfo }));

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("expiresAt", expiresAt);
    } catch (error) {
      //dispatch(commentActions.setStatus("ERROR"));
    }
  };
};
export const refresh = () => {
  return async (dispatch) => {
    try {
      const {
        expiresAt,
        token,
        data: { user: userInfo },
      } = await api.refresh();
      dispatch(authActions.setAuthState({ expiresAt, token, userInfo }));
    } catch (error) {
      //dispatch(commentActions.setStatus("ERROR"));
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    console.log("logout");
    Cookies.remove("token");
    await api.logout();
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiresAt");

    dispatch(authActions.resetAuthState());
  };
};

export const authActions = authSlice.actions;

export default authSlice;
