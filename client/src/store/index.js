import { configureStore } from "@reduxjs/toolkit";

import commentSlice from "./comment-slice";

const store = configureStore({
  reducer: { comment: commentSlice.reducer },
});

export default store;
