import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as api from "../lib/api";
import { catchAsync } from "../errorConroller/catchAsync";
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
      state.token = token;
      state.userInfo = userInfo;
      state.expiresAt = expiresAt;
      if (!token || !expiresAt) {
        state.isAuthenticated = false;
      } else {
        state.isAuthenticated =
          new Date().getTime() < new Date(expiresAt).getTime();
      }
    },

    updateUserInfo(state, action) {
      state.userInfo = action.payload;
    },

    resetAuthState(state, action) {
      state.token = null;
      state.userInfo = {};
      state.expiresAt = null;
      state.isAuthenticated = false;
    },
  },
});
export const login = (credentials) => {
  return catchAsync(async (dispatch) => {
    const response = await api.login(credentials);
    const {
      expiresAt,
      token,
      data: { user: userInfo },
    } = response;
    dispatch(authActions.setAuthState({ expiresAt, token, userInfo }));
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);
  });
};
export const signup = (credentials) => {
  return catchAsync(async (dispatch) => {
    const response = await api.signup(credentials);
    const {
      expiresAt,
      token,
      data: { user: userInfo },
    } = response;
    dispatch(authActions.setAuthState({ expiresAt, token, userInfo }));

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);
  });
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
    Cookies.remove("token");
    await api.logout();
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiresAt");

    dispatch(authActions.resetAuthState());
  };
};
export const updateMe = (data) => {
  return async (dispatch) => {
    const { user: userInfo } = await api.updateMe(data);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    dispatch(authActions.updateUserInfo(userInfo));
  };
};
export const authActions = authSlice.actions;

export default authSlice;
