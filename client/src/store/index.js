import { configureStore } from "@reduxjs/toolkit";

import commentSlice from "./comment-slice";
import authSlice from "./auth-slice";
const store = configureStore({
  reducer: { comment: commentSlice.reducer, auth: authSlice.reducer },
});

export default store;
